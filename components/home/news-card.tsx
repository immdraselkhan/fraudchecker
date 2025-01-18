import { Card, CardContent } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";

type NewsCardProps = { title: string };

export function NewsCard({ title }: NewsCardProps) {
  return (
    <Card className="border-2 border-dashed border-orange-200 bg-orange-50/50">
      <CardContent className="p-6">
        <Typography
          className="text-center text-xl font-medium text-gray-700"
          lang="bn"
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}
