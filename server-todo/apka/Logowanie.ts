import {
  loginAttemptIE,
  registerAccountConfirmIE,
  registerConfirmSetexIE,
} from "./LogowanieInterfaces";
import { redisClient } from "../index";
import { SendEmail } from "./EmailSender/EmailSender";
import { generator_custom_linkow, kod_bezpieczenstwa } from "./Converter";
import { Socket } from "socket.io";
// FUNKCJA WYWOLYWANA W MOMENCIE KLIKNIECIA PRZYCISKU ZALOGUJ PRZEZ UZYTKOWNIKA
export const ProbaZalogowania = async (data: loginAttemptIE) => {
  const { login, password } = data;
  let accounts_list: string[] = await GetAccountsList();
  accounts_list.forEach((account) => {});
};
export const Rejestracja = async (data: loginAttemptIE) => {
  return new Promise<any>(async function (resolve, reject) {
    const { login, password } = data;
    let accounts_list: string[] = await GetAccountsList();
    // DO ZROBIENIA SPRAWDZENIE CZY EMAIL ISTNIEJ JUZ W BAZIE
    // JEZELI TAK TO TRZEBA WYRZUCIC ALERT NA FRONTA
    accounts_list.forEach((account) => {});

    // TWORZENIE 6 CYFROWEGO KODU
    let code = kod_bezpieczenstwa();
    // ZAPISYWANIE KODU BEZPIECZENSTWA I HASLA DO REDISA
    let setex_name = "account_wait_to_confirm".concat(":", login);
    let json_expire: registerConfirmSetexIE = {
      code,
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
      html: `<h2>Witamy w AnithToDo</h2><br /> <h3>Twój kod do bezpiecznego logowania: <b>${code}</b>, kod jest ważny 5 minut.</h3>`,
    });
    resolve("ok");
  });
};

export const RejestracjaConfirm = async (data: registerAccountConfirmIE) => {
  let { email, code } = data;
  return new Promise<any>(async function (resolve, reject) {
    let redis_name = "account_wait_to_confirm".concat(":", email);
    let raw_dane_konta = await redisClient.get("account_wait_to_confirm");
    // JEZELI TOKEN STRACIL WAZNOSC TO WYSYLAMY ALERT NA FRONT
    if (!raw_dane_konta) {
      resolve("expired");
      return;
    }
    let dane_konta: registerConfirmSetexIE = JSON.parse(raw_dane_konta);
    if (dane_konta.code !== code) {
      resolve("error_bad_code");
      return;
    }
    // PO DOBRYM WPISANIU KODU
    let transaction = redisClient.multi().lPush("accountsList");
    console.log(transaction);
    resolve("success");
  });
};

// POBIERA LISTE WSZYSTKICH KONT
export const GetAccountsList = async () => {
  return new Promise<any>(async function (resolve, reject) {
    let lista_kont: any = (await redisClient.get("accountsList")) || [];
    resolve(lista_kont);
  });
};
