import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { severityData, chartColors } from "@/data/severityData";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-lg px-4 py-3 shadow-xl">
        <p className="text-sm font-medium text-foreground">{`Score: ${label}`}</p>
        <p className="text-lg font-bold text-primary">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export function LineChartCard() {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Cost Trend by Severity Score</CardTitle>
        <CardDescription>Line chart showing cost progression</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={severityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={chartColors.primary} />
                <stop offset="100%" stopColor={chartColors.accent} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 22%)" />
            <XAxis 
              dataKey="severity_score" 
              stroke="hsl(215, 20%, 55%)"
              tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }}
            />
            <YAxis 
              stroke="hsl(215, 20%, 55%)"
              tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="avg_cost" 
              stroke="url(#lineGradient)"
              strokeWidth={3}
              dot={{ fill: chartColors.primary, strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, fill: chartColors.accent }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
