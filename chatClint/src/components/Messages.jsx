// import React from "react";
//
// const renderLoadingIndicator = (loadingOlder) => {
//     if (!loadingOlder) return null;
//     return (
//         <div className="flex justify-center mb-4">
//             <div className="bg-gray-200 px-4 py-2 rounded-full flex items-center space-x-2">
//                 <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
//                 <span className="text-gray-600 text-sm">Loading older messages...</span>
//             </div>
//         </div>
//     );
// };
//
// export function Messages({messages, sender, hasMoreOlder, topTriggerRef, loadingOlder}) {
//
//     renderLoadingIndicator(loadingOlder)
//
//     const renderMessage = (message) => {
//         const isMe = message.sender === sender;
//         const isSystem = message.sender === "system";
//
//         if (isSystem) {
//             return (
//                 <div key={message.id} className="flex justify-center mb-4">
//                     <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
//                         {message.message}
//                     </div>
//                 </div>
//             );
//         }
//
//         return (
//             <div
//                 key={message.id}
//                 className={`flex mb-4 ${isMe ? "justify-end" : "justify-start"}`}
//             >
//                 <div
//                     className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl ${
//                         isMe
//                             ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-br-md"
//                             : "bg-white text-gray-800 border border-gray-200 rounded-bl-md"
//                     }`}
//                 >
//                     {!isMe && (
//                         <div className="text-xs font-medium text-gray-500 mb-1">
//                             {message.sender}
//                         </div>
//                     )}
//                     <div className="break-words leading-relaxed">{message.message}</div>
//                     <div
//                         className={`text-xs mt-2 ${
//                             isMe ? "text-rose-100" : "text-gray-500"
//                         } text-right`}
//                     >
//                         {message.time}
//                     </div>
//                 </div>
//             </div>
//         );
//     };
//
//     if (!messages || messages.length === 0) {
//         return (
//             <div className="flex items-center justify-center h-64 text-gray-500">
//                 <div className="text-center">
//                     <div className="text-4xl mb-2">💬</div>
//                     <div>No messages yet</div>
//                     <div className="text-sm">Start a conversation!</div>
//                 </div>
//             </div>
//         );
//     }
//
//     return (
//         <>
//             {hasMoreOlder && <div ref={topTriggerRef} className="h-4"></div>}
//             {renderLoadingIndicator()}
//             {messages.map((m) => renderMessage(m))}
//         </>
//     );
// }
//

import React, { useState, useRef, useEffect } from "react";

const renderLoadingIndicator = (loadingOlder) => {
    if (!loadingOlder) return null;
    return (
        <div className="flex justify-center mb-6">
            <div className="bg-white shadow-md px-5 py-3 rounded-2xl flex items-center space-x-3 border border-gray-100">
                <div className="relative">
                    <div className="w-5 h-5 border-2 border-gray-300 border-t-rose-500 rounded-full animate-spin"></div>
                </div>
                <span className="text-gray-600 text-sm font-medium">Loading older messages...</span>
            </div>
        </div>
    );
};

const MessageAvatar = ({ sender, isMe }) => {
    if (isMe) return null;

    return (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-semibold mr-3 shadow-md">
            {sender.charAt(0).toUpperCase()}
        </div>
    );
};

