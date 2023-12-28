import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { withApiRouteToken } from "../../../../components/auth0-utils";

export const getPractice = async (id: string, accessToken: string) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL + `practice/${id}/manage`;
  const response = await fetch(baseURL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const request = await response;
  const data = await request.json();
  return { request, data };
};

export const updatePractice = async (
  id: string,
  body: any,
  accessToken: string,
) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL + `practice/${id}/manage`;
  const response = await fetch(baseURL, {
    method: "PUT",
    body,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const request = await response;
  const data = await request.json();
  return { request, data };
};

export const deletePractice = async (id: string, accessToken: string) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL + `practice/${id}/manage`;
  const response = await fetch(baseURL, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const request = await response;
  return { request };
};

export default withApiAuthRequired(
  withApiRouteToken(async function products(req, res, token) {
    const id: string = (req.query.id as string) || "";
    if (req.method === "PUT") {
      const { request, data } = await updatePractice(
        id,
        JSON.stringify(req.body),
        token,
      );
      res.status(request.status).json(data);
    } else if (req.method === "DELETE") {
      const { request } = await deletePractice(id, token);
      res.status(request.status).json({});
    } else if (req.method === "GET") {
      const { request, data } = await getPractice(id, token);
      res.status(request.status).json(data);
    }
  }),
);
