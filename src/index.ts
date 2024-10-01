import express, {Express, Request, Response} from "express";
import cors from "cors";
import { Server, Socket } from "socket.io";
import { userSockets } from "./utils/User/userSockets";
import { roomSockets } from "./utils/Room/roomSockets";

const PORT = process.env.PORT || 8000;

const app: Express = express();

app.use(express.json());
app.use(cors());

const expressServer = app.listen(PORT, ()=> {
    console.log(`now listening on port ${PORT}`);
});

const io = new Server(expressServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

const loadSockets = async (socket: Socket) => {
    console.log(`user ${socket.id} connected`);
    userSockets(socket);
    roomSockets(socket);
}

io.on('connection', loadSockets);


