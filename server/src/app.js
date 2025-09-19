import express from 'express';
import {createServer} from 'node:http';
import {Server} from "socket.io";

/**
 * Emits a message to a list of sockets.
 *
 * @param {Array} l - List of sockets to emit the message to
 * @param {Object} s - The sender socket (who is sending the message)
 * @param {string} m - Message want send
 *
 */
const emitMessage = (l, s, m) => {
    l.forEach(e => {
        if (e.id !== s.id) {
            e.emit("receiveMessage", m)
        }
    })
}
const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "http://10.112.225.44:5173"], // React app
        methods: ["GET", "POST"],
    },
});
let publicChat = []
let groupsOfChat = {}

io.on("connection", (socket) => {
    const chatId = socket.handshake.query?.chatId;
    if (chatId) {
        if (!groupsOfChat[chatId]) {
            groupsOfChat[chatId] = [socket];
        } else {
            groupsOfChat[chatId].push(socket);
        }
    } else {
        publicChat.push(socket);
    }
    console.log("⚡ User connected:", socket.id);

    socket.on("sendMessage", (message) => {
        console.log("📩 Message:", message);
        if (chatId) {
            emitMessage(groupsOfChat[chatId], socket, message)
        } else {
            emitMessage(publicChat, socket, message)
        }
    });

    socket.on("disconnect", () => {
        console.log("❌ User disconnected:", socket.id);
    });
});


export default server;
