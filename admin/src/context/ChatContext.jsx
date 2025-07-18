import React, { createContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

export const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const newSocket = io(`${import.meta.env.VITE_BACKEND_URL}`)
        setSocket(newSocket);

        newSocket.on("receiveMessage", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => newSocket.disconnect();
    }, []);

    return (
        <ChatContext.Provider value={{ socket, messages, setMessages }}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatContextProvider