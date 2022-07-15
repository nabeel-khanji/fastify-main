import { config } from "dotenv";
import mailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/sendmail-transport";
config();
let transporter = mailer.createTransport({
  //@ts-ignore
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});
export default async (data: MailOptions) => {
  await transporter.sendMail(data);
};
