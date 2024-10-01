import { Socket } from "socket.io";
import { roomService } from "../roomService";
import { userService } from "../../User/userService";

export const createRoom = async (socket: Socket) => {
  socket.on('create_room', async (username: string, roomCode: string) => {
    console.log("roomCode", roomCode); 

    await new Promise<void>(async (resolve) => {
      await roomService.createRoom(roomCode);
      await userService.createUser(socket.id, username, roomCode);
      resolve();
    }).then(async () => {
      socket.join(roomCode);
      console.log(`user ${username} created room ${roomCode}`);
    });
    }
  );
}