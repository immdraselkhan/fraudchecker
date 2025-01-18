import type { CourierSummary } from "@/types/courier";

export function randomCourierHistory() {
  const possibleCouriers = ["pathao", "steadfast", "redx", "paperfly"];

  const courierData: Record<string, CourierSummary> = {};
  let total_parcel = 0,
    success_parcel = 0,
    cancelled_parcel = 0;

  possibleCouriers.forEach((courier) => {
    const total = Math.floor(Math.random() * 300);
    const success = total ? Math.floor(Math.random() * (total + 1)) : 0;
    const cancelled = total - success;
    courierData[courier] = {
      total_parcel: total,
      success_parcel: success,
      cancelled_parcel: cancelled,
      success_ratio: total ? +((success / total) * 100).toFixed(2) : 0,
    };
    total_parcel += total;
    success_parcel += success;
    cancelled_parcel += cancelled;
  });

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
