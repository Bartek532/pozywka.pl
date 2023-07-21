import { z } from "zod";

export const subscriberSchema = z.object({
  name: z.string().min(1, "Imię jest wymagane."),
  email: z.string().min(1, "Email jest wymagany.").email("Wprowadź poprawny email."),
});
