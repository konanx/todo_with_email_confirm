import { base64_to_string, string_to_base64 } from "./apka/Converter";
import { SendEmail } from "./apka/EmailSender/EmailSender";
import {
  GetAccountsList,
  ProbaZalogowania,
  Rejestracja,
  RejestracjaConfirm,
} from "./apka/Logowanie";
import { registerAccountConfirmIE } from "./apka/LogowanieInterfaces";

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
      socket.emit("registerAttemptResponse", string_to_base64(data.login));
    }
  );
  socket.on(
    "registerAccountConfirm",
    async (data: registerAccountConfirmIE) => {
      // ZAMIANA EMAILA Z BASE64 NA STRING
      data.email = base64_to_string(data.email);
      let status = await RejestracjaConfirm(data);
      console.log(status);
      if (status.error) {
        socket.emit("registerAccountSnackbar");
      }
    }
  );
});
