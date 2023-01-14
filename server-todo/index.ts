import { SendEmail } from "./apka/EmailSender/EmailSender";
import {
  GetAccountsList,
  ProbaZalogowania,
  Rejestracja,
} from "./apka/Logowanie";

const { LoginAttemptFromClientSide } = require("./app/interfaces.ts");
const redis = require("redis");
const origins = {
  transports: ["websocket", "polling"],
  cors: true,
  origins: "localhost:*",
};
const io = require("socket.io")(10005, origins);
export const redisClient = redis.createClient({
  socket: {
    host: "192.168.31.109",
    port: 6379,
  },
});
redisClient.connect();

io.on("connection", (socket: any) => {
  console.log("aa");
  socket.on("loginAttempt", async (data: typeof LoginAttemptFromClientSide) => {
    ProbaZalogowania({ login: "1", password: "password" });
  });
  socket.on(
    "registerAttempt",
    async (data: typeof LoginAttemptFromClientSide) => {
      let rej = await Rejestracja(data);
      console.log("end");
      socket.emit("registerAttemptResponse", data.login);
    }
  );
});
