# socket.io-drawing

Simple real-time drawing application using Socket.io

# How does it work?

The drawing area is a simple `<canvas>` tag.
Each time the page is loaded, a color is generated and assigned to the user.
If the mouse moves and the click button is pressed, then the path is transmitted to all users via a socket (managed with socket.io) which will trace the drawing on all open pages.