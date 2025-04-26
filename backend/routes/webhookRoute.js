import express from 'express'
import { midtransWebhook } from '../controllers/paymentController.js'

const webhookRouter = express.Router()

// Endpoint untuk menerima notifikasi dari Midtrans
webhookRouter.post('/midtrans', express.json({ type: 'application/json' }), midtransWebhook)

export default webhookRouter