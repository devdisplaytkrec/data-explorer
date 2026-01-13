import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from "recharts";
import { monthlyAggData } from "@/data/visitData";

const chartConfig = {
  avgVisits: { label: "Avg Visits", color: "hsl(var(--chart-4))" },
};

export function VisitHeatmap() {
  const maxVisits = Math.max(...monthlyAggData.map(d => d.avgVisits));
  const minVisits = Math.min(...monthlyAggData.map(d => d.avgVisits));
  
  const getColor = (value: number) => {
    const ratio = (value - minVisits) / (maxVisits - minVisits);
    if (ratio > 0.75) return "hsl(var(--chart-1))";
    if (ratio > 0.5) return "hsl(var(--chart-2))";
    if (ratio > 0.25) return "hsl(var(--chart-4))";
    return "hsl(var(--chart-5))";
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Monthly Seasonality</CardTitle>
        <CardDescription>Average visits by month (all years)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyAggData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="avgVisits" radius={[4, 4, 0, 0]} name="Avg Visits">
                {monthlyAggData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getColor(entry.avgVisits)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
