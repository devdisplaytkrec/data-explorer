import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { pieData, gradientColors } from "@/data/severityData";

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-lg px-4 py-3 shadow-xl">
        <p className="text-sm font-medium text-foreground">{payload[0].payload.severity_label}</p>
        <p className="text-lg font-bold" style={{ color: payload[0].payload.fill }}>
          ${payload[0].value.toLocaleString()}
        </p>
        <p className="text-xs text-muted-foreground">{payload[0].payload.percentage}% of total</p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: any) => (
  <div className="flex flex-wrap justify-center gap-3 mt-4">
    {payload?.map((entry: any, index: number) => (
      <div key={`legend-${index}`} className="flex items-center gap-2">
        <div 
          className="w-3 h-3 rounded-full" 
          style={{ backgroundColor: entry.color }}
        />
        <span className="text-xs text-muted-foreground">{entry.value}</span>
      </div>
    ))}
  </div>
);

export function PieChartCard() {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Cost Distribution</CardTitle>
        <CardDescription>Proportional breakdown by severity</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData.filter(d => d.avg_cost > 0)}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              dataKey="avg_cost"
              nameKey="severity_label"
            >
              {pieData.filter(d => d.avg_cost > 0).map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={gradientColors[index % gradientColors.length]}
                  stroke="hsl(220, 20%, 10%)"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
