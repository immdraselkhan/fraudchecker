import * as z from "zod";
import { phoneSchema } from "@/lib/zod/validation";

export const searchFormSchema = z.object({
  phone: phoneSchema,
});
