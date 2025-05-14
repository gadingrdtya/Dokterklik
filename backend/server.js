import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'
import webhookRouter from './routes/webhookRoute.js'
import http from 'http'
import { Server } from 'socket.io'
import chatRouter from './routes/chatRoute.js'
import prescriptionRouter from './routes/prescriptionRoute.js'
import chatModel from './models/chatModel.js'

// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// socket.io
const server = http.createServer(app)
const io = new Server(server, {
    cors: { origin: "*" }
})

// inject io ke setiap req
app.use((req, res, next) => {
    req.io = io;
    next();
});

// middlewares
app.use(express.json())
app.use(cors())

// socket handler
io.on("connection", (socket) => {
    socket.on("joinRoom", (roomId) => {
        socket.join(roomId);
    });

    socket.on("sendMessage", async (data) => {
        const { appointmentId, sender, message } = data;

        // Kirim ke semua client di room
        io.to(appointmentId).emit("receiveMessage", data);

        // Simpan ke DB
        try {
            await chatModel.create({ appointmentId, sender, message });
        } catch (err) {
            console.error("Failed to save chat message:", err.message);
        }
    });
});

// api chat
app.use('/api/chat', chatRouter)
app.use('/api/user/prescription', prescriptionRouter)

// api endpoint
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)
app.use('/api/webhook', webhookRouter)

app.get('/', (req, res) => {
    res.send('API WORKING')
})

server.listen(port, () => console.log(`Server Started on port ${port}`))