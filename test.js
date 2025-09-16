import React, { useState } from "react";
import { useSocket } from "./hooks/useSocket";

function App() {
    const { messages, sendMessage } = useSocket();
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (input.trim() !== "") {
            sendMessage(input);
            setInput("");
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>💬 Chat</h2>
            <div style={{ border: "1px solid #ccc", padding: 10, height: 200, overflowY: "auto" }}>
                {messages.map((msg, idx) => (
                    <p key={idx}>{msg}</p>
                ))}
            </div>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
}

export default App;
