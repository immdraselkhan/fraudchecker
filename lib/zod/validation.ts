import * as z from "zod";

const requiredMessage = "মোবাইল নাম্বার প্রদান করা আবশ্যক!";

export const phoneSchema = z
  .string({
    required_error: requiredMessage,
  })
  .nonempty({ message: requiredMessage })
  .regex(/^01\d{9}$/, {
    message: "প্রবেশকৃত মোবাইল নাম্বারটি সঠিক নয়!",
  });
