
// useMessages.js
import {useState} from "react";
import {useSocket} from "./useSocket.js";

const generateId = () => Math.random().toString(36).substr(2, 9);

function formatTime(date) {
    return date.getHours().toString().padStart(2, "0") + ":" +
        date.getMinutes().toString().padStart(2, "0");
}

export function useMessages(sender, setTotalMessages) {
    const {messages, sendMessageToServer, setMessages} = useSocket();

    const [newMessage, setNewMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const handleMessages = () => {
        if (newMessage.trim() === "") return;

        const message = {
            id: generateId(),
            message: newMessage,
            sender,
            time: formatTime(new Date()),
            timestamp: Date.now()
        };

        setMessages(prev => [...prev, message]);
        setTotalMessages(prev => prev + 1);
        sendMessageToServer(newMessage);
        setNewMessage("");

        return message;
    }

    const sendMessage = () => {
        setIsTyping(true);
        setTimeout(()=>true,1000)
        handleMessages();
        setIsTyping(false);


    }

    return {
        messages,
        newMessage,
        setNewMessage,
        isTyping,
        setIsTyping,
        sendMessage
    };
}

