"use client";

import { useState, useEffect } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartTooltipContent } from "@/components/ui/chart";
import { Skeleton } from "./ui/skeleton";

export function OverviewChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setData([
      { name: "Mon", total: Math.floor(Math.random() * 5000) + 1000 },
      { name: "Tue", total: Math.floor(Math.random() * 5000) + 1000 },
      { name: "Wed", total: Math.floor(Math.random() * 5000) + 1000 },
      { name: "Thu", total: Math.floor(Math.random() * 5000) + 1000 },
      { name: "Fri", total: Math.floor(Math.random() * 5000) + 1000 },
      { name: "Sat", total: Math.floor(Math.random() * 5000) + 1000 },
      { name: "Sun", total: Math.floor(Math.random() * 5000) + 1000 },
    ]);
  }, []);

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Weekly Revenue</CardTitle>
          <CardDescription>A summary of this week's income.</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="h-[350px] w-full p-4">
            <Skeleton className="h-full w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Weekly Revenue</CardTitle>
        <CardDescription>A summary of this week's income.</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              cursor={{ fill: "hsl(var(--secondary))" }}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
