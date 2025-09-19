/**
 * Emits a message to a list of sockets.
 *
 * @param {Array} l - List of sockets to emit the message to
 * @param {Object} s - The sender socket (who is sending the message)
 * @param {string} m - Message want send
 *
 */
const emitMessage = (l, s, m) => {
    if (!Array.isArray(l)) return;

    l.forEach(e => {
        if (e.id !== s.id) {
            e.emit("receiveMessage", m)
        }
    })
}

export default emitMessage