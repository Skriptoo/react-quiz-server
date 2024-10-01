import { Socket } from "socket.io";
import { userService } from "../userService";

export const sendUserList = async (socket: Socket) => {
  socket.on('get_user_list', async () => {
    const roomCode = Array.from(socket.rooms)
    .filter((room) => room !== socket.id)
    .toString();
    const users = await userService.getUsersInRoom(roomCode);
    socket.nsp.to(roomCode).emit('users_list', users);
  });
}