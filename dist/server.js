"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const http = __importStar(require("http"));
const socket_io_1 = require("socket.io");
const socketEmitHandlers_1 = require("./sio/socketEmitHandlers/socketEmitHandlers");
//server set up
const server = http.createServer(app_1.app);
let port = 3000 || process.env.PORT;
//socket set up
const io = new socket_io_1.Server(server);
startServer();
function startServer() {
    io.sockets.on("connection", (socket) => {
        socket.on('validateReceipt', (data) => {
            (0, socketEmitHandlers_1.ValidatePurchase)(data);
        }),
            socket.emit("noArg");
        socket.emit("basicEmit", 1, "2", Buffer.from([3]));
        socket.emit("withAck", "4", (e) => {
            // e is inferred as number
        });
        console.log(socket.id);
    });
    server.listen(port, () => { console.log('listening on port 3000!'); });
}
