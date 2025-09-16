import React from "react";

export default function renderTypingIndicator (isTyping)  {
        if (!isTyping) return null;
        return (
            <div className="flex justify-start mb-4">
                <div
                    className="bg-white text-gray-800 border border-gray-200 rounded-2xl rounded-bl-md px-4 py-2 shadow-lg">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">AI Assistant is typing</span>
                        <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div
                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                style={{animationDelay: "0.1s"}}
                            ></div>
                            <div
                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                style={{animationDelay: "0.2s"}}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }