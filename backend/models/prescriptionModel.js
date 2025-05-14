import mongoose from "mongoose"

const prescriptionSchema = new mongoose.Schema({
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'appointment', required: true },
    doctorId: { type: String, required: true },
    userId: { type: String, required: true },
    medicines: [{ name: String, dosage: String, instructions: String, }],
    amount: { type: Number },
    isPaid: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
})

const prescriptionModel = mongoose.models.prescription || mongoose.model("prescription", prescriptionSchema)

export default prescriptionModel