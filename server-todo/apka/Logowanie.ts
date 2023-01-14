import { LoginAttemptIE } from "./LogowanieInterfaces";
import { redisClient } from "../index";
import { SendEmail } from "./EmailSender/EmailSender";
import { kod_bezpieczenstwa } from "./Converter";
import { Socket } from "socket.io";
// FUNKCJA WYWOLYWANA W MOMENCIE KLIKNIECIA PRZYCISKU ZALOGUJ PRZEZ UZYTKOWNIKA
export const ProbaZalogowania = async (data: LoginAttemptIE) => {
  const { login, password } = data;
  let accounts_list: string[] = await GetAccountsList();
  accounts_list.forEach((account) => {});
};
export const Rejestracja = async (data: LoginAttemptIE) => {
  return new Promise<any>(async function (resolve, reject) {
    const { login, password } = data;
    let accounts_list: string[] = await GetAccountsList();
    // DO ZROBIENIA SPRAWDZENIE CZY EMAIL ISTNIEJ JUZ W BAZIE
    // JEZELI TAK TO TRZEBA WYRZUCIC ALERT NA FRONTA
    accounts_list.forEach((account) => {});

    // TWORZENIE 6 CYFROWEGO KODU
    let kod = kod_bezpieczenstwa();
    // ZAPISYWANIE KODU BEZPIECZENSTWA I HASLA DO REDISA
    let setex_name = "account_wait_to_confirm".concat(":", login);
    let json_expire = {
      kod,
      login,
      password,
    };
    let setex = await redisClient.setEx(
      setex_name,
      60 * 5,
      JSON.stringify(json_expire)
    );
    console.log(setex);
    // WYSYLANIE EMAILA
    let email = await SendEmail({
      to: login,
      subject: "Rejestracja w serisie AnithToDo",
      text: `Witamy w AnithToDo Twój kod do bezpiecznego logowania: ${kod}, kod jest ważny 5 minut.,`,
    });
    resolve("ok");
  });
};

// POBIERA LISTE WSZYSTKICH KONT
export const GetAccountsList = async () => {
  return new Promise<any>(async function (resolve, reject) {
    let lista_kont: any = (await redisClient.get("accountsList")) || [];
    resolve(lista_kont);
  });
};
