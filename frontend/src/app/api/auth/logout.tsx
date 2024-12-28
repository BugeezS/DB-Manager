import { NextApiRequest, NextApiResponse } from "next";
// The NextApiRequest and NextApiResponse types are imported from the next package.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // The logout API route receives a POST request.
    res.setHeader("Set-Cookie", "token=; Max-Age=-1; Path=/");
    // The Set-Cookie header is used to clear the token cookie by setting its value to an empty string and its Max-Age to -1.
    res.status(200).json({ message: "Logged out" });
  } else {
    // If the request method is not POST, the API returns a 405 Method Not Allowed status code.
    res.status(405).json({ message: "Method not allowed" });
  }
}
