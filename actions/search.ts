"use server";

import type { CourierHistory } from "@/types/courier";
import { searchFormSchema } from "@/lib/zod/schema";
import { Constants } from "@/utils/constants";
import { fetchApi } from "@/utils/fetch-api";

type FormState = CourierHistory & {
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

  const response = await fetchApi.post<CourierHistory>(
    `${Constants.API_URL}/check?phone=${parsed.data.phone}`,
    {
      headers: { Authorization: `Bearer ${Constants.API_TOKEN}` },
    },
  );

  return response.data;
}
