import express from 'express'
import { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentMidtrans, midtransWebhook, getAppointmentStatus, calculatePaymentDetails } from '../controllers/userController.js'
import { getUserPrescriptions } from '../controllers/prescriptionController.js'
import authUser from '../middlewares/authUser.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import upload from '../middlewares/multer.js'

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)

userRouter.get('/get-profile',authUser,getProfile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/appointments',authUser,listAppointment)
userRouter.post('/cancel-appointment',authUser,cancelAppointment)
userRouter.post('/payment/midtrans', authMiddleware, paymentMidtrans)
userRouter.post('/midtrans/webhook', midtransWebhook)
userRouter.get('/appointment-status/:id', authUser, getAppointmentStatus) 
userRouter.get('/prescriptions', authUser, getUserPrescriptions)
userRouter.get('/payment/calculate/:appointmentId', authUser, calculatePaymentDetails)

export default userRouter