import { Room } from "@prisma/client";
import { roomService } from "./roomService";

export const checkIfRoomExists = async (roomCode: string) => {
  return await new Promise<boolean>((resolve) => {
    if(roomService.checkIfRoomExists(roomCode) != null) {
      resolve(true);
    }
    else {
      resolve(false);
    }
  });
};