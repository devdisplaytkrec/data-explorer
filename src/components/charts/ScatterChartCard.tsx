import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { severityData, chartColors } from "@/data/severityData";

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-lg px-4 py-3 shadow-xl">
        <p className="text-sm font-medium text-foreground">
          Severity Score: {payload[0].payload.severity_score}
        </p>
        <p className="text-lg font-bold text-primary">
          ${payload[0].payload.avg_cost.toLocaleString()}
        </p>
        <p className="text-xs text-muted-foreground">{payload[0].payload.severity_label}</p>
      </div>
    );
  }
  return null;
};

export function ScatterChartCard() {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Severity vs Cost Correlation</CardTitle>
        <CardDescription>Scatter plot showing relationship between variables</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 22%)" />
            <XAxis 
              dataKey="severity_score" 
              name="Severity"
              stroke="hsl(215, 20%, 55%)"
              tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }}
              label={{ value: 'Severity Score', position: 'bottom', fill: 'hsl(215, 20%, 55%)' }}
            />
            <YAxis 
              dataKey="avg_cost" 
              name="Cost"
              stroke="hsl(215, 20%, 55%)"
              tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <ZAxis dataKey="avg_cost" range={[100, 500]} />
            <Tooltip content={<CustomTooltip />} />
            <Scatter 
              data={severityData.filter(d => d.avg_cost > 0)} 
              fill={chartColors.primary}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
