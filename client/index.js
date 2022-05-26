const chokidar = require("chokidar");
const io = require("socket.io-client");
// const { PORT } = require("../shared/appDefined")
const PORT = 3000;

const socket = io(`ws://localhost:${PORT}`);

socket.on("connection", function (message) {
    console.log(message);
});

// socket.on("change", function (message) {
//     console.log(message);
// });

// socket.on("add", function (message) {
//     console.log(message);
// });
