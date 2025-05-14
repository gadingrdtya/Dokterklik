import { createContext, useState, useEffect } from 'react'
import socket from '../socket'
import { toast } from 'react-toastify'

export const ChatContext = createContext()

const ChatContextProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("receiveMessage", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => {
            socket.off("receiveMessage");
        };
    }, []);

    useEffect(() => {
        socket.on("prescriptionCreated", (data) => {
            toast.info(data.message || "Resep baru telah dibuat!");
        });

        return () => {
            socket.off("prescriptionCreated");
        };
    }, []);

    useEffect(() => {
        socket.on("prescriptionPaid", ({ prescriptionId }) => {
            toast.success("Pembayaran resep berhasil!")
            refreshPrescription && refreshPrescription()
        });

        return () => {
            socket.off("prescriptionPaid");
        };
    }, []);

    return (
        <ChatContext.Provider value={{ socket, messages, setMessages }}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatContextProvider