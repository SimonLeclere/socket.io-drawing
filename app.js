const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 80;
http.listen(port, () => console.log(`Server running on port ${port}`));

io.on('connection', (socket) => {
	socket.on('draw', (data) => socket.broadcast.emit('draw', data));
});