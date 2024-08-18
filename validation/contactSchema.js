import { z } from "zod";
import { email_or_phone, message, name, phone } from "./common";

export const contactSchema = z.object({
  name,
  email_or_phone,
  phone,
  message,
});
