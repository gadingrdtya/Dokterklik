import express from 'express'
import { createPrescription, getPrescription, getPrescriptionPaymentToken, midtransWebhook  } from '../controllers/prescriptionController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const prescriptionRouter = express.Router()

prescriptionRouter.post('/create',authMiddleware,createPrescription)
prescriptionRouter.get('/:appointmentId',authMiddleware,getPrescription)
prescriptionRouter.post('/payment',authMiddleware,getPrescriptionPaymentToken)
prescriptionRouter.post('/midtrans-webhook',express.json({ type: '*/*' }),midtransWebhook)

export default prescriptionRouter