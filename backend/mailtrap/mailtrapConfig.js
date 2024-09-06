import dotenv from "dotenv";
import { MailtrapClient } from "mailtrap";

dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN;
const ENDPOINT = process.env.MAILTRAP_ENDPOINT;

export const mailtrapClient = new MailtrapClient({
  token: TOKEN,
  endpoint: ENDPOINT,
});

export const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Mailtrap Test",
};
