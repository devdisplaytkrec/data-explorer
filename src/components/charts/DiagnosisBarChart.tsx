import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from "recharts";
import { diagnosisData, categoryColors } from "@/data/diagnosisData";

const chartConfig = {
  case_count: { label: "Cases", color: "hsl(var(--chart-1))" },
};

export function DiagnosisBarChart() {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Cases by Diagnosis</CardTitle>
        <CardDescription>Number of cases per diagnosis type</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={diagnosisData} 
              layout="vertical"
              margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis 
                type="category" 
                dataKey="shortName" 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={11}
                width={90}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="case_count" radius={[0, 4, 4, 0]} name="Cases">
                {diagnosisData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={categoryColors[entry.category]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
