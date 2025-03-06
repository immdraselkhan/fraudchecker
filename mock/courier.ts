import type { CourierSummary } from "@/types/courier";

export function randomCourierHistory() {
  const possibleCouriers = ["pathao", "steadfast", "redx", "paperfly"];
  const noHistory = Math.random() > 0.3;

  let total_parcel = 0,
    success_parcel = 0,
    cancelled_parcel = 0;

  const courierData = possibleCouriers.reduce(
    (data, courier) => {
      const total = noHistory ? Math.floor(Math.random() * 300) : 0;
      const success = total ? Math.floor(Math.random() * (total + 1)) : 0;
      const cancelled = total - success;

      data[courier] = {
        total_parcel: total,
        success_parcel: success,
        cancelled_parcel: cancelled,
        success_ratio: total ? +((success / total) * 100).toFixed(2) : 0,
      };

      total_parcel += total;
      success_parcel += success;
      cancelled_parcel += cancelled;

      return data;
    },
    {} as Record<string, CourierSummary>,
  );

  return {
    status: "success",
    courierData: {
      ...courierData,
      summary: {
        total_parcel,
        success_parcel,
        cancelled_parcel,
        success_ratio: total_parcel
          ? +((success_parcel / total_parcel) * 100).toFixed(2)
          : 0,
      },
    },
    reports: [],
  };
}
