import { mailOptionsIE } from "./EmailInterfaces";

var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  //   service: "gmail",
  host: "smtp.poczta.onet.pl",
  port: 465,
  secure: true,
  auth: {
    user: "hubei1@onet.pl",
    pass: "Pepik112",
  },
});

export const SendEmail = async (data: mailOptionsIE) => {
  return new Promise(async function (resolve, reject) {
    const { subject, html } = data;
    let mailOptions = {
      from: "hubei1@onet.pl",
      to: "micha112@onet.pl",
      subject,
      html,
    };
    await transporter.sendMail(mailOptions, function (error: any, info: any) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log(info);
        resolve("sent");
      }
    });
  });
};
