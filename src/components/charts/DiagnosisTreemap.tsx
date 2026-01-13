import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Treemap, ResponsiveContainer, Tooltip } from "recharts";
import { diagnosisData, categoryColors } from "@/data/diagnosisData";

const chartConfig = {
  case_count: { label: "Cases", color: "hsl(var(--chart-1))" },
};

export function DiagnosisTreemap() {
  const treemapData = diagnosisData.map(d => ({
    name: d.shortName,
    size: d.case_count,
    fill: categoryColors[d.category]
  }));

  const CustomContent = (props: any) => {
    const { x, y, width, height, name, fill } = props;
    if (width < 30 || height < 20) return null;
    
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={fill}
          stroke="hsl(var(--background))"
          strokeWidth={2}
          rx={4}
        />
        {width > 50 && height > 30 && (
          <text
            x={x + width / 2}
            y={y + height / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="hsl(var(--foreground))"
            fontSize={11}
            fontWeight={500}
          >
            {name}
          </text>
        )}
      </g>
    );
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Case Volume Treemap</CardTitle>
        <CardDescription>Proportional visualization of case distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <Treemap
              data={treemapData}
              dataKey="size"
              aspectRatio={4 / 3}
              stroke="hsl(var(--background))"
              content={<CustomContent />}
            >
              <Tooltip 
                content={({ payload }) => {
                  if (payload && payload.length > 0) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-background/95 border border-border rounded-lg p-2 shadow-lg">
                        <p className="font-semibold">{data.name}</p>
                        <p className="text-muted-foreground">{data.size} cases</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </Treemap>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
