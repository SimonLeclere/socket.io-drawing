/* eslint-disable no-undef */

const distance = (x1, y1, x2, y2) => Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
const getAngle = (x, y) => Math.atan(y / (x == 0 ? 0.01 : x)) + (x < 0 ? Math.PI : 0);

function drawLine(context, x1, y1, x2, y2, color) {
	context.fillStyle = color;
	const dist = distance(x1, y1, x2, y2); // Longueur du trait
	const ang = getAngle(x2 - x1, y2 - y1); // Angle du trait
	for(let i = 0;i < dist;i++) context.fillRect(Math.round(x1 + Math.cos(ang) * i), Math.round(y1 + Math.sin(ang) * i), 5, 5);
}

document.addEventListener('DOMContentLoaded', () => {
	const canvas = document.getElementById('canvas');
	const context = canvas.getContext('2d');
	const width = window.innerWidth;
	const height = window.innerHeight;

	const color = `hsl(${360 * Math.random()},${25 + 70 * Math.random()}%,${75 + 10 * Math.random()}%)`;

	canvas.width = width;
	canvas.height = height;
	context.translate(0.5, 0.5);

	context.fillStyle = '#c2c2c2';
	context.font = '30px Dancing Script';
	context.fillText('Just draw anything you like :)', 10, 50);

	let drawing = false;
	let x, y, prevX, prevY;

	const socket = io.connect();

	canvas.onmousedown = () => {
		drawing = true;
		prevX = x;
		prevY = y;
	};

	canvas.onmouseup = () => {
		drawing = false;
		// document.querySelector('meta[property="og:image"]').setAttribute('content', canvas.toDataURL());
	};

	canvas.onmousemove = (e) => {
		x = e.clientX;
		y = e.clientY;
		if (drawing) {
			socket.emit('draw', {
				'x1': prevX,
				'y1': prevY,
				'x2': x,
				'y2': y,
				color: color,
			});

			drawLine(context, prevX, prevY, x, y, color);
			prevX = x;
			prevY = y;
		}
	};

	socket.on('draw', (data) => drawLine(context, data.x1, data.y1, data.x2, data.y2, data.color));
});
