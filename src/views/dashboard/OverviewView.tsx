"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { mockDashboardStats } from "@/data/dashboard-mock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const chartData = mockDashboardStats.chartData;

export default function OverviewView() {
  const { kpis } = mockDashboardStats;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Overview
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Snapshot of activity and pipeline health.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {k.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-heading text-3xl font-bold text-foreground">
                {k.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{k.hint}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-lg font-semibold">
            Pipeline trend
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            New vs completed projects over the last 6 months.
          </p>
        </CardHeader>
        <CardContent className="h-[320px] pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0.35}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient id="colorDone" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(142 71% 45%)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(142 71% 45%)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-border/60"
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12 }}
                className="text-muted-foreground"
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                className="text-muted-foreground"
                tickLine={false}
                axisLine={false}
                width={40}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: 12,
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Area
                type="monotone"
                dataKey="new"
                name="New"
                stroke="hsl(var(--primary))"
                fill="url(#colorNew)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="completed"
                name="Completed"
                stroke="hsl(142 71% 45%)"
                fill="url(#colorDone)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
