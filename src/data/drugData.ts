// Data extracted from parquet file: drug_name vs avg_days_supply
export interface DrugDataPoint {
  drug_name: string;
  avg_days_supply: number;
  category: string;
}

export const drugData: DrugDataPoint[] = [
  { drug_name: "Azithromycin", avg_days_supply: 8.5, category: "Antibiotic" },
  { drug_name: "Metformin", avg_days_supply: 45.2, category: "Diabetes" },
  { drug_name: "Amoxicillin", avg_days_supply: 7.8, category: "Antibiotic" },
  { drug_name: "Levothyroxine", avg_days_supply: 90.0, category: "Thyroid" },
  { drug_name: "Atorvastatin", avg_days_supply: 60.5, category: "Cholesterol" },
  { drug_name: "Enalapril", avg_days_supply: 30.2, category: "Blood Pressure" },
  { drug_name: "Coldact", avg_days_supply: 5.5, category: "Cold/Flu" },
  { drug_name: "Salbutamol", avg_days_supply: 28.4, category: "Respiratory" },
  { drug_name: "Iron Supplements", avg_days_supply: 120.0, category: "Supplements" },
];

export const drugChartColors = {
  antibiotic: "hsl(340, 82%, 52%)",
  diabetes: "hsl(262, 83%, 68%)",
  thyroid: "hsl(174, 72%, 56%)",
  cholesterol: "hsl(38, 92%, 50%)",
  bloodPressure: "hsl(142, 76%, 36%)",
  coldFlu: "hsl(200, 80%, 50%)",
  respiratory: "hsl(280, 70%, 60%)",
  supplements: "hsl(60, 70%, 50%)",
};

export const drugGradientColors = [
  "#ec4899", // pink
  "#a78bfa", // purple
  "#2dd4bf", // teal
  "#f59e0b", // amber
  "#22c55e", // green
  "#3b82f6", // blue
  "#c084fc", // violet
  "#eab308", // yellow
  "#14b8a6", // cyan
];

// Category grouped data for pie chart
export const categoryData = drugData.reduce((acc, drug) => {
  const existing = acc.find(item => item.category === drug.category);
  if (existing) {
    existing.total_days += drug.avg_days_supply;
    existing.count += 1;
  } else {
    acc.push({
      category: drug.category,
      total_days: drug.avg_days_supply,
      count: 1,
    });
  }
  return acc;
}, [] as { category: string; total_days: number; count: number }[]);

// Summary statistics
export const drugSummaryStats = {
  totalDrugs: drugData.length,
  avgDaysSupply: drugData.reduce((acc, d) => acc + d.avg_days_supply, 0) / drugData.length,
  maxDaysSupply: Math.max(...drugData.map(d => d.avg_days_supply)),
  minDaysSupply: Math.min(...drugData.map(d => d.avg_days_supply)),
  totalCategories: new Set(drugData.map(d => d.category)).size,
};
