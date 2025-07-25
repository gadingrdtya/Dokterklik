import mongoose from "mongoose"

const prescriptionSchema = new mongoose.Schema({
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'appointment', required: true },
    docId: { type: String, required: true },
    userId: { type: String, required: true },
    medicines: [{ name: String, dosage: String, instructions: String, }],
    notes: { type: String },
    price: { type: Number },
    createdAt: { type: Date, default: Date.now }
})

const prescriptionModel = mongoose.models.prescription || mongoose.model('Prescription', prescriptionSchema)

export default prescriptionModel
