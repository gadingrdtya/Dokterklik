import chatModel from "../models/chatModel.js"

const sendMessage = async (req, res) => {
    try {
        const { appointmentId, sender, message } = req.body;
        const chat = await chatModel.create({ appointmentId, sender, message });
        res.json({ success: true, chat });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

const getMessages = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const messages = await chatModel.find({ appointmentId }).sort({ timestamp: 1 });
        res.json({ success: true, messages });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

export { sendMessage, getMessages }