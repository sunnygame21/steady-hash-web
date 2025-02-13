import { ServerErrorStatus } from "@/types/error";
import jsonResponse from "@/utils/jsonResponse";
import { find } from "lodash";

// 用户每个产品的收益
export async function GET(req: any) {
  try {
    const token =
      req.cookies.get(process.env.NEXT_PUBLIC_COOKIE_NAME)?.value ||
      req.headers.get(process.env.NEXT_PUBLIC_COOKIE_NAME);

    if (!token) {
      return jsonResponse(
        { success: false, err: ServerErrorStatus.InvalidAuthorization },
        401
      );
    }
    const data = await fetch(`${process.env.SERVICE_API_PREFIX}/api/v1/lp/va`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    }).then((res) => res.json());

    const allShares = await fetch(`${process.env.SERVICE_API_PREFIX}/api/v1/lp/va/shares`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    }).then((res) => res.json());
    console.log('shares', allShares)

    if (!Array.isArray(data)) {
      return jsonResponse({
        success: false,
        err: data?.message || ServerErrorStatus.ServerError,
      });
    }
    const transData = data.map(item => {
      const curShare = find(allShares, )
      return {
        ...item,
        shares: []
    }
    })

    return jsonResponse({ success: true, data });
  } catch (e: any) {
    console.log(e);
    return jsonResponse(
      { success: false, err: ServerErrorStatus.ServerError },
      500
    );
  }
}
