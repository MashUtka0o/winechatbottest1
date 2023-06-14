const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
})

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("send_message", (data) =>{
        console.log(data);
        const answerMessage = {
            author: "bot",
            message: "Hi",
            time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
        };
        socket.emit("receive_message", answerMessage);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

server.listen(3000, () => {
    console.log("SERVER RUNNING");
});
