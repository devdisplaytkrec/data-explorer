import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { RadialBarChart, RadialBar, ResponsiveContainer, Legend, PolarAngleAxis } from "recharts";
import { diagnosisData, categoryColors, diagnosisSummaryStats } from "@/data/diagnosisData";

const chartConfig = {
  case_count: { label: "Cases", color: "hsl(var(--chart-1))" },
};

export function DiagnosisRadialChart() {
  const maxCases = diagnosisSummaryStats.topDiagnosis.case_count;
  
  const radialData = diagnosisData.slice(0, 6).map((d, index) => ({
    name: d.shortName,
    value: d.case_count,
    fill: categoryColors[d.category],
    percentage: Math.round((d.case_count / maxCases) * 100)
  })).reverse();

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Top Diagnoses Comparison</CardTitle>
        <CardDescription>Relative case volume (top 6)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart 
              cx="50%" 
              cy="50%" 
              innerRadius="20%" 
              outerRadius="90%" 
              data={radialData}
              startAngle={180}
              endAngle={0}
            >
              <PolarAngleAxis type="number" domain={[0, maxCases]} angleAxisId={0} tick={false} />
              <RadialBar
                background
                dataKey="value"
                cornerRadius={4}
                label={{ fill: 'hsl(var(--foreground))', position: 'insideStart', fontSize: 10 }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend 
                iconSize={10} 
                layout="vertical" 
                verticalAlign="middle" 
                align="right"
                wrapperStyle={{ fontSize: 11 }}
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
