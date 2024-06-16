import express, {Express, Request, Response} from "express";
import { Server, Socket } from "socket.io";
import cors from 'cors';
import {initDB} from "./database/db";

const PORT = process.env.PORT || 8000;

const app: Express = express();
const playersInRoom: Map<string, Array<string>> = new Map([]);

const expressServer = app.listen(PORT, ()=> {
    console.log(`now listening on port ${PORT}`);
});

app.use(express.json());

initDB();

const io = new Server(expressServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})



io.on('connection', (socket: Socket) => {
    console.log(`: ${socket.id} connected`);

    const updateUserList = (roomCode: string) => {
        socket.nsp.to(roomCode).emit('users_list', playersInRoom.get(roomCode));
    };

    const joinRoom = (roomCode: string, username: string) => {
        if(!playersInRoom.has(roomCode)) {
            playersInRoom.set(roomCode, []);
        }
        playersInRoom.get(roomCode)!.push(username);
        updateUserList(roomCode);
    };

    const leaveRoom = (roomCode: string, username: string) => {
        console.log(roomCode)
        
        let userList = playersInRoom.get(roomCode) || [];
        userList = userList.filter((user: string) => user !== username);
        
        if(!userList.length) {
            playersInRoom.delete(roomCode);
            console.log("usunięto pokój")
        } else {
            playersInRoom.set(roomCode, userList);
            updateUserList(roomCode);
            console.log("usunięto użytkownika")
        }
    };
    

    socket.on('disconnect', () => {
        socket.emit('user_disconnected');
        socket.on('leave_room', (roomCode: string, username: string) => {
            console.log(`user ${username} left room ${roomCode}`);
            leaveRoom(roomCode, username);
            console.log(`user ${socket.id} disconnected`)
        });
        
    }); 

    socket.on('join_room', (roomCode: string, username: string) => {
        socket.join(roomCode);
        joinRoom(roomCode, username);
        console.log(`user ${username} connected to room ${roomCode}`);
    });
    
});