const MessageStatus = ({ isMe, time, isDelivered = true, isRead = false }) => {
    return (
        <div className={`flex items-center space-x-1 text-xs mt-2 ${isMe ? "text-rose-100" : "text-gray-500"}`}>
            <span>{time}</span>
            {isMe && (
                <div className="flex space-x-1">
                    {/* Delivered indicator */}
                    <svg className={`w-3 h-3 ${isDelivered ? 'text-rose-200' : 'text-rose-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {/* Read indicator (double check) */}
                    {isRead && (
                        <svg className="w-3 h-3 text-rose-200 -ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    )}
                </div>
            )}
        </div>
    );
};

const MessageMenu = ({ message, isMe, onReply, onEdit, onDelete, onCopy }) => {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        if (showMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showMenu]);

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setShowMenu(!showMenu)}
                className={`opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-gray-100 ${isMe ? 'hover:bg-rose-100' : ''}`}
            >
                <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
            </button>

            {showMenu && (
                <div className={`absolute ${isMe ? 'right-0' : 'left-0'} mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10`}>
                    <button
                        onClick={() => { onReply(message); setShowMenu(false); }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                        </svg>
                        <span>Reply</span>
                    </button>

                    <button
                        onClick={() => { onCopy(message.message); setShowMenu(false); }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span>Copy</span>
                    </button>

                    {isMe && (
                        <>
                            <button
                                onClick={() => { onEdit(message); setShowMenu(false); }}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                <span>Edit</span>
                            </button>

                            <button
                                onClick={() => { onDelete(message); setShowMenu(false); }}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                <span>Delete</span>
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

const MessageReactions = ({ reactions = [], onAddReaction, onRemoveReaction, currentUser }) => {
    const availableReactions = ['👍', '❤️', '😂', '😮', '😢', '😡'];
    const [showReactionPicker, setShowReactionPicker] = useState(false);

    const handleReactionClick = (reaction) => {
        const userReacted = reactions.find(r => r.emoji === reaction && r.users.includes(currentUser));
        if (userReacted) {
            onRemoveReaction(reaction);
        } else {
            onAddReaction(reaction);
        }
    };

    if (!reactions.length && !showReactionPicker) {
        return (
            <button
                onClick={() => setShowReactionPicker(true)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600 text-sm"
            >
                😊+
            </button>
        );
    }

    return (
        <div className="flex items-center space-x-1 mt-1">
            {reactions.map((reaction, index) => (
                <button
                    key={index}
                    onClick={() => handleReactionClick(reaction.emoji)}
                    className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs transition-all ${
                        reaction.users.includes(currentUser)
                            ? 'bg-rose-100 text-rose-600'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                    }`}
                >
                    <span>{reaction.emoji}</span>
                    <span>{reaction.count}</span>
                </button>
            ))}

            {showReactionPicker && (
                <div className="relative">
                    <div className="flex space-x-1 bg-white border rounded-lg p-1 shadow-lg">
                        {availableReactions.map((emoji) => (
                            <button
                                key={emoji}
                                onClick={() => {
                                    onAddReaction(emoji);
                                    setShowReactionPicker(false);
                                }}
                                className="p-1 hover:bg-gray-100 rounded"
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export function Messages({ messages, sender, hasMoreOlder, topTriggerRef, loadingOlder }) {
    const [replyingTo, setReplyingTo] = useState(null);

    const handleReply = (message) => {
        setReplyingTo(message);
        // Focus on input field or trigger reply state
    };

    const handleEdit = (message) => {
        // Implement edit functionality
        console.log('Edit message:', message);
    };

    const handleDelete = (message) => {
        // Implement delete functionality
        console.log('Delete message:', message);
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        // Show toast notification
    };

    const handleAddReaction = (messageId, emoji) => {
        // Implement add reaction
        console.log('Add reaction:', messageId, emoji);
    };

    const handleRemoveReaction = (messageId, emoji) => {
        // Implement remove reaction
        console.log('Remove reaction:', messageId, emoji);
    };

    const renderMessage = (message, index) => {
        const isMe = message.sender === sender;
        const isSystem = message.sender === "system";
        const prevMessage = messages[index - 1];
        const nextMessage = messages[index + 1];

        // Check if this message should be grouped with the previous one
        const isGrouped = prevMessage &&
            prevMessage.sender === message.sender &&
            prevMessage.sender !== "system" &&
            (message.timestamp - prevMessage.timestamp) < 300000; // 5 minutes

        // Check if this is the last message in a group
        const isLastInGroup = !nextMessage ||
            nextMessage.sender !== message.sender ||
            nextMessage.sender === "system" ||
            (nextMessage.timestamp - message.timestamp) > 300000;

        if (isSystem) {
            return (
                <div key={message.id} className="flex justify-center mb-6">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-6 py-3 rounded-2xl text-sm font-medium shadow-sm border border-blue-100">
                        <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            <span>{message.message}</span>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div
                key={message.id}
                className={`group flex mb-${isLastInGroup ? '6' : '1'} ${isMe ? "justify-end" : "justify-start"} ${
                    isGrouped ? 'mt-1' : 'mt-4'
                }`}
            >
                <div className={`flex ${isMe ? 'flex-row-reverse' : 'flex-row'} items-end max-w-xs lg:max-w-md`}>
                    {!isMe && !isGrouped && <MessageAvatar sender={message.sender} isMe={isMe} />}
                    {!isMe && isGrouped && <div className="w-8 mr-3"></div>}

                    <div className="flex flex-col">
                        {replyingTo && replyingTo.id === message.replyTo && (
                            <div className={`text-xs text-gray-500 mb-1 px-1 ${isMe ? 'text-right' : 'text-left'}`}>
                                Replying to: "{replyingTo.message.substring(0, 30)}..."
                            </div>
                        )}

                        <div
                            className={`relative px-4 py-3 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md ${
                                isMe
                                    ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white"
                                    : "bg-white text-gray-800 border border-gray-200"
                            } ${
                                isGrouped && isMe ? 'rounded-tr-md' : isGrouped && !isMe ? 'rounded-tl-md' : ''
                            } ${
                                isLastInGroup && isMe ? 'rounded-br-md' : isLastInGroup && !isMe ? 'rounded-bl-md' : ''
                            }`}
                        >
                            {!isMe && !isGrouped && (
                                <div className="text-xs font-semibold text-gray-600 mb-1">
                                    {message.sender}
                                </div>
                            )}

                            <div className="break-words leading-relaxed whitespace-pre-wrap">
                                {message.message}
                            </div>

                            <div className={`flex items-center justify-between mt-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                                <MessageStatus
                                    isMe={isMe}
                                    time={message.time}
                                    isDelivered={true}
                                    isRead={Math.random() > 0.5} // Random for demo
                                />

                                <div className="flex items-center space-x-1">
                                    <MessageMenu
                                        message={message}
                                        isMe={isMe}
                                        onReply={handleReply}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                        onCopy={handleCopy}
                                    />
                                </div>
                            </div>
                        </div>

                        <MessageReactions
                            reactions={message.reactions || []}
                            onAddReaction={(emoji) => handleAddReaction(message.id, emoji)}
                            onRemoveReaction={(emoji) => handleRemoveReaction(message.id, emoji)}
                            currentUser={sender}
                        />
                    </div>
                </div>
            </div>
        );
    };

    if (!messages || messages.length === 0) {
        return (
            <div className="flex items-center justify-center h-64 text-gray-500">
                <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </div>
                    <div className="text-lg font-medium text-gray-600 mb-2">No messages yet</div>
                    <div className="text-sm text-gray-500">Start a conversation!</div>
                </div>
            </div>
        );
    }

    return (
        <>
            {hasMoreOlder && <div ref={topTriggerRef} className="h-4"></div>}
            {renderLoadingIndicator(loadingOlder)}
            <div className="space-y-2">
                {messages.map((message, index) => renderMessage(message, index))}
            </div>
        </>
    );
}