import prescriptionModel from '../models/prescriptionModel.js'
import midtransClient from 'midtrans-client'
import { snap } from '../config/midtrans.js'

const createPrescription = async (req, res) => {
    try {
        const { appointmentId, userId, doctorId, medicines, amount } = req.body;
        const prescription = await prescriptionModel.create({
            appointmentId, doctorId, userId, medicines, amount
        });

        if (req.io) {
            req.io.to(appointmentId).emit("prescriptionCreated", {
                appointmentId,
                message: "Dokter telah membuat resep untuk Anda.",
            });
        }

        res.json({ success: true, prescription });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const getPrescription = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const prescription = await prescriptionModel.findOne({ appointmentId });
        res.json({ success: true, prescription });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const getPrescriptionPaymentToken = async (req, res) => {
    try {
        const { prescriptionId } = req.body;
        const prescription = await prescriptionModel.findById(prescriptionId).populate("userId", "name email");
        if (!prescription) {
            return res.status(404).json({ success: false, message: "Prescription not found" });
        }

        const parameter = {
            transaction_details: {
                order_id: "PRESC-" + prescription._id,
                gross_amount: prescription.amount,
            },
            customer_details: {
                first_name: prescription.userId.name,
                email: prescription.userId.email,
            },
        };

        const transaction = await snap.createTransaction(parameter);
        const snapToken = transaction.token;

        res.json({ success: true, snapToken });
    } catch (err) {
        console.error("Failed to generate Snap Token for prescription:", err.message);
        res.status(500).json({ success: false, message: err.message });
    }
};

const midtransWebhook = async (req, res) => {
    try {
        const notification = req.body;

        if (
            notification.transaction_status === 'settlement' &&
            notification.order_id.startsWith("PRESC-")
        ) {
            const orderId = notification.order_id.replace("PRESC-", "");

            await prescriptionModel.findByIdAndUpdate(orderId, { isPaid: true });

            console.log(`Prescription ${orderId} marked as paid.`);

            if (req.io) {
                req.io.emit("prescriptionPaid", { prescriptionId: orderId });
                console.log(`Emitted 'prescriptionPaid' for ${orderId}`);
            }
        }

        res.status(200).json({ success: true });
    } catch (err) {
        console.error("Webhook error:", err);
        res.status(500).json({ success: false, message: "Webhook error" });
    }
};

export {
    createPrescription,
    getPrescription,
    getPrescriptionPaymentToken,
    midtransWebhook,
}