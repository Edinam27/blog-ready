
import * as React from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart as RechartsAreaChart,
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ChartProps {
  data: any[];
  categories: string[];
  index: string;
  colors?: string[];
  valueFormatter?: (value: number) => string;
  className?: string;
}

export function AreaChart({
  data,
  categories,
  index,
  colors = ["#0ea5e9"],
  valueFormatter = (value: number) => `${value}`,
  className,
}: ChartProps) {
  return (
    <ChartContainer className={className} config={{}}>
      <RechartsAreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <defs>
          {categories.map((category, i) => (
            <linearGradient
              key={category}
              id={`gradient-${category}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor={colors[i % colors.length]} stopOpacity={0.3} />
              <stop offset="95%" stopColor={colors[i % colors.length]} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <XAxis
          dataKey={index}
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={valueFormatter}
        />
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    {payload.map((entry) => (
                      <div key={entry.name}>
                        <p className="text-muted-foreground">{entry.name}</p>
                        <p className="font-medium">
                          {valueFormatter(entry.value as number)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
        {categories.map((category, i) => (
          <Area
            key={category}
            type="monotone"
            dataKey={category}
            stroke={colors[i % colors.length]}
            fillOpacity={1}
            fill={`url(#gradient-${category})`}
          />
        ))}
      </RechartsAreaChart>
    </ChartContainer>
  );
}

export function BarChart({
  data,
  categories,
  index,
  colors = ["#9333ea"],
  valueFormatter = (value: number) => `${value}`,
  className,
}: ChartProps) {
  return (
    <ChartContainer className={className} config={{}}>
      <RechartsBarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <XAxis
          dataKey={index}
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={valueFormatter}
        />
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
        <Tooltip
          cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    {payload.map((entry) => (
                      <div key={entry.name}>
                        <p className="text-muted-foreground">{entry.name}</p>
                        <p className="font-medium">
                          {valueFormatter(entry.value as number)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
        {categories.map((category, i) => (
          <Bar
            key={category}
            dataKey={category}
            fill={colors[i % colors.length]}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </RechartsBarChart>
    </ChartContainer>
  );
}
