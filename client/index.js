const chokidar = require("chokidar");
const io = require("socket.io-client");
// const { PORT } = require("../shared/appDefined")
const PORT = 3000;

const socket = io(`ws://192.168.1.105:${PORT}`);

socket.on("connection", function (message) {
    socket.emit('restDataEvent', {"data": 'I\'m connected to rest data stream!'});
    console.log(message);
});

socket.on("restResp", function (message) {
    console.log(message);
});

// socket.on("add", function (message) {
//     console.log(message);
// });
