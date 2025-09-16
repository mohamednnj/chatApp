import {Messages} from "./Messages.jsx";
import React from "react";
import renderTypingIndicator from "./RenderTypingIndicator.jsx";
import {useChatScroll} from "../hooks/useChatScroll.js";
import {useMessages} from "../hooks/useMessages.js";

// ---- Input Events ----
const handleKeyPress = (e, sendMessage) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
};

export default function MessagesContainer({
                                              sender,
                                              hasMoreOlder,
                                              topTriggerRef,
                                              loadingOlder,
                                              messagesContainerRef,
                                              setTotalMessages
                                          }) {
    const {messages, newMessage, setNewMessage, isTyping, sendMessage} =
        useMessages(sender, setTotalMessages);

    const {messagesEndRef} = useChatScroll(messages, loadingOlder);

    return (
        <div className="flex flex-col h-screen ml-0 sm:ml-64 ">
            {/* Messages Area */}
            <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto px-4 py-6 bg-gray-50"
                style={{paddingBottom: "140px"}}
            >
                <div className="max-w-4xl mx-auto">
                    <Messages
                        messages={messages}
                        sender={sender}
                        hasMoreOlder={hasMoreOlder}
                        topTriggerRef={topTriggerRef}
                        loadingOlder={loadingOlder}
                    />
                    {renderTypingIndicator(isTyping)}
                    <div ref={messagesEndRef}/>
                </div>
            </div>

            {/* Input Area */}
            <div className="fixed bottom-0 left-0 sm:left-64 right-0 bg-white border-t border-gray-200 px-4 py-4 shadow-lg">
                <div className="max-w-4xl mx-auto flex space-x-4">
                    <div className="flex-1 relative">
                        <textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => {
                                handleKeyPress(e, sendMessage);
                            }}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl resize-none focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all duration-200 text-gray-800 placeholder-gray-400"
                            placeholder="Type your message here..."
                            rows="1"
                            style={{minHeight: "48px", maxHeight: "120px"}}
                        />
                    </div>
                    <button
                        onClick={sendMessage}
                        disabled={newMessage.trim() === "" || isTyping}
                        className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-2xl font-semibold hover:from-rose-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-rose-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                    >
                        {isTyping ? "..." : "Send"}
                    </button>
                </div>
            </div>
        </div>
    )
}