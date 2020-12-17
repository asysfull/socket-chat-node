const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const app = express();
const path = require('path');


// para socket
let server = http.createServer(app);


const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

// static
app.use(express.static(publicPath));

// inicializamos socket
let io = socketIO(server);
let { SocketDev } = require('../server/sockets/socket');
SocketDev(io);

server.listen(port, (err) => {
    if (err) throw new Error(err);
    console.log(`run server port ${port}`);
})