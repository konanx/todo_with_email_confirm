import { LoginAttemptIE } from "./LogowanieInterfaces";
import { redisClient } from "../index";
// FUNKCJA WYWOLYWANA W MOMENCIE KLIKNIECIA PRZYCISKU ZALOGUJ PRZEZ UZYTKOWNIKA
export const ProbaZalogowania = async (data: LoginAttemptIE) => {
  const { login, password } = data;
  let accounts_list: string[] = await GetAccountsList();
  accounts_list.forEach((account) => {});
};
// POBIERA LISTE WSZYSTKICH KONT
export const GetAccountsList = async () => {
  return new Promise<any>(async (resolve, reject) => {
    let lista_kont: any = await redisClient.get("accountsList");
    resolve(lista_kont);
  });
};
