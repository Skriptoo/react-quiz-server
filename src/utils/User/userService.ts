import { User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userService = {
    getUser: async (id: string) => {
      return prisma.user.findUnique({
        where: {
          id: id
        }
      });
    },
    getUsersInRoom: async (roomCode: string) => {
      return prisma.user.findMany({
        where: {
          roomCode: roomCode
        }
      });
    },
    createUser: async (id: string, username: string, roomCode: string) => {
      return prisma.user.create({
        data: {
          id: id,
          username: username,
          roomCode: roomCode
        }
      });
    },
    deleteUser: async (id: string) => {
      return prisma.user.delete({
        where: {
          id: id
        }
      });
    },
    assignUserToRoom: async (id: string, roomCode: string) => {
      return prisma.user.update({
        where: {
          id: id
        },
        data: {
          roomCode: roomCode
        }
      });
    }
}