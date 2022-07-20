import { fetcher } from "utils/fetcher";
import { EMAIL_REGEX } from "utils/consts";
import type { NextApiRequest, NextApiResponse } from "next";

export const addUserToNewsletter = async (name: string, email: string) => {
  if (!EMAIL_REGEX.test(email)) {
    throw new Error("Invalid email!");
  }

  await fetcher(`${process.env.WP_API_ENDPOINT}/wp-json/newsletter/v1/subscribe`, {
    method: "POST",
    body: { first_name: name, email },
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(400).json({ message: "Bad request!" });
  }

  if (req.method === "POST") {
    try {
      await addUserToNewsletter(req.body.name, req.body.email);

      return res.status(200).json({ message: "User has been added to database!" });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Bad request!" });
    }
  }
}
