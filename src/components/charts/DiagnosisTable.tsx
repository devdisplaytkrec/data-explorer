import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { diagnosisData, diagnosisSummaryStats } from "@/data/diagnosisData";

export function DiagnosisTable() {
  const getCategoryBadge = (category: string) => {
    const styles: Record<string, string> = {
      "Cardiovascular": "bg-chart-1/20 text-chart-1 border-chart-1/30",
      "Respiratory": "bg-chart-2/20 text-chart-2 border-chart-2/30",
      "Endocrine": "bg-chart-3/20 text-chart-3 border-chart-3/30",
      "Renal": "bg-chart-4/20 text-chart-4 border-chart-4/30",
      "Gastrointestinal": "bg-chart-5/20 text-chart-5 border-chart-5/30",
    };
    return <Badge className={styles[category] || "bg-muted text-muted-foreground"}>{category}</Badge>;
  };

  const getPercentage = (count: number) => {
    return ((count / diagnosisSummaryStats.totalCases) * 100).toFixed(1);
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Diagnosis Details</CardTitle>
        <CardDescription>Complete breakdown of all diagnoses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="max-h-[400px] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead className="text-muted-foreground">Diagnosis</TableHead>
                <TableHead className="text-muted-foreground">Category</TableHead>
                <TableHead className="text-muted-foreground text-right">Cases</TableHead>
                <TableHead className="text-muted-foreground text-right">% of Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {diagnosisData.map((row, index) => (
                <TableRow key={index} className="border-border/30 hover:bg-secondary/30">
                  <TableCell className="font-medium">{row.diagnosis_description}</TableCell>
                  <TableCell>{getCategoryBadge(row.category)}</TableCell>
                  <TableCell className="text-right font-semibold text-primary">{row.case_count}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{getPercentage(row.case_count)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
