import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { categoryData, drugGradientColors } from "@/data/drugData";

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-lg px-4 py-3 shadow-xl">
        <p className="text-sm font-medium text-foreground">{payload[0].payload.category}</p>
        <p className="text-lg font-bold" style={{ color: payload[0].payload.fill }}>
          {payload[0].value.toFixed(1)} total days
        </p>
        <p className="text-xs text-muted-foreground">{payload[0].payload.count} drug(s)</p>
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

const pieDataWithColors = categoryData.map((item, index) => ({
  ...item,
  fill: drugGradientColors[index % drugGradientColors.length],
}));

export function DrugPieChart() {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Supply by Category</CardTitle>
        <CardDescription>Distribution across drug categories</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieDataWithColors}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={90}
              paddingAngle={3}
              dataKey="total_days"
              nameKey="category"
            >
              {pieDataWithColors.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.fill}
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
