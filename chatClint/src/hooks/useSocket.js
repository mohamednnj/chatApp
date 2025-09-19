// useSocket.js
import {useEffect, useState} from "react";
import {io} from "socket.io-client";

const socket = io("/", {
    transports: ["websocket", "polling"],
    query: {
        chatId: new URL(window.location.href).searchParams.get('chatId'),
    }
});

function formatTime(date) {
    return date.getHours().toString().padStart(2, "0") + ":" +
        date.getMinutes().toString().padStart(2, "0");
}

const generateId = () => Math.random().toString(36).substr(2, 9);

export function useSocket() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            message: "Welcome to our enhanced chat! 🎉",
            sender: "system",
            time: formatTime(new Date()),
            timestamp: Date.now()
        }
    ]);

    const listen = (message = "Hello") => {
        setTimeout(() => {
            const responseMessage = {
                id: generateId(),
                message: message,
                sender: "AI Assistant",
                time: formatTime(new Date()),
                timestamp: Date.now()
            };

            setMessages(prev => [...prev, responseMessage]);
        }, 1200 + Math.random() * 800);
    }

    useEffect(() => {
        socket.on("receiveMessage", (message) => {
            listen(message);
        });

        return () => {
            socket.off("receiveMessage");
        };
    }, []);

    const sendMessageToServer = (msg) => {
        socket.emit("sendMessage", msg);
    };

    return {messages, sendMessageToServer, setMessages, listen};
}