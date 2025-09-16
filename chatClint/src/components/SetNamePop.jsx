import React, {useState} from "react";

// ---- Handle Name Modal ----
const handleNameSubmit = (tempName,setSender,setShowNameModal,setTempName) => {
    if (tempName.trim()) {
        localStorage.setItem("sender", tempName);
        setSender(tempName.trim());
        setShowNameModal(false);
        setTempName("");
    }
};

const handleNameKeyPress = (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        handleNameSubmit();
    }
};

export default function SetNamePop({setSender,setShowName}) {
    const [tempName, setTempName] = useState("");

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-96 mx-4 shadow-2xl">
                <div className="text-center mb-6">
                    <div
                        className="w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-semibold text-2xl">👋</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome!</h2>
                    <p className="text-gray-600">What should we call you?</p>
                </div>
                <div className="space-y-4">
                    <input
                        type="text"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        onKeyDown={handleNameKeyPress}
                        placeholder="Enter your name..."
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all duration-200"
                        autoFocus
                    />
                    <button
                        onClick={()=>handleNameSubmit(tempName,setSender,setShowName,setTempName)}
                        disabled={!tempName.trim()}
                        className="w-full px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl font-semibold hover:from-rose-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-rose-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Start Chatting
                    </button>
                </div>
            </div>
        </div>
    )
}