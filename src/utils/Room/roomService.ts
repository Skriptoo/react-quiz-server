import { Room } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const roomService = {
    createRoom: (roomCode: string) => {
      return prisma.room.create({
        data: {
          roomCode: roomCode,
        }
      });
    },
    checkIfRoomExists: (roomCode: string) => {
      return prisma.room.findUnique({
        where: {
          roomCode: roomCode
        }
      });
    },
    deleteRoom: (roomCode: string) => {
      return prisma.room.delete({
        where: {
          roomCode: roomCode
        }
      });
    }
}