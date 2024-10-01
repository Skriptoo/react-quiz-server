import { Socket } from "socket.io";
import { userService } from "../../User/userService";
import { checkIfRoomExists } from "../roomUtils";
import { roomService } from "../roomService";

export const joinRoom = async (socket: Socket) => {

  socket.on('join-room', async (roomCode: string, username: string) => {
    console.log(roomCode)
    if(await roomService.checkIfRoomExists(roomCode).then((room) => room === null)) {
      socket.nsp.to(socket.id).emit('room_not_found');
      return;
    }

    await userService.createUser(socket.id, username, roomCode);
    socket.join(roomCode);
    socket.nsp.to(socket.id).emit('join');
    console.log(`user ${username} connected to room ${roomCode}`);
    }
  );
};