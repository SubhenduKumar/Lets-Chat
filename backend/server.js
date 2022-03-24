// const express=require('express')
// const app =express();

const app = require("express")();

const cors = require("cors");
app.use(cors());

const { Server } = require("socket.io");

//  const http = require("http");
//  const server = http.createServer(app);
const server = require("http").createServer(app);

//  const io = require('socket.io')(server) // I can use like this also as shown in the documentation
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

server.listen(3001, () => {
    console.log("SERVER RUNNING");
});

//  app.listen(5000,()=>console.log("Server is active"));   //This is not the way we have to create a listing server.