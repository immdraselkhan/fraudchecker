import type { CourierData } from "@/types/courier";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Phone, ArrowRight } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";
import { searchFormSchema } from "@/lib/zod/schema";
import { searchAction } from "@/actions/search";
import { Box } from "@/components/ui/box";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FormFieldset } from "@/components/ui/form-fieldset";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import { convertNumBnToEn } from "@/utils/formation";

type FieldKeysValues = z.infer<typeof searchFormSchema>;

type SearchCardProps = {
  onSearch: (data: CourierData, phone: string, loading: boolean) => void;
};

export function SearchCard({ onSearch }: SearchCardProps) {
  const form = useForm<FieldKeysValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      phone: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    getFieldState,
    setError,
    reset,
  } = form;

  async function onSubmit(formValues: FieldKeysValues) {
    onSearch({} as CourierData, formValues.phone, true);

    const formData = new FormData();

    Object.entries(formValues).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    const { errors, data } = await searchAction(formData);

    if (errors) {
      Object.entries(errors).forEach(([fieldName, fieldErrors]) => {
        fieldErrors.forEach((errorMessage) => {
          setError(fieldName as keyof FieldKeysValues, {
            type: "manual",
            message: errorMessage,
          });
        });
      });
    }

    if (data) {
      reset();
      onSearch(data, formValues.phone, isSubmitting);
    }
  }

  return (
    <Form {...form}>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} lang="bn">
          <FormFieldset disabled={isSubmitting}>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Card className="border-2 p-2">
                      <CardContent className="flex flex-col gap-4 p-2 sm:flex-row sm:items-center">
                        <Box className="flex flex-grow items-center gap-4">
                          <Box className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md bg-orange-100">
                            <Phone className="h-8 w-8 text-orange-500" />
                          </Box>
                          <Input
                            type="tel"
                            autoComplete="on"
                            placeholder="11 সংখ্যার মোবাইল নাম্বার"
                            className={`h-16 !text-xl ${getFieldState("phone").error && "border-destructive text-destructive focus-visible:ring-destructive"}`}
                            {...field}
                            onChange={(e) =>
                              field.onChange(convertNumBnToEn(e.target.value))
                            }
                          />
                        </Box>
                        <LoadingButton
                          type="submit"
                          loading={isSubmitting}
                          className="h-16 bg-orange-500 px-8 text-lg font-semibold hover:bg-orange-600 sm:w-auto"
                        >
                          রিপোর্ট দেখুন
                          <ArrowRight className="h-6 w-6" />
                        </LoadingButton>
                      </CardContent>
                    </Card>
                  </FormControl>
                  <FormMessage className="pt-5 text-center text-xl" />
                </FormItem>
              )}
            />
          </FormFieldset>
        </form>
      </FormProvider>
    </Form>
  );
}
