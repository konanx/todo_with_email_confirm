import { VariantType } from "notistack";
import { base64_to_string, log, string_to_base64 } from "./apka/Converter";
// const {VariantType} = require("notistack")
import { SendEmail } from "./apka/EmailSender/EmailSender";
import {
  GetAccountsList,
  ProbaZalogowania,
  Rejestracja,
  RejestracjaConfirm,
} from "./apka/Logowanie";
import { registerAccountConfirmIE } from "./apka/LogowanieInterfaces";
import {
  DodajListeTodo,
  DodajNoweZadanieTodo,
  PobierzListyTodo,
  PobierzZadaniaToDo,
} from "./apka/ToDo/ToDo";

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
  log("SOCKET CLIENT CONNECTED");
  socket.on("loginAttempt", async (data: typeof LoginAttemptFromClientSide) => {
    let status = await ProbaZalogowania({
      login: data.login,
      password: data.password,
    });
    if (status.error) {
      SnackAlert(status.error, "error");
      return;
    }
    SnackAlert("Pomyślnie zalogowano", "success");
    delete status.password;
    socket.emit("udaneLogowanie", status);
  });
  socket.on(
    "registerAttempt",
    async (data: typeof LoginAttemptFromClientSide) => {
      let rej = await Rejestracja(data);
      // JEŻELI KONTO ISTNIEJE
      if (rej.error) {
        log(rej.error);
        SnackAlert(rej.error, "error");
        return;
      }
      SnackAlert("Wysłano powiadomienie e-mail!", "success");
      socket.emit("registerAttemptResponse", string_to_base64(data.login));
    }
  );
  socket.on(
    "registerAccountConfirm",
    async (data: registerAccountConfirmIE) => {
      // ZAMIANA EMAILA Z BASE64 NA STRING
      data.email = base64_to_string(data.email);
      let rej = await RejestracjaConfirm(data);
      if (rej.error) {
        log(rej.error);
        SnackAlert(rej.error, "error");
        return;
      }
      SnackAlert(rej.text, "success");
      socket.emit("registerAccountConfirm");
    }
  );

  // TODO SOCKETS

  socket.on(
    "dodajNowaListe",
    async (data: { person_id: number; name: string }) => {
      let la = await DodajListeTodo(data);
      SnackAlert("Dodano listę", "success");
      socket.emit("dodajNowaListeResponse");
    }
  );
  // POBIERA LISTY NA FRONT
  socket.on("pobierzListyToDo", async (user_id: string) => {
    let listy = await PobierzListyTodo(user_id);
    socket.emit("pobierzListyToDoResponse", listy);
  });

  socket.on("pobierzZadaniaToDo", async (lista_id: string) => {
    socket.join(`lista:${lista_id}`);
    let gotowe = await PobierzZadaniaToDo(lista_id);
    SnackAlert("Wyświetlam wyniki dla wybranej listy", "success");
    socket.emit("pobierzZadaniaToDoResponse", gotowe);
  });

  socket.on("addNewTask", async (data: any) => {
    let response: any = await DodajNoweZadanieTodo(data);
    console.log(response);
    SnackAlert(response.message, response.status);
    socket.emit("addNewTaskResponse");

    // WYSYŁAMY AKTUALNA LISTE NA FRONTA
    let gotowe = await PobierzZadaniaToDo(data.listId);
    io.to(`lista:${data.listId}`).emit("pobierzZadaniaToDoResponse", gotowe);
  });

  // WYSWIETLA ALERT NA FRONCIE
  const SnackAlert = (text: string, variant: VariantType) => {
    socket.emit("SnackAlert", { message: text, variant });
  };
});
