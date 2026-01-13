import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { visitData } from "@/data/visitData";

export function VisitTable() {
  const getVolumeBadge = (count: number) => {
    if (count >= 200) return <Badge className="bg-chart-1/20 text-chart-1 border-chart-1/30">High</Badge>;
    if (count >= 150) return <Badge className="bg-chart-2/20 text-chart-2 border-chart-2/30">Medium</Badge>;
    if (count >= 100) return <Badge className="bg-chart-4/20 text-chart-4 border-chart-4/30">Normal</Badge>;
    return <Badge className="bg-chart-5/20 text-chart-5 border-chart-5/30">Low</Badge>;
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Visit Data Details</CardTitle>
        <CardDescription>Complete monthly visit records</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="max-h-[400px] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead className="text-muted-foreground">Year</TableHead>
                <TableHead className="text-muted-foreground">Month</TableHead>
                <TableHead className="text-muted-foreground">Visit Count</TableHead>
                <TableHead className="text-muted-foreground">Volume</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visitData.map((row, index) => (
                <TableRow key={index} className="border-border/30 hover:bg-secondary/30">
                  <TableCell className="font-medium">{row.visit_year}</TableCell>
                  <TableCell>{row.monthLabel}</TableCell>
                  <TableCell className="font-semibold text-primary">{row.visit_count.toLocaleString()}</TableCell>
                  <TableCell>{getVolumeBadge(row.visit_count)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
