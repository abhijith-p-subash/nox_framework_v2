import { Server, Socket } from "socket.io";

export class SocketService {
  private io: Server;

  constructor(server: any) {
    this.io = new Server(server);
  }

  public init(): void {
    console.log("Socket connected");

    this.io.on("connection", (socket: Socket) => {
      console.log(socket.id, "A client connected");

      socket.on("customEvent", (data: any) => {
        console.log("Received custom event:", data);
      });

      socket.on("disconnect", () => {
        console.log("A client disconnected.");
      });
    });
  }

  public sendMessage(message: string): void {
    this.io.emit("message", message);
  }
}
