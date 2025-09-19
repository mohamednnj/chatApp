import {Server} from "socket.io";
import express from "express";
import {createServer} from "node:http";

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "http://10.112.225.44:5173"], // React app
        methods: ["GET", "POST"],
    },
});

export {
    io,
    app,
    server,
}
