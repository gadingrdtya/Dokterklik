import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from '../context/ChatContext'
import { AppContext } from "../context/AppContext";
import PrescriptionCard from './PrescriptionCard'
import axios from 'axios'
import { toast } from 'react-toastify'

const ChatModal = ({ appointment, onClose }) => {
    const { socket, messages, setMessages } = useContext(ChatContext);
    const { backendUrl, token } = useContext(AppContext)
    const [input, setInput] = useState("");
    const [prescriptions, setPrescriptions] = useState([])
    const [orderDetails, setOrderDetails] = useState(null)
    const [showPayButton, setShowPayButton] = useState(false)

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

    const fetchPrescriptions = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/prescriptions`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const filtered = data.prescriptions.filter(p => p.appointmentId.toString() === appointment._id);
            setPrescriptions(filtered);
            if (filtered.length > 0 && !appointment.payment) {
                setShowPayButton(true);
                fetchOrderDetails();
            }
        } catch (error) {
            console.error('Fetch Prescriptions Error:', error);
            toast.error(error.message);
        }
    }

    const fetchOrderDetails = async () => {
        try {
            const { data } = await axios.get(
                `${backendUrl}/api/user/payment/calculate/${appointment._id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (data.success) {
                setOrderDetails(data.details);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Fetch Order Details Error:', error);
            toast.error(error.message);
        }
    }

    const handlePayment = async () => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/user/payment/midtrans`,
                { appointmentId: appointment._id, total: orderDetails.total },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (data.success) {
                const snapToken = data.snapToken;
                if (snapToken) {
                    window.snap.pay(snapToken, {
                        onSuccess: () => {
                            toast.success('Payment Successful!');
                            onClose();
                        },
                        onPending: () => toast.info('Payment is pending.'),
                        onError: () => toast.error('Payment failed.'),
                        onClose: () => console.log('Snap closed.'),
                    });
                } else {
                    toast.error("Snap token not received");
                }
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Payment Error:', error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (appointment?._id) {
            socket.emit("joinRoom", appointment._id);
        }
    }, [appointment])

    useEffect(() => {
        if (appointment?._id) {
            fetchPrescriptions();
        }
    }, [appointment])

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white w-full max-w-md p-4 rounded shadow-lg">
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
                {showPayButton && orderDetails && (
                    <div className="mt-4 border-t pt-3">
                        <h4 className="text-md font-semibold mb-2">Order Details</h4>
                        <p>Doctor Fee: Rp.{orderDetails.doctorFee}</p>
                        <p>Consultation Fee: Rp.{orderDetails.consultationFee}</p>
                        <p>Prescription Fee: Rp.{orderDetails.prescriptionFee}</p>
                        <p>Total: ${orderDetails.total}</p>
                        <button
                            onClick={handlePayment}
                            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                        >
                            Pay Now
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatModal