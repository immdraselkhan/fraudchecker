"use client";

import type { CourierData } from "@/types/courier";
import { PieChart, Pie, Label } from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Typography } from "@/components/ui/typography";

type HistoryChartProps = { props: CourierData };

export function HistoryChart({ props }: HistoryChartProps) {
  const chartConfig: ChartConfig = Object.keys(props)
    .filter((courier) => courier !== "summary")
    .reduce((config, courier, index) => {
      config[courier] = {
        label: courier,
        color: `hsl(var(--chart-${index + 1}))`,
      };
      return config;
    }, {} as ChartConfig);

  const chartData = Object.keys(props)
    .filter((courier) => courier !== "summary")
    .map((courier, index) => {
      return {
        name: courier,
        successRate: props[courier].success_ratio,
        fill: `hsl(var(--chart-${index + 1}))`,
      };
    });

  return (
    <Card className="flex flex-col justify-center gap-5 border-2">
      <CardHeader className="text-center" lang="bn">
        <CardTitle>সফল ডেলিভারির অনুপাত</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <PieChart>
            <Pie
              data={chartData}
              nameKey="name"
              dataKey="successRate"
              innerRadius="75%"
              outerRadius="100%"
              paddingAngle={2}
              isAnimationActive={true}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {Math.round(props?.summary?.success_ratio)}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 20}
                          className="fill-muted-foreground text-sm"
                        >
                          Avg. Success
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <ChartTooltip
              content={<ChartTooltipContent className="capitalize" />}
            />
            <ChartLegend
              content={<ChartLegendContent className="capitalize" />}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="mx-auto">
        <Typography
          className={`text-lg font-medium ${
            props?.summary?.success_ratio >= 80
              ? "text-green-600"
              : props?.summary?.success_ratio >= 50
                ? "text-yellow-600"
                : "text-red-600"
          }`}
          lang="bn"
        >
          {props?.summary?.success_ratio >= 80
            ? "এটি একটি নিরাপদ ডেলিভারি। ✅"
            : props?.summary?.success_ratio >= 50
              ? "ডেলিভারি সমস্যা হতে পারে। ⚠️"
              : "এটি একটি অনিরাপদ ডেলিভারি। ❌"}
        </Typography>
      </CardFooter>
    </Card>
  );
}
