import { JwtPayload } from "jsonwebtoken";
import { ReceiptValidationInfo } from "../socketEmitHandlers/socketEmitHandlers";

export{
    ServerToClientEvents,
    ClientToServerEvents,
    InterServerEvents,
    SocketData
}

class EmailTest
{
    email = "";
}

interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    purchaseValidated: (a: string) => void;
}

interface ClientToServerEvents {
validateReceipt: (data: ReceiptValidationInfo) => void;
}

interface InterServerEvents {
ping: () => void;
}

interface SocketData {
name: string;
age: number;
}