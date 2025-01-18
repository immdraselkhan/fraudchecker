export type CourierSummary = {
  total_parcel: number;
  success_parcel: number;
  cancelled_parcel: number;
  success_ratio: number;
};

export type CourierData = Record<string, CourierSummary>;

export type CourierHistory = {
  status: "success";
  courierData: CourierData & { summary: CourierSummary };
  reports: nknown[];
};
