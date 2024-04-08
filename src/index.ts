import express, {Express, Request, Response} from "express";
import { Server, Socket } from "socket.io";
import cors from 'cors';

const PORT = process.env.PORT || 8000;

const app: Express = express();


const expressServer = app.listen(PORT, ()=> {
    console.log(`now listening on port ${PORT}`);
});



app.use(cors({
    origin: "*"
}));

app.use(express.json());

const io = new Server(expressServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})


io.on('connection', (socket: Socket) => {
    console.log(`: ${socket.id} connected`)
    socket.on('disconnect', () => {
        console.log("user disconnected")
    });

    socket.on('joinRoom', (userName: string,roomCode: string) => {
        console.log(roomCode)
        socket.join(roomCode);
        
        console.log(`${userName} connected to room ${roomCode}`);
    })
});

