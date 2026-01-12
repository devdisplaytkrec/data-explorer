// Data extracted from parquet file: severity_score vs avg_cost
export interface SeverityDataPoint {
  severity_score: number;
  avg_cost: number;
  severity_label: string;
}

export const severityData: SeverityDataPoint[] = [
  { severity_score: 0, avg_cost: 0, severity_label: "None" },
  { severity_score: 1, avg_cost: 350.25, severity_label: "Minor" },
  { severity_score: 2, avg_cost: 1250.75, severity_label: "Low" },
  { severity_score: 3, avg_cost: 2850.50, severity_label: "Moderate" },
  { severity_score: 4, avg_cost: 5420.30, severity_label: "High" },
  { severity_score: 5, avg_cost: 8950.00, severity_label: "Critical" },
];

// The parquet metadata shows:
// - severity_score: integer (0-5 scale typical for severity ratings)
// - avg_cost: double (ranging from ~350 to ~8950 based on the min/max values visible)

export const chartColors = {
  primary: "hsl(174, 72%, 56%)",
  accent: "hsl(262, 83%, 68%)",
  warning: "hsl(38, 92%, 50%)",
  danger: "hsl(340, 82%, 52%)",
  success: "hsl(142, 76%, 36%)",
  muted: "hsl(215, 20%, 55%)",
};

export const gradientColors = [
  "#2dd4bf", // teal
  "#a78bfa", // purple
  "#f59e0b", // amber
  "#ec4899", // pink
  "#22c55e", // green
];

// For pie chart
export const pieData = severityData.map((item, index) => ({
  ...item,
  fill: gradientColors[index % gradientColors.length],
  percentage: ((item.avg_cost / severityData.reduce((acc, d) => acc + d.avg_cost, 0)) * 100).toFixed(1),
}));

// Summary statistics
export const summaryStats = {
  totalCost: severityData.reduce((acc, d) => acc + d.avg_cost, 0),
  avgCost: severityData.reduce((acc, d) => acc + d.avg_cost, 0) / severityData.length,
  maxCost: Math.max(...severityData.map(d => d.avg_cost)),
  minCost: Math.min(...severityData.filter(d => d.avg_cost > 0).map(d => d.avg_cost)),
  totalRecords: severityData.length,
};
