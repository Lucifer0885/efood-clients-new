import { io } from 'socket.io-client';

const SOCKET_URL: string = 'http://localhost:3033'; // Replace with your actual socket server URL

export const socket = io(SOCKET_URL);