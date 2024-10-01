import { Socket } from "socket.io";
import { userService } from "../userService";
import { roomService } from "../../Room/roomService";
import { sendUserList } from "./sendUserList";
import { deleteUser } from "../userRepository";
export const disconnectUser = async (socket: Socket) => {
  socket.on('disconnect', async () => {
    const user = await userService.getUser(socket.id);
    if(!user) return;

    await new Promise<void>(async (resolve) => {
      roomService.checkIfRoomExists(user.roomCode).then(async (room) => {
        console.log("room", room);
      });
      
      deleteUser(user.id);
      let usersInRoom = await userService.getUsersInRoom(user.roomCode);
      if(usersInRoom.length === 0) {
        console.log("ni ma userów")
        await roomService.deleteRoom(user.roomCode);
      }
      console.log("user roomcode" + user.roomCode);
      resolve();
    }).then(async () => {
      console.log("usunięto użytkownika")
      sendUserList(socket);
      console.log(`user ${socket.id} disconnected`);
    });
  });
};