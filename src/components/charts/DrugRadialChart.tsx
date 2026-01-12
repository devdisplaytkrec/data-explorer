import { RadialBarChart, RadialBar, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { drugData, drugGradientColors } from "@/data/drugData";

const maxDays = Math.max(...drugData.map(d => d.avg_days_supply));

const radialData = drugData
  .map((drug, index) => ({
    name: drug.drug_name,
    value: drug.avg_days_supply,
    fill: drugGradientColors[index % drugGradientColors.length],
    percentage: ((drug.avg_days_supply / maxDays) * 100).toFixed(1),
  }))
  .sort((a, b) => a.value - b.value);

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-lg px-4 py-3 shadow-xl">
        <p className="text-sm font-medium text-foreground">{payload[0].payload.name}</p>
        <p className="text-lg font-bold" style={{ color: payload[0].payload.fill }}>
          {payload[0].value.toFixed(1)} days
        </p>
        <p className="text-xs text-muted-foreground">{payload[0].payload.percentage}% of max</p>
      </div>
    );
  }
  return null;
};

export function DrugRadialChart() {
  return (
    <Card className="glass-card glow-accent">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Radial Supply Comparison</CardTitle>
        <CardDescription>Visual ranking of supply duration</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <RadialBarChart 
            cx="50%" 
            cy="50%" 
            innerRadius="15%" 
            outerRadius="90%" 
            data={radialData}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar
              background={{ fill: "hsl(220, 15%, 18%)" }}
              dataKey="value"
              cornerRadius={5}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {radialData.map((entry, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.fill }} />
              <span className="text-xs text-muted-foreground">{entry.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
