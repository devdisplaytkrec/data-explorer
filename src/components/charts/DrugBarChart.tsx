import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { drugData, drugGradientColors } from "@/data/drugData";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-lg px-4 py-3 shadow-xl">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-lg font-bold text-primary">
          {payload[0].value.toFixed(1)} days
        </p>
        <p className="text-xs text-muted-foreground">{payload[0].payload.category}</p>
      </div>
    );
  }
  return null;
};

export function DrugBarChart() {
  return (
    <Card className="glass-card glow-primary">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Average Days Supply by Drug</CardTitle>
        <CardDescription>Comparison of supply duration across medications</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart 
            data={drugData} 
            margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 22%)" />
            <XAxis 
              type="number"
              stroke="hsl(215, 20%, 55%)"
              tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }}
              tickFormatter={(value) => `${value}d`}
            />
            <YAxis 
              type="category"
              dataKey="drug_name"
              stroke="hsl(215, 20%, 55%)"
              tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }}
              width={110}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="avg_days_supply" radius={[0, 8, 8, 0]}>
              {drugData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={drugGradientColors[index % drugGradientColors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
