import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/component/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/component/ui/chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
  tablet: {
    label: "Tablet",
    color: "hsl(var(--chart-3))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-4))",
  },
};

export function StatsDeviceCount({ stats }) {
  if (stats && stats.length > 0) {
    console.log("Stats Data:", stats);

    const total = stats.reduce(
      (acc, item) => {
        if (item.device === "desktop") {
          acc.desktop += 1;
        } else if (item.device === "mobile") {
          acc.mobile += 1;
        } else if (item.device === "tablet") {
          acc.tablet += 1;
        } else {
          acc.other += 1;
        }
        return acc;
      },
      { desktop: 0, mobile: 0, tablet: 0, other: 0 }
    );

    const totalVisitors =
      total.desktop + total.mobile + total.tablet + total.other;

    return (
      <Card className="flex flex-col bg-gray-50">
        <CardHeader className="items-center pb-5">
          <CardTitle>Device Click Insights</CardTitle>
          <CardDescription>
            Explore how different devices contribute to user interactions.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-auto items-center pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto -mb-16 aspect-square w-full max-w-[200px]"
          >
            <RadialBarChart
              data={[total]}
              endAngle={180}
              innerRadius={80}
              outerRadius={130}
            >
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) - 16}
                            className="fill-foreground text-2xl font-bold"
                          >
                            {totalVisitors.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 4}
                            className="fill-muted-foreground"
                          >
                            Visitors
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
              <RadialBar
                dataKey="desktop"
                stackId="a"
                cornerRadius={5}
                fill={chartConfig.desktop.color}
                className="stroke-transparent stroke-2"
              />
              <RadialBar
                dataKey="mobile"
                fill={chartConfig.mobile.color}
                stackId="a"
                cornerRadius={5}
                className="stroke-transparent stroke-2"
              />
              <RadialBar
                dataKey="tablet"
                fill={chartConfig.tablet.color}
                stackId="a"
                cornerRadius={5}
                className="stroke-transparent stroke-2"
              />
              <RadialBar
                dataKey="other"
                fill={chartConfig.other.color}
                stackId="a"
                cornerRadius={5}
                className="stroke-transparent stroke-2"
              />
            </RadialBarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    );
  }

  return null;
}
