import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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

export function StatsLocation({ stats }) {
  if (stats && stats.length > 0) {
    console.log("Stats Data:", stats);

    const cityDeviceCounts = {};

    stats.forEach((item) => {
      if (!cityDeviceCounts[item.city]) {
        cityDeviceCounts[item.city] = {
          country: item.country,
          desktop: 0,
          mobile: 0,
          tablet: 0,
          other: 0,
        };
      }

      if (item.device === "desktop") {
        cityDeviceCounts[item.city].desktop += 1;
      } else if (item.device === "mobile") {
        cityDeviceCounts[item.city].mobile += 1;
      } else if (item.device === "tablet") {
        cityDeviceCounts[item.city].tablet += 1;
      } else {
        cityDeviceCounts[item.city].other += 1;
      }
    });

    const chartData = Object.keys(cityDeviceCounts).map((city) => ({
      city,
      country: cityDeviceCounts[city].country,
      desktop: cityDeviceCounts[city].desktop,
      mobile: cityDeviceCounts[city].mobile,
      tablet: cityDeviceCounts[city].tablet,
      other: cityDeviceCounts[city].other,
    }));

    console.log("City Device Counts Array:", chartData);

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

    return (
      <Card className="flex flex-col bg-gray-50 dark:bg-gray-800">
        <CardHeader className="items-center pb-5">
          <CardTitle>City Device Click Map</CardTitle>
          <CardDescription>
            Uncover device usage trends across various cities.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid
                vertical={false}
                dark:stroke="#4a4a4a"
                stroke="#e0e0e0"
                strokeOpacity={0.4}
              />
              <XAxis
                dataKey="city"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => {
                  const cityData = chartData.find((d) => d.city === value);
                  return cityData
                    ? `${cityData.city}, ${cityData.country}`
                    : value;
                }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar
                dataKey="desktop"
                fill={chartConfig.desktop.color}
                radius={4}
              />
              <Bar
                dataKey="mobile"
                fill={chartConfig.mobile.color}
                radius={4}
              />
              <Bar
                dataKey="tablet"
                fill={chartConfig.tablet.color}
                radius={4}
              />
              <Bar dataKey="other" fill={chartConfig.other.color} radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    );
  }

  return null;
}
