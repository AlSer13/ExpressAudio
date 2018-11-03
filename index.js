const express = require('express');
const app = express();
const logger = require('morgan');
const http = require('http').Server(app);
const io = require('socket.io')(http);

let i = 0;

app.use(express.static(__dirname + '/public'));
app.use(logger('dev'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('connected ' + i++);
    socket.on('play', (time) => {
        socket.broadcast.emit('played', time);
        // console.log("played");
    });
    socket.on('pause', (time) => {
        socket.broadcast.emit('paused', time);
        // console.log('paused');
    });
    socket.on('disconnect', () => console.log('disconnected'));
});

http.listen(3000, () => console.log('listening on *:3000'));