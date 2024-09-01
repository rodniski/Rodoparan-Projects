"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, XAxis, ReferenceLine, Label, Rectangle } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface DataItem {
  periodo_inicio: string;
  periodo_fim: string;
  valor_total: string;
}

interface FormattedData {
  date: string;
  steps: number;
}

export function DailyStepsChart() {
  const [data, setData] = useState<FormattedData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/prenotas/calcs/trim-cost');
        const text = await response.text(); // Obtenha a resposta como texto
        console.log("Resposta bruta:", text);
        
        // Tente converter o texto em JSON, se possível
        try {
          const data = JSON.parse(text);
          console.log("Dados recebidos pelo fetch:", data);
        } catch (jsonError) {
          console.error("Erro ao parsear JSON:", jsonError);
        }
      } catch (error) {
        console.error("Erro ao buscar dados com fetch:", error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <Card className="lg:max-w-md">
      <CardHeader className="space-y-0 pb-2">
        <CardDescription>Cost Overview</CardDescription>
        <CardTitle className="text-4xl tabular-nums">
          {data.length > 0 ? data[data.length - 1].steps.toLocaleString("en-US", { style: "currency", currency: "USD" }) : "0 USD"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{ steps: { label: "Costs", color: "hsl(var(--chart-1))" } }}>
          <BarChart
            accessibilityLayer
            margin={{ left: -4, right: -4 }}
            data={data}
          >
            <Bar
              dataKey="steps"
              fill="var(--color-steps)"
              radius={5}
              fillOpacity={0.6}
              activeBar={<Rectangle fillOpacity={0.8} />}
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              tickFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                });
              }}
            />
            <ChartTooltip
              defaultIndex={2}
              content={
                <ChartTooltipContent
                  hideIndicator
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    });
                  }}
                />
              }
              cursor={false}
            />
            <ReferenceLine
              y={data.reduce((acc, cur) => acc + cur.steps, 0) / data.length}
              stroke="hsl(var(--muted-foreground))"
              strokeDasharray="3 3"
              strokeWidth={1}
            >
              <Label
                position="insideBottomLeft"
                value="Average Costs"
                offset={10}
                fill="hsl(var(--foreground))"
              />
              <Label
                position="insideTopLeft"
                value={(
                  data.reduce((acc, cur) => acc + cur.steps, 0) / data.length
                ).toLocaleString("en-US", { style: "currency", currency: "USD" })}
                className="text-lg"
                fill="hsl(var(--foreground))"
                offset={10}
              />
            </ReferenceLine>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1">
        <CardDescription>
          Total Cost:{" "}
          <span className="font-medium text-foreground">
            {data.reduce((acc, cur) => acc + cur.steps, 0).toLocaleString("en-US", { style: "currency", currency: "USD" })}
          </span>
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
