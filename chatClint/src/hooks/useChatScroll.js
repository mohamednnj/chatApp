import { useEffect, useRef } from "react";

export function useChatScroll(messages, loadingOlder) {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (!loadingOlder) {
            scrollToBottom();
        }
    }, [messages.length, loadingOlder]);

    return { messagesEndRef, scrollToBottom };
}
