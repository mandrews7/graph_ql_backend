import { app } from "./app";
import * as http from 'http';
import { Server } from "socket.io";
import { ServerToClientEvents, ClientToServerEvents, 
    InterServerEvents, SocketData } from "./sio/interfaces/interfaces";
import { ValidatePurchase } from "./sio/socketEmitHandlers/socketEmitHandlers";

//server set up
const server = http.createServer(app);
let port = 3000 || process.env.PORT;

//socket set up
const io = new Server
<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server);

startServer();
function startServer(){
    io.sockets.on("connection", (socket) => {
        socket.on('validateReceipt', (data) => {
            ValidatePurchase(data);
        }),

        socket.emit("noArg");
        socket.emit("basicEmit", 1, "2", Buffer.from([3]));
        socket.emit("withAck", "4", (e) => {
            // e is inferred as number
            });

        console.log(socket.id)
    })

    server.listen(port, () => {console.log('listening on port 3000!')})
}

export function raiseIOEvent(eve: string, socketNumber: string)
{
    switch(eve)
    {
        case "purchaseValidated":
            io.emit("purchaseValidated", socketNumber);
        break;
    }
}


