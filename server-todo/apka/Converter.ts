const moment = require("moment");

export const log = (message: string) => {
  const date = new Date();
  console.log(moment(date).format("DD-MM-YYYY HH:mm:ss") + ": " + message);
};

export const kod_bezpieczenstwa = () => {
  let kod = "";
  for (let i = 0; i < 6; i++) {
    kod += Math.floor(Math.random() * 10);
  }
  return kod;
};
/**
 * ! NA RAZIE NIE UŻYWANE
 * @param dlugosc Dlugosc zwracanego stringa
 */
export const generator_custom_linkow = (dlugosc: number) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < dlugosc; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
export const string_to_base64 = (string: string) => {
  let buff = Buffer.from(string, "utf-8");
  let base64 = buff.toString("base64");
  return base64;
};
export const base64_to_string = (string: string) => {
  let buff = Buffer.from(string, "base64");
  let base64 = buff.toString("ascii");
  console.log(base64);
  return base64;
};
