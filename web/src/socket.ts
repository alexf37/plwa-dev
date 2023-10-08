import { io } from "socket.io-client";

const CHAT_SERVER = "https://connect.xsschat.com";

export const socket = io(CHAT_SERVER, {
  autoConnect: false,
});
