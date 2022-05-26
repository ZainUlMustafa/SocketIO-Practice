const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const chokidar = require("chokidar");
var fs = require("fs");
var crypto = require("crypto");
// const { PORT } = require("../shared/appDefined")
const PORT = 3000;

app.get('/', (req, res) => {
    res.send({
        isDoneAndSent: true,
        responseMsg: "SERVER UP!"
    })
});

io.on('connection', (socket) => {
    console.log('a user connected');

    var watchHash;
    chokidar.watch('./target.json', {}).on('all', function (event, path, stats) {

        if (event == "add" || event == "change"){

            getHash(path, function(hash){
                const millis = new Date().getTime()
                if (hash != watchHash){
                    watchHash = hash;
                    console.log(event, hash);
                    io.emit('connection', {
                        isDoneAndSent: true,
                        responseMsg: {
                            data: {
                                hash: hash,
                            },
                            servertime: `${millis}`,
                            messageForUser: ""
                        }
                    });
                }
            });
        }
    }).on('ready', function (path, stats) {
        console.log('ready');
    });
});

function getHash(filePath, callback){

    var stream = fs.ReadStream(filePath);   
    var md5sum = crypto.createHash("md5");

    stream.on("data", function(data) {
        md5sum.update(data);
    });

    stream.on("end", function() {
        callback(md5sum.digest("hex"));
    });
}

server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});