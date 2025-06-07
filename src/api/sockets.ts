import { io } from 'socket.io-client';

const SOCKET_URL: string = 'http://localhost:3033';

export const socket = io(SOCKET_URL);