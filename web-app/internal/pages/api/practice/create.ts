import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { withApiRouteToken } from "../../../components/auth0-utils";

export default withApiAuthRequired(
  withApiRouteToken(async function products(req, res, token) {
    const baseURL = process.env.NEXT_PUBLIC_API_URL + "practice/create";
    const response = await fetch(baseURL, {
      method: "POST",
      body: JSON.stringify(req.body),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const request = await response;
    const data = await request.json();
    res.status(request.status).json(data);
  }),
);
