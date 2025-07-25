import prescriptionModel from '../models/prescriptionModel.js';
import appointmentModel from '../models/appointmentModel.js';

const createPrescription = async (req, res) => {
    try {
        const { appointmentId, userId, medicines, notes } = req.body;
        const docId = req.user.docId;

        const appointment = await appointmentModel.findById(appointmentId);
        if (!appointment || appointment.docId !== docId) {
            return res.json({ success: false, message: "Unauthorized or Appointment not found" });
        }

        // Validasi bahwa medicines adalah array dan tidak kosong
        if (!Array.isArray(medicines) || medicines.length === 0) {
            console.log(`Validation failed: medicines = ${JSON.stringify(medicines)}`);
            return res.json({ success: false, message: "At least one medicine is required." });
        }

        // Filter obat kosong dan validasi struktur
        const validMedicines = medicines.filter(med => 
            med && 
            typeof med === 'object' && 
            typeof med.name === 'string' && med.name.trim() !== '' &&
            typeof med.dosage === 'string' && med.dosage.trim() !== '' &&
            typeof med.instructions === 'string' && med.instructions.trim() !== ''
        );

        if (validMedicines.length === 0) {
            console.log(`Validation failed: No valid medicines in ${JSON.stringify(medicines)}`);
            return res.json({ success: false, message: "Each medicine must have a valid name, dosage, and instructions." });
        }

        const price = validMedicines.length * 10000

        const prescription = await prescriptionModel.create({
            appointmentId,
            docId,
            userId,
            medicines: validMedicines, // Simpan hanya obat yang valid
            notes,
            price
        });

        await appointmentModel.findByIdAndUpdate(appointmentId, { prescription: prescription._id });

        res.json({ success: true, prescription });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

const getUserPrescriptions = async (req, res) => {
    try {
        const prescriptions = await prescriptionModel.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.json({ success: true, prescriptions });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export { createPrescription, getUserPrescriptions };
