import { userService } from "./userService";

export const deleteUser = async (id: string) => {
  await new Promise<void>(async (resolve) => {
    userService.deleteUser(id);
    resolve();
  });
};
export const createUser = async (id: string, username: string, roomCode: string) => {

};