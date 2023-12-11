import express, {Express, Request, Response} from "express";
import { Socket } from "socket.io";

const port = 8000;

const app: Express = express()


app.get("/", (req: Request, res: Response) => {
    res.send("essa");
})


app.get("/hi", (req, res) => {
    res.send("hi");
})


app.listen(port, () => {
    console.log(`now listening on port ${port}`)
})