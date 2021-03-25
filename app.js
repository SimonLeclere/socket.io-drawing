const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

http.listen(5000, () => console.log('Server running on port 5000'));

io.on('connection', (socket) => {
	socket.on('draw', (data) => socket.broadcast.emit('draw', { ...data }));
});
