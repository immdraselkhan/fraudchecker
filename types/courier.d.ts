export type CourierSummary = {
  total_parcel: number;
  success_parcel: number;
  cancelled_parcel: number;
  success_ratio: number;
};

export type CourierData = Record<string, CourierSummary>;

export type CourierApiResponse = {
  status: "success";
  courierData: CourierData & { summary: CourierSummary };
  reports: unknown[];
};

export type CourierHistory = {
  status?: number | string;
  success?: boolean;
  data?: CourierData & { summary: CourierSummary };
  message?: string;
};
