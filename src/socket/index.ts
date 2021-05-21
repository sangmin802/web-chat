import { io, Socket } from "socket.io-client";
interface ISocet extends Socket {
  userID?: string;
}

const url = "http://localhost:3001/web-chat";

export const socket: ISocet = io(url, { autoConnect: false });

socket.onAny((event, ...args) => {
  // console.log(event, args);
});
