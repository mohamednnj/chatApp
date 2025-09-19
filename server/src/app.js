import {io, server} from './utiles/socket.io.js';
import emitMessage from './utiles/emitMessage.js';
import storeSockets from "./utiles/storeSockets.js";
import {sendEmail} from "./utiles/emailService.js";


const addSocket = storeSockets();
io.on("connection", (socket) => {
    const {chatId, publicChat, groupsOfChat} = addSocket(socket)

    socket.on("sendMessage", (message) => {
        console.log("📩 Message:", message);
        if (chatId) {
            emitMessage(groupsOfChat[chatId], socket, message)
        } else {
            emitMessage(publicChat, socket, message)
        }
    });

    socket.on("login", async (email) => {
        console.log("email:", email)
        await sendEmail(email)
    })

    socket.on("disconnect", () => {
        console.log("❌ User disconnected:", socket.id);
    });
});


export default server;
