import { useContext, useEffect, useState } from "react";
import { ChatContext } from '../context/ChatContext'
import PrescriptionCard from './PrescriptionCard'

const ChatModal = ({ appointment, onClose }) => {
    const { socket, messages, setMessages } = useContext(ChatContext);
    const [input, setInput] = useState("");
    const [prescriptions] = useState([])

    const filteredMessages = messages.filter((msg) => msg.appointmentId === appointment._id)

    const sendMessage = () => {
        if (!input.trim()) return;
        socket.emit("sendMessage", {
            appointmentId: appointment._id,
            sender: "user",
            message: input,
        });
        setInput("");
    }

    useEffect(() => {
        if (appointment?._id) {
            socket.emit("joinRoom", appointment._id);
        }
    }, [appointment])

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white w-[90%] max-w-md p-4 rounded shadow-lg">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold">Chat with {appointment.docData.name}</h2>
                    <button onClick={onClose}>X</button>
                </div>
                <div className="h-64 overflow-y-auto border p-2 rounded mb-2">
                    {filteredMessages.map((msg, idx) => (
                        <p key={idx} className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                            <span className='inline-block px-2 py-1 rounded bg-blue-100 text-sm'>{msg.message}</span>
                        </p>
                    ))}
                </div>
                <div className="flex gap-2">
                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 border px-2 py-1 rounded" />
                    <button onClick={sendMessage} className="bg-[#00B8BA] text-white px-3 py-1 rounded">Send</button>
                </div>
                <div>
                    {/* chat UI */}
                    {prescriptions.map((presc) => (
                        <PrescriptionCard key={presc._id} prescription={presc} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChatModal
