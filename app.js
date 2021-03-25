const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

http.listen(80, () => console.log('Server running on port 80'));

io.on('connection', (socket) => {
	socket.on('draw', (data) => socket.broadcast.emit('draw', { ...data }));
});
