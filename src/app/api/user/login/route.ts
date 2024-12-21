import { ServerErrorStatus } from "@/types/error";
import jsonResponse from "@/utils/jsonResponse";

export async function POST(req: any) {
  try {
    const { username, verifyCode } = await req.json();
    console.log("userName, verifyCode", username, verifyCode);
    if (!username || !verifyCode) {
      return jsonResponse(
        { success: false, err: ServerErrorStatus.InvalidAuthorization },
        401
      );
    }

    const data = await fetch(
      `${process.env.SERVICE_API_PREFIX}/api/v1/user/login/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({ username, verifyCode }),
      }
    ).then((res) => res.json());
    if (data?.error || data?.statusCode) {
      return jsonResponse({
        success: false,
        err: data?.message || ServerErrorStatus.ServerError,
      });
    }
    return jsonResponse({ success: true, data });
  } catch (e: any) {
    console.log(e);
    return jsonResponse(
      { success: false, err: ServerErrorStatus.ServerError },
      500
    );
  }
}
