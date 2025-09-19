const pushSockets = () => {

    let publicChat = []
    let groupsOfChat = {}
    return function (socket) {
        const chatId = socket.handshake.query?.chatId;
        if (chatId !== null ) {
            if (!groupsOfChat[chatId]) {
                groupsOfChat[chatId] = [socket];
            } else {
                groupsOfChat[chatId].push(socket);
            }
        } else {
            publicChat.push(socket);
        }
        return {chatId, publicChat, groupsOfChat};
    }
}

/**
 * store to a list of sockets.
 *
 * @param {Object} socket - The socket obj for connected user.

 */
function storeSockets() {
    return pushSockets()
}

export default storeSockets