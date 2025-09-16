import express from 'express';
import {createServer} from 'node:http';
import {Server} from "socket.io";

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000","http://10.112.225.44:5173"], // React app
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("⚡ User connected:", socket.id);

    socket.on("sendMessage", (message) => {
        console.log("📩 Message:", message);
        socket.broadcast.emit("receiveMessage", message);
    });

    socket.on("disconnect", () => {
        console.log("❌ User disconnected:", socket.id);
    });
});


export default server;
