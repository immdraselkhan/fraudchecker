"use server";

import type { CourierHistory } from "@/types/courier";
import { randomCourierHistory } from "@/mock/courier";
import { searchFormSchema } from "@/lib/zod/schema";
import { Constants } from "@/utils/constants";
import { fetchApi } from "@/utils/fetch-api";

type FormState = {
  success: boolean;
  data?: CourierHistory["courierData"];
  errors?: { [key: string]: string[] };
};

export async function searchAction(formData: FormData): Promise<FormState> {
  const data = Object.fromEntries(formData);

  const parsed = searchFormSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const response =
    Constants.NODE_ENV === "development"
      ? randomCourierHistory()
      : (
          await fetchApi.post<CourierHistory>(
            `${Constants.COURIER_EENDPOINT}?phone=${parsed.data.phone}`,
            {
              headers: { Authorization: `Bearer ${Constants.COURIER_TOKEN}` },
            },
          )
        ).data;

  if (!response || response.status !== "success" || !response.courierData) {
    return {
      success: false,
      data: {
        summary: {
          total_parcel: 0,
          success_parcel: 0,
          cancelled_parcel: 0,
          success_ratio: 0,
        },
      },
    };
  }

  return { success: true, data: response.courierData };
}
