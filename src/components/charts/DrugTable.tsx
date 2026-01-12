import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { drugData, drugSummaryStats } from "@/data/drugData";

const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    "Antibiotic": "bg-chart-4/20 text-chart-4 border-chart-4/30",
    "Diabetes": "bg-chart-2/20 text-chart-2 border-chart-2/30",
    "Thyroid": "bg-chart-1/20 text-chart-1 border-chart-1/30",
    "Cholesterol": "bg-chart-3/20 text-chart-3 border-chart-3/30",
    "Blood Pressure": "bg-chart-5/20 text-chart-5 border-chart-5/30",
    "Cold/Flu": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "Respiratory": "bg-violet-500/20 text-violet-400 border-violet-500/30",
    "Supplements": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  };
  return colors[category] || "bg-muted text-muted-foreground border-border";
};

const getDurationBadge = (days: number): { label: string; className: string } => {
  if (days <= 10) return { label: "Short", className: "bg-chart-4/20 text-chart-4" };
  if (days <= 30) return { label: "Medium", className: "bg-chart-3/20 text-chart-3" };
  if (days <= 60) return { label: "Long", className: "bg-chart-1/20 text-chart-1" };
  return { label: "Extended", className: "bg-chart-2/20 text-chart-2" };
};

export function DrugTable() {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Drug Supply Details</CardTitle>
        <CardDescription>Complete dataset from parquet file</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="text-muted-foreground">Drug Name</TableHead>
              <TableHead className="text-muted-foreground">Category</TableHead>
              <TableHead className="text-right text-muted-foreground">Avg Days Supply</TableHead>
              <TableHead className="text-right text-muted-foreground">Duration</TableHead>
              <TableHead className="text-right text-muted-foreground">% of Max</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {drugData.map((row) => {
              const percentage = ((row.avg_days_supply / drugSummaryStats.maxDaysSupply) * 100).toFixed(1);
              const duration = getDurationBadge(row.avg_days_supply);
              
              return (
                <TableRow 
                  key={row.drug_name} 
                  className="border-border/30 hover:bg-secondary/50 transition-colors"
                >
                  <TableCell className="font-medium">{row.drug_name}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`${getCategoryColor(row.category)} border`}
                    >
                      {row.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono font-semibold">
                    {row.avg_days_supply.toFixed(1)} days
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="secondary" className={duration.className}>
                      {duration.label}
                    </Badge>
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
