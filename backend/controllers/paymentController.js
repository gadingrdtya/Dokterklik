import { snap, core } from '../config/midtrans.js'; // Import Snap dan konfigurasi Midtrans
import appointmentModel from '../models/appointmentModel.js'; // Model appointment
import crypto from 'crypto';

// Fungsi untuk membuat Snap Token (untuk frontend)
const paymentMidtrans = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const appointment = await appointmentModel.findById(appointmentId);

        if (!appointment || appointment.cancelled) {
            return res.json({ success: false, message: "Appointment not found or cancelled" });
        }

        const parameter = {
            transaction_details: {
                order_id: 'APPT-' + appointmentId,
                gross_amount: appointment.amount,
            },
            customer_details: {
                first_name: appointment.userData.name,
                email: appointment.userData.email,
            },
        };

        const transaction = await snap.createTransaction(parameter);
        const snapToken = transaction.token;

        res.json({ success: true, snapToken });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Webhook dari Midtrans untuk menerima notifikasi pembayaran
const midtransWebhook = async (req, res) => {
    try {
        const notification = req.body;

        console.log("🔔 Midtrans Webhook Received:", notification);

        const {
            order_id,
            status_code,
            gross_amount,
            signature_key: receivedSignature
        } = notification;

        const serverKey = process.env.MIDTRANS_SERVER_KEY;
        const rawSignature = order_id + status_code + gross_amount + serverKey;
        const expectedSignature = crypto
            .createHash('sha512')
            .update(rawSignature)
            .digest('hex');

        if (receivedSignature !== expectedSignature) {
            console.error('❌ Invalid signature');
            return res.status(403).send('Invalid signature');
        }

        const appointmentId = order_id.split('-')[1];
        const appointment = await appointmentModel.findById(appointmentId);
        if (!appointment) return res.status(404).send('Appointment not found');

        const transactionStatus = notification.transaction_status;
        const fraudStatus = notification.fraud_status;

        if (transactionStatus === 'settlement') {
            appointment.status = 'Paid';
            appointment.payment = true;
        } else if (transactionStatus === 'cancel' || transactionStatus === 'expire') {
            appointment.status = 'Failed';
            appointment.payment = false;
        } else if (transactionStatus === 'pending') {
            appointment.status = 'Pending';
            appointment.payment = false;
        }

        if (fraudStatus === 'challenge') {
            console.log('⚠️ Fraud status: challenge – manual review needed.');
        }

        await appointment.save();

        res.status(200).send('Webhook processed');
    } catch (error) {
        console.error("Webhook Error:", error);
        res.status(500).send('Internal Server Error');
    }
};

export { paymentMidtrans, midtransWebhook };