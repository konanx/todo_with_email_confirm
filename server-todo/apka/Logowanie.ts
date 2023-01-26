import {
  loginAttemptIE,
  registerAccountConfirmIE,
  registerConfirmSetexIE,
} from "./LogowanieInterfaces";
import { redisClient } from "../index";
import { SendEmail } from "./EmailSender/EmailSender";
import {
  generator_custom_linkow,
  kod_bezpieczenstwa,
  string_to_base64,
} from "./Converter";
import { Socket } from "socket.io";
import md5 from "md5";
// FUNKCJA WYWOLYWANA W MOMENCIE KLIKNIECIA PRZYCISKU ZALOGUJ PRZEZ UZYTKOWNIKA
export const ProbaZalogowania = async (data: loginAttemptIE) => {
  return new Promise<any>(async function (resolve, reject) {
    const { login, password } = data;
    let redis_name = "account".concat(":" + string_to_base64(login));
    let account = JSON.parse(await redisClient.get(redis_name));
    // konto nie istnieje
    if (!account) {
      resolve({ error: "Podany email nie jest przypisany do żadnego konta" });
      return;
    }
    if (password != account.password) {
      resolve({ error: "Nieprawidłowe hasło" });

      return;
    }
    resolve(account);
    return;
  });
};
export const Rejestracja = async (data: loginAttemptIE) => {
  return new Promise<any>(async function (resolve, reject) {
    const { login, password } = data;
    let accounts_list: string[] = await GetAccountsList();
    // DO ZROBIENIA SPRAWDZENIE CZY EMAIL ISTNIEJ JUZ W BAZIE
    // JEZELI TAK TO TRZEBA WYRZUCIC ALERT NA FRONTA
    let redis_base64_sprawdz_konto = "account".concat(
      ":",
      string_to_base64(login)
    );
    let isEmailExist = await redisClient.get(redis_base64_sprawdz_konto);
    if (isEmailExist) {
      resolve({ type: "ACCOUNT_EXIST", error: "BŁĄD! Konto już istnieje" });
      return;
    }

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
    let redis_confirm_name = "account_wait_to_confirm".concat(":", email);
    let raw_dane_konta = await redisClient.get(redis_confirm_name);
    // JEZELI TOKEN STRACIL WAZNOSC TO WYSYLAMY ALERT NA FRONT
    if (!raw_dane_konta) {
      resolve({ error: "Kod bezpieczeństwa wygasł" });
      return;
    }
    let dane_konta: registerConfirmSetexIE = JSON.parse(raw_dane_konta);
    if (dane_konta.code !== code) {
      resolve({ error: "Nieprawidłowy kod bezpieczeństwa" });
      return;
    }
    // PO DOBRYM WPISANIU KODU
    let current_id = await redisClient.incrBy("account_current_id", 1);
    let gotowe_konto = JSON.stringify({
      login: dane_konta.login,
      password: dane_konta.password,
      id: current_id,
    });

    let redis_name = "account".concat(":" + string_to_base64(email));
    let transaction = await redisClient
      .multi()
      .lPush("accountsList", redis_name)
      .set(redis_name, gotowe_konto)
      .del(redis_confirm_name)
      .exec();
    resolve({ text: "Prawidłowy kod, konto stworzone" });
  });
};
// POBIERA LISTE WSZYSTKICH KONT
export const GetAccountsList = async () => {
  return new Promise<any>(async function (resolve, reject) {
    let lista_kont: any = await redisClient.lRange("accountsList", 0, -1);
    console.log(lista_kont);
    resolve(lista_kont);
  });
};
