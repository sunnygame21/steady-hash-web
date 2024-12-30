import { ServerErrorStatus } from "@/types/error";
import jsonResponse from "@/utils/jsonResponse";

export async function GET(req: any) {
  try {
    const token =
      req.cookies.get(process.env.NEXT_PUBLIC_COOKIE_NAME)?.value ||
      req.headers.get("STEADY_HASH_Authorization");
    const productId = req.nextUrl.searchParams.get("productId");
    const startDate = req.nextUrl.searchParams.get("startDate");
    const endDate = req.nextUrl.searchParams.get("endDate");
    if (!token) {
      return jsonResponse(
        { success: false, err: ServerErrorStatus.InvalidAuthorization },
        401
      );
    }
    if (!productId || !startDate || !endDate) {
      return jsonResponse(
        { success: false, err: ServerErrorStatus.InvalidParams },
        500
      );
    }

    const data = await fetch(
      `${process.env.SERVICE_API_PREFIX}/api/v1/product/user-profit?productId=${productId}&startDate=${startDate}&endDate=${endDate}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    ).then((res) => res.json());

    if (!Array.isArray(data)) {
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
