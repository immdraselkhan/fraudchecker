import type { CourierApiResponse } from "@/types/courier";
import type { NextRequest } from "next/server";
import { randomCourierHistory } from "@/mock/courier";
import { Constants } from "@/utils/constants";
import { fetchApi } from "@/utils/fetch-api";

export async function GET(req: NextRequest) {
  const phone = req.nextUrl.searchParams.get("phone");
  const token = req.headers.get("authorization")?.split(" ")[1];

  if (token !== Constants.API_TOKEN) {
    return Response.json({
      status: 401,
      success: false,
      message: "এপিআই টোকেন সঠিক নয়। ☹️",
    });
  }

  const response =
    Constants.NODE_ENV === "development"
      ? randomCourierHistory()
      : await fetchApi.post<CourierApiResponse>(
          `${Constants.COURIER_EENDPOINT}?phone=${phone}`,
          { headers: { Authorization: `Bearer ${Constants.COURIER_TOKEN}` } },
        );

  const courierData = response?.data.courierData;

  const isEmptyData = !courierData || courierData?.summary.total_parcel === 0;

  const message = isEmptyData
    ? "কোনো তথ্য পাওয়া যায়নি। 🤷‍♂️"
    : courierData?.summary.success_ratio >= 80
      ? "এটি একটি নিরাপদ ডেলিভারি। ✅"
      : courierData?.summary.success_ratio >= 50
        ? "এটি একটি ঝুঁকিপূর্ণ ডেলিভারি। ⚠️"
        : "এটি একটি অনিরাপদ ডেলিভারি। ❌";

  return Response.json({
    status: 200,
    success: true,
    data: courierData,
    message,
  });
}
