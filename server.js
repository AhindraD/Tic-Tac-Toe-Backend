const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(express.static("public"));
app.use(cors());

const httpServer = app.listen(process.env.PORT || 8000, () => {
    const port = httpServer.address().port;
    console.log(`Server running on ${port}`);
});
const io = new Server(httpServer);

//let allInputs = [];

io.on("connection", (socket) => {
    console.log("Client Connected: ", socket.id);
    //socket.emit("history", allInputs);

    /*
        //DISPLAY MSG SYNC
        socket.on("chat-message", (data) => {
            console.log(`Message from ${socket.id}: ${data}`);
            //to deliver to everyone EXcept Sender
            socket.broadcast.emit("new-message", `Message from ${socket.id}: ${data}`);
    
            //too all including sender
            //io.emit("new-message", `Message from ${socket.id}: ${data}`);
        });
        */


    //DRAW SYNC
    socket.on("mouse-cords", (data) => {
        //console.log([data.x, data.y, data.colors]);
        socket.broadcast.emit("new-cords", data);
    })
    socket.on("store", (data) => {
        allInputs.push(data);
    })


    //CLEAR CANVAS SYNC
    socket.on("clear", (data) => {
        socket.broadcast.emit("new-clear", data);
        allInputs = [].slice();
    })


    socket.on("disconnect", () => {
        console.log(`Client Disconnected: `, socket.id);
    });
})