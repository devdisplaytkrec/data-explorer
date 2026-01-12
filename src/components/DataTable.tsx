import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { severityData } from "@/data/severityData";

const getSeverityColor = (score: number): string => {
  if (score <= 1) return "bg-chart-5/20 text-chart-5 border-chart-5/30";
  if (score <= 2) return "bg-chart-1/20 text-chart-1 border-chart-1/30";
  if (score <= 3) return "bg-chart-3/20 text-chart-3 border-chart-3/30";
  if (score <= 4) return "bg-chart-2/20 text-chart-2 border-chart-2/30";
  return "bg-chart-4/20 text-chart-4 border-chart-4/30";
};

export function DataTable() {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Raw Data Table</CardTitle>
        <CardDescription>Complete dataset from parquet file</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="text-muted-foreground">Score</TableHead>
              <TableHead className="text-muted-foreground">Severity Level</TableHead>
              <TableHead className="text-right text-muted-foreground">Average Cost</TableHead>
              <TableHead className="text-right text-muted-foreground">% of Max</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {severityData.map((row) => {
              const maxCost = Math.max(...severityData.map(d => d.avg_cost));
              const percentage = maxCost > 0 ? ((row.avg_cost / maxCost) * 100).toFixed(1) : "0.0";
              
              return (
                <TableRow 
                  key={row.severity_score} 
                  className="border-border/30 hover:bg-secondary/50 transition-colors"
                >
                  <TableCell className="font-mono font-medium">{row.severity_score}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`${getSeverityColor(row.severity_score)} border`}
                    >
                      {row.severity_label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono font-semibold">
                    ${row.avg_cost.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {percentage}%
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
