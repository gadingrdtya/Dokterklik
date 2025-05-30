import validator from 'validator'
import bycrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import { snap, core } from '../config/midtrans.js'

// API to register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Details" })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "enter a valid email" })
        }

        // validating a strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "enter a strong password" })
        }

        // hashing user password 
        const salt = await bycrypt.genSalt(10)
        const hashedPassword = await bycrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        const isMatch = await bycrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get user profile data
const getProfile = async (req, res) => {
    try {
        const { userId } = req.user
        const userData = await userModel.findById(userId).select('-password')

        res.json({ success: true, userData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to update user profile data
const updateProfile = async (req, res) => {
    try {
        const { name, phone, address, dob, gender } = req.body
        const imageFile = req.file
        const userId = req.user.userId

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing" })
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })

        if (imageFile) {
            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageURL })
        }

        res.json({ success: true, message: "Profile Updated" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to book appointment
const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body;
        const docData = await doctorModel.findById(docId).select('-password');

        if (!docData.available) {
            return res.json({ success: false, message: "Doctor Not Available" });
        }

        let slots_booked = docData.slots_booked;

        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: "Slot Not Available" });
            } else {
                slots_booked[slotDate].push(slotTime);
            }
        } else {
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime);
        }

        const userData = await userModel.findById(userId).select('-password');

        delete docData.slots_booked;

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            slotTime,
            slotDate,
            date: Date.now(),
            amount: docData.fees + 30000
        };

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        res.json({ success: true, message: "Appointment Booked" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get user appointment for frontend my-appointments page
const listAppointment = async (req, res) => {
    try {
        const userId = req.user.userId
        const appointments = await appointmentModel.find({ userId })
            .populate({
                path: 'prescription',
                model: 'Prescription'
            });

        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API  to cancel appointment
const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const userId = req.user.userId
        const appointmentData = await appointmentModel.findById(appointmentId)

        //verify appointment user
        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: "Unauthorized action" })
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        // releasing doctor slot
        const { docId, slotDate, slotTime } = appointmentData
        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: "Appointment Cancelled" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to make payment of appointment using midtrans
const paymentMidtrans = async (req, res) => {
    try {
        const { appointmentId, total } = req.body;
        const appointment = await appointmentModel.findById(appointmentId).populate('docId', 'fees').populate('prescription');

        if (!appointment || appointment.cancelled) {
            return res.json({ success: false, message: "Appointment not found or cancelled" });
        }

        const doctorFee = appointment.docId.fees || 50000;
        const consultationFee = 30000;
        const prescriptionFee = appointment.prescription && appointment.prescription.medicines && appointment.prescription.medicines.length > 0 ? appointment.prescription.medicines.length * 10000 : 0;
        const calculatedTotal = total || (doctorFee + consultationFee + prescriptionFee)

        await appointmentModel.findByIdAndUpdate(appointmentId, { amount: calculatedTotal })

        const parameter = {
            transaction_details: {
                order_id: 'APPT-' + appointmentId,
                gross_amount: calculatedTotal,
            },
            customer_details: {
                first_name: appointment.userData.name,
                email: appointment.userData.email,
            },
            item_details: [
                { id: 'doc_fee', price: doctorFee, quantity: 1, name: 'Doctor Fee' },
                { id: 'cons_fee', price: consultationFee, quantity: 1, name: 'Consultation Fee' },
                { id: 'pres_fee', price: prescriptionFee, quantity: 1, name: 'Prescription Fee' },
            ],
        };

        const transaction = await snap.createTransaction(parameter);
        const snapToken = transaction.token;

        res.json({ success: true, snapToken });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const midtransWebhook = async (req, res) => {
    try {
        const { order_id, transaction_status, transaction_id } = req.body;

        const appointment = await appointmentModel.findOne({ order_id }).populate('prescription');

        if (!appointment) {
            console.log(`Appointment not found for order_id: ${order_id}`);
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }

        console.log(`Found appointment: ${appointment._id}, status: ${transaction_status}`);
        if (transaction_status === 'settlement') {
            const updateResult = await appointmentModel.findByIdAndUpdate(
                appointment._id,
                { payment: true, paymentStatus: 'paid' },
                { new: true }
            );
            console.log(`Payment updated for ${appointment._id}:`, updateResult);
        } else if (transaction_status === 'cancel' || transaction_status === 'expire') {
            const updateResult = await appointmentModel.findByIdAndUpdate(
                appointment._id,
                { payment: false, paymentStatus: 'failed' },
                { new: true }
            );
            console.log(`Payment status updated to failed for ${appointment._id}:`, updateResult);
        } else {
            console.log(`Unhandled transaction status: ${transaction_status}`);
        }

        res.status(200).json({ success: true, message: 'Payment status updated' });
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getAppointmentStatus = async (req, res) => {
    try {
        // Ambil ID appointment dari parameter URL
        const appointmentId = req.params.id;

        // Cari appointment berdasarkan ID di database
        const appointment = await appointmentModel.findById(appointmentId);

        // Jika appointment tidak ditemukan
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Kirimkan status appointment ke client
        res.status(200).json({ status: appointment.status });
    } catch (error) {
        console.error("Error getting appointment status:", error);
        res.status(500).json({ message: error.message });
    }
}

const calculatePaymentDetails = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const appointment = await appointmentModel.findById(appointmentId).populate('docId', 'fees').populate('prescription');
        if (!appointment) return res.json({ success: false, message: 'Appointment not found' });

        const doctorFee = appointment.docId.fees || 50000;
        const consultationFee = 30000
        const prescriptionFee = appointment.prescription && appointment.prescription.medicines && appointment.prescription.medicines.length > 0 ? appointment.prescription.medicines.length * 10000 : 0
        const total = doctorFee + consultationFee + prescriptionFee;

        res.json({ success: true, details: { doctorFee, consultationFee, prescriptionFee, total } });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export { registerUser, getProfile, loginUser, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentMidtrans, midtransWebhook, getAppointmentStatus, calculatePaymentDetails }