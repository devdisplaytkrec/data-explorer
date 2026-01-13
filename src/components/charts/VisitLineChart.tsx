import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import { visitData, yearColors } from "@/data/visitData";

const chartConfig = {
  "2018": { label: "2018", color: "hsl(var(--chart-1))" },
  "2019": { label: "2019", color: "hsl(var(--chart-2))" },
  "2020": { label: "2020", color: "hsl(var(--chart-3))" },
  "2021": { label: "2021", color: "hsl(var(--chart-4))" },
};

export function VisitLineChart() {
  // Transform data to have months as rows with year columns
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const transformedData = monthNames.map((month, index) => {
    const monthData: Record<string, string | number> = { month };
    [2018, 2019, 2020, 2021].forEach(year => {
      const dataPoint = visitData.find(d => d.visit_year === year && d.visit_month === index + 1);
      monthData[year.toString()] = dataPoint?.visit_count || 0;
    });
    return monthData;
  });

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Monthly Visit Trends</CardTitle>
        <CardDescription>Visit patterns across years</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={transformedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              {Object.entries(yearColors).map(([year, color]) => (
                <Line
                  key={year}
                  type="monotone"
                  dataKey={year}
                  stroke={color}
                  strokeWidth={2}
                  dot={{ fill: color, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
