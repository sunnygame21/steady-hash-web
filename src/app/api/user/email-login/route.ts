import { ServerErrorStatus } from "@/types/error";
import jsonResponse from "@/utils/jsonResponse";

export async function POST(req: any) {
  try {
    const { email } = await req.json();
    const data = await fetch(
      `${process.env.SERVICE_API_PREFIX}/api/v1/user/email/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({ email }),
      }
    ).then((res) => res.json());

    return jsonResponse({ success: true, data });
  } catch (e: any) {
    console.log(e);
    return jsonResponse(
      { success: false, err: ServerErrorStatus.ServerError },
      500
    );
  }
}
