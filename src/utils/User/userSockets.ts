import { Socket } from "socket.io";
import { sendUserList } from "./Sockets/sendUserList";
import { disconnectUser } from "./Sockets/disconnectUser";

export const userSockets = (socket: Socket) => {
  sendUserList(socket);
  disconnectUser(socket);
}