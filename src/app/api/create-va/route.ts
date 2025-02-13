import { ServerErrorStatus } from "@/types/error";
import jsonResponse from "@/utils/jsonResponse";

export async function POST(req: any) {
  try {
    const token =
      req.cookies.get(process.env.NEXT_PUBLIC_COOKIE_NAME)?.value ||
      req.headers.get(process.env.NEXT_PUBLIC_COOKIE_NAME);

    const { email } = await req.json();
    if (!token || !email) {
      return jsonResponse(
        { success: false, err: ServerErrorStatus.InvalidAuthorization },
        401
      );
    }

    const data = await fetch(`${process.env.SERVICE_API_PREFIX}/api/v1/lp/va`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({ email, remark: "testUser" }),
    }).then((res) => res.json());
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
