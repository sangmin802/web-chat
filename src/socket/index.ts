import { io, Socket } from "socket.io-client";

const url = "http://localhost:3001/web-chat";

export const socket: Socket = io(url, { autoConnect: false });

socket.onAny((event, ...args) => {
  console.log(event, args);
});
