import type { CourierData } from "@/types/courier";
import { Box } from "@/components/ui/box";
import { Card, CardContent } from "@/components/ui/card";

type HistoryCountProps = { props: CourierData };

export function HistoryCount({ props }: HistoryCountProps) {
  let totalParcel = 0;
  let successParcel = 0;
  let cancelledParcel = 0;

  Object.keys(props).forEach((courier) => {
    if (courier === "summary") return;
    const courierData = props[courier];
    totalParcel += courierData.total_parcel;
    successParcel += courierData.success_parcel;
    cancelledParcel += courierData.cancelled_parcel;
  });

  const stats = [
    { count: totalParcel, label: "মোট অর্ডার", color: "text-orange-500" },
    { count: successParcel, label: "মোট ডেলিভারি", color: "text-green-500" },
    { count: cancelledParcel, label: "মোট বাতিল", color: "text-red-500" },
  ];

  return (
    <Card className="border-2">
      <CardContent className="p-4 sm:p-8">
        <Box className="grid grid-cols-3 gap-4 text-center">
          {stats.map((stat, index) => (
            <Box key={index} className="space-y-2">
              <Box className={`text-3xl font-bold sm:text-5xl ${stat.color}`}>
                {stat.count}
              </Box>
              <Box
                className="text-sm font-medium text-gray-600 sm:text-lg"
                lang="bn"
              >
                {stat.label}
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
