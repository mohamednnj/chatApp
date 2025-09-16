import React from "react";

export const Header = ({totalMessages, page, hasMoreOlder, sender, loadingOlder}) => {
    return (
        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div
                        className="w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">💬</span>
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold text-gray-800">
                            Enhanced Chat
                        </h1>
                        <p className="text-sm text-gray-500">
                            {totalMessages} messages •{" "}
                            {hasMoreOlder ? "More available" : "All loaded"}
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-sm font-medium text-gray-700">
                        Hello, {sender}! 👋
                    </div>
                    <div className="text-xs text-gray-500">
                        {loadingOlder ? "Loading..." : `Page ${page}`}
                    </div>
                    {!hasMoreOlder && (
                        <div className="text-xs text-green-600 font-medium">
                            ✓ All history loaded
                        </div>
                    )}
                </div>
            </div>
        </div>

    )
}