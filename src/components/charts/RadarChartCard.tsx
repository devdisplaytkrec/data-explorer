import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { severityData, chartColors } from "@/data/severityData";

// Normalize costs for radar visualization
const maxCost = Math.max(...severityData.map(d => d.avg_cost));
const radarData = severityData.map(d => ({
  ...d,
  normalized_cost: maxCost > 0 ? (d.avg_cost / maxCost) * 100 : 0,
}));

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-lg px-4 py-3 shadow-xl">
        <p className="text-sm font-medium text-foreground">
          {payload[0].payload.severity_label}
        </p>
        <p className="text-lg font-bold text-primary">
          ${payload[0].payload.avg_cost.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export function RadarChartCard() {
  return (
    <Card className="glass-card glow-primary">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Severity Radar View</CardTitle>
        <CardDescription>Multi-dimensional severity analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
            <PolarGrid stroke="hsl(220, 15%, 25%)" />
            <PolarAngleAxis 
              dataKey="severity_label" 
              tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]}
              tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 10 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Radar
              name="Cost"
              dataKey="normalized_cost"
              stroke={chartColors.primary}
              fill={chartColors.primary}
              fillOpacity={0.4}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
