import { io } from 'socket.io-client';

const SOCKET_URL = 'https://ntamtech.com';

class SocketService {
    constructor() {
        this.socket = null;
    }

    initializeSocket = async () => {
        try {
            this.socket = io(SOCKET_URL, {
                // transports: ['websocket']
            });

            // console.log("Initializing socket", this.socket);

            this.socket.on('connection', data => {
                console.log("<<=== Socket Connected ===>");
            });
        } catch (error) {
            console.log("Error in socket initialization", error);
            throw error;
        }
    };

    emit(event, data = {}) {
        if (this.socket) {
            this.socket.emit(event, data);
        }
    }

    on(event, callback) {
        if (this.socket) {
            this.socket.on(event, callback);
        }
    }

    off(event, callback) {
        if (this.socket) {
            this.socket.off(event, callback);
        }
    }
}

const socketService = new SocketService();
export default socketService;