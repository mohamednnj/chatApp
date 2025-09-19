import React, {useState} from "react";
import {login} from "../hooks/useSocket.js";

// ---- Handle Name Modal ----
const handleNameSubmit = (email,setEmail,setShowLoginForm ) => {
    if (email.trim()) {
        console.log("email from from",email);
        login(email)
        setEmail("")
        setShowLoginForm(false)
    }
};

const handleEmailKeyPress = (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        handleNameSubmit();
    }
};

export default function FormLogin({setShowLoginForm}) {
    const [email, setEmail] = useState("");


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-96 mx-4 shadow-2xl">
                <div className="text-center mb-6">
                    <div
                        className="w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-semibold text-2xl">👋</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome!</h2>
                    <p className="text-gray-600">Hello Iin Sirri Chat app ?</p>
                </div>
                <div className="space-y-4">
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={handleEmailKeyPress}
                        placeholder="Enter your name..."
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all duration-200"
                        autoFocus
                    />
                    <button
                        onClick={() => handleNameSubmit(email,setEmail,setShowLoginForm)}
                        disabled={!email.trim()}
                        className="w-full px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl font-semibold hover:from-rose-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-rose-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Start Chatting
                    </button>
                </div>
            </div>
        </div>
    )
}