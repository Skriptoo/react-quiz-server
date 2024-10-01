import { Socket } from "socket.io";
import { createRoom } from "./Sockets/createRoom";
import { joinRoom } from "./Sockets/joinRoom";

export const roomSockets = (socket: Socket) => {
  createRoom(socket);
  joinRoom(socket);
}