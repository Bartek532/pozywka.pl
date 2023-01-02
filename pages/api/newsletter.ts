import { fetcher } from "utils/fetcher";
import type { NextApiRequest, NextApiResponse } from "next";
import { subscribeNewsletterSchema } from "utils/validation";

export const subscribeToNewsletter = async (name: string, email: string) => {
  await fetcher("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    body: { fields: { name }, email },
    headers: {
      Authorization: "Bearer " + process.env.MAILER_LITE_API_KEY,
    },
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(400).json({ message: "Bad request!" });
  }

  if (req.method === "POST") {
    try {
      subscribeNewsletterSchema.parse(req.body);
      await subscribeToNewsletter(req.body.name, req.body.email);

      return res.status(200).json({ message: "User has been added to newsletter!" });
    } catch (e: any) {
      console.log(e);
      return res.status(e?.status || 400).json({ message: e?.message || "Bad request!" });
    }
  }
}
