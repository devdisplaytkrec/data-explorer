import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { drugData } from "@/data/drugData";

// Sort by days supply for area visualization
const sortedData = [...drugData].sort((a, b) => a.avg_days_supply - b.avg_days_supply);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-lg px-4 py-3 shadow-xl">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-lg font-bold text-primary">
          {payload[0].value.toFixed(1)} days
        </p>
      </div>
    );
  }
  return null;
};

export function DrugAreaChart() {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Supply Duration Trend</CardTitle>
        <CardDescription>Sorted area view from shortest to longest supply</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={sortedData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <defs>
              <linearGradient id="drugAreaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(174, 72%, 56%)" stopOpacity={0.8}/>
                <stop offset="50%" stopColor="hsl(262, 83%, 68%)" stopOpacity={0.5}/>
                <stop offset="100%" stopColor="hsl(340, 82%, 52%)" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 22%)" />
            <XAxis 
              dataKey="drug_name" 
              stroke="hsl(215, 20%, 55%)"
              tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 10 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              stroke="hsl(215, 20%, 55%)"
              tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }}
              tickFormatter={(value) => `${value}d`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="avg_days_supply" 
              stroke="hsl(262, 83%, 68%)"
              strokeWidth={2}
              fill="url(#drugAreaGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
