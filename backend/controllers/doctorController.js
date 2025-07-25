import doctorModel from "../models/doctorModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"

const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
        res.json({ success: true, message: "Availability Changed" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email'])
        res.json({ success: true, doctors })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API for doctors Login
const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body
        const doctor = await doctorModel.findOne({ email })

        if (!doctor) {
            return res.json({ success: false, message: "Invalid credentials" })
        }

        const isMatch = await bcrypt.compare(password, doctor.password)

        if (isMatch) {
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get doctor appointments for doctor panel
const appointmentsDoctor = async (req, res) => {
    try {
        const { docId } = req.user
        const appointments = await appointmentModel.find({ docId })
            .populate('userId', 'name image dob')
            .populate('prescription')
            .sort({ createdAt: -1 });

        const formatted = appointments.map((apt) => ({
            ...apt._doc,
            userData: apt.userId
        }))

        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to mark appointment completed for doctor panel
const appointmentComplete = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const docId = req.user.docId;
        const appointmentData = await appointmentModel.findById(appointmentId);

        if (!appointmentData || appointmentData.docId.toString() !== docId) {
            return res.json({ success: false, message: "Unauthorized or Appointment not found" });
        }

        // Pastikan pembayaran sudah dilakukan oleh pasien
        if (!appointmentData.payment) {
            return res.json({ success: false, message: "Payment not yet completed by patient" });
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true, status: 'consulted' });
        console.log(`Appointment ${appointmentId} confirmed by doctor ${docId}`)
        return res.json({ success: true, message: "Appointment Confirmed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// API to cancel appointment for doctor panel
const appointmentCancel = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const docId = req.user.docId
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
            return res.json({ success: true, message: "Appointment Cancel" })
        } else {
            return res.json({ success: false, message: "Cancellation Failed" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get dashboard for doctor panel
const doctorDashboard = async (req, res) => {
    try {
        const { docId } = req.user;
        const appointments = await appointmentModel.find({ docId }).populate('prescription');

        let earnings = 0;

        appointments.forEach((item) => {
            if (item.isCompleted || item.payment) {
                const totalForThisAppointment = item.amount || 0
                console.log(`Appointment ${item._id}: Total from amount: ${totalForThisAppointment}`);
                earnings += totalForThisAppointment;
            }
        });

        let patients = [];

        appointments.forEach((item) => {
            if (!patients.includes(item.userId.toString())) {
                patients.push(item.userId.toString());
            }
        });

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0, 5).map(item => ({
                ...item._doc,
                totalAmount: item.amount || 0
            })),
        };
        console.log('Dashboard Data:', dashData);
        res.json({ success: true, dashData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get doctor profile for doctor panel
const doctorProfile = async (req, res) => {
    try {
        const { docId } = req.user
        const profileData = await doctorModel.findById(docId).select('-password')

        res.json({ success: true, profileData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to update doctor profile data from doctor panel
const updateDoctorProfile = async (req, res) => {
    try {
        const { fees, address, available } = req.body
        const { docId } = req.user
        await doctorModel.findByIdAndUpdate(docId, { fees, address, available })

        res.json({ success: true, message: "Profile Updated" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { changeAvailability, doctorList, loginDoctor, appointmentsDoctor, appointmentComplete, appointmentCancel, doctorDashboard, doctorProfile, updateDoctorProfile }
