import express from 'express'
import { createPrescription  } from '../controllers/prescriptionController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const prescriptionRouter = express.Router()

prescriptionRouter.post('/create',authMiddleware,createPrescription)

export default prescriptionRouter