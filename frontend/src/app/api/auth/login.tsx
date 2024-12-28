import { NextApiRequest, NextApiResponse } from "next";

// This is the login API route. It receives a POST request with the email and password in the request body.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    // The email and password are extracted from the request body.
    const response = await fetch(`${process.env.API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      res.status(200).json(data); //forward JWT token to the client
    } else {
      res.status(401).json({ message: "Invalid login" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
