import express, {Express, Request, Response} from "express";
import { Server } from "socket.io";
import { createServer } from "http";
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
const httpServer = createServer();

const io = new Server(expressServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

io.on('connection', (socket) => {
    console.log(`: ${socket.id} connected`)
    socket.on('disconnect', () => {
        console.log("user disconnected")
    });
    //socket.emit('connect', {message: 'user connected'})
});


app.get("/", (req: Request, res: Response) => {
    res.send("essa");
    io.emit('connection');
})


app.get("/hi", (req, res) => {
    io.emit('connection');
    res.send("hi");
});

