import { io } from "socket.io-client";

const backenUrl = 'https://api.ntamtech.com'

const Socket = io(backenUrl);

// Listen for the "disconnect" event
Socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", reason);
});

export default Socket;