import { NextApiRequest, NextApiResponse } from "next";
import { ServerErrorStatus } from "@/types/error";
import jsonResponse from "@/utils/jsonResponse";

export async function GET(req: any) {
  try {
    const token =
      req.cookies.get(process.env.NEXT_PUBLIC_COOKIE_NAME)?.value ||
      req.headers.get("STEADY_HASH_Authorization");

    if (!token) {
      return jsonResponse(
        { success: false, err: ServerErrorStatus.InvalidAuthorization },
        401
      );
    }

    const data = await fetch(
      `${process.env.SERVICE_API_PREFIX}/api/v1/user/profile`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    ).then((res) => res.json());

    console.log("profile", data);
    return jsonResponse({ success: true, data });
  } catch (e: any) {
    console.log(e);
    return jsonResponse(
      { success: false, err: ServerErrorStatus.ServerError },
      500
    );
  }
}