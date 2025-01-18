import type { CourierData } from "@/types/courier";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

type HistoryTableProps = { props: CourierData };

export function HistoryTable({ props }: HistoryTableProps) {
  const courierData = Object.keys(props)
    .filter((courierKey) => courierKey !== "summary")
    .map((courierKey) => {
      const data = props[courierKey];
      return {
        courierName: courierKey.charAt(0).toUpperCase() + courierKey.slice(1),
        totalParcels: data.total_parcel,
        deliveredParcels: data.success_parcel,
        cancelledParcels: data.cancelled_parcel,
      };
    });

  const tableHeaders = [
    { key: "courierName", label: "কুরিয়ার" },
    { key: "totalParcels", label: "অর্ডার" },
    { key: "deliveredParcels", label: "ডেলিভারি" },
    { key: "cancelledParcels", label: "বাতিল" },
  ];

  return (
    <Card className="border-2">
      <CardContent className="overflow-x-auto p-4">
        <Table className="table-fixed">
          <TableHeader>
            <TableRow>
              {tableHeaders.map((header) => (
                <TableHead
                  key={header.key}
                  className="text-center text-base font-bold"
                  lang="bn"
                >
                  {header.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {courierData.map((courier) => (
              <TableRow
                key={courier.courierName}
                className="text-sm hover:bg-orange-50 sm:text-base"
              >
                {tableHeaders.map((header) => (
                  <TableCell
                    key={`${courier.courierName}-${header.key}`}
                    className={`text-center ${
                      header.key === "courierName" && "font-bold"
                    }`}
                  >
                    {courier[header.key as keyof typeof courier]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
