import mongoose from "mongoose"

const chatSchema = new mongoose.Schema({
  appointmentId: { type: String, required: true },
  sender: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
})

const ChatModel = mongoose.model('chats', chatSchema)

export default ChatModel