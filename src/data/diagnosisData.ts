// Data extracted from the parquet file: diagnosis_description, case_count

export interface DiagnosisDataPoint {
  diagnosis_description: string;
  case_count: number;
  shortName: string;
  category: string;
}

// Raw data from parquet file
const rawDiagnosisData = [
  { diagnosis_description: "Essential hypertension", case_count: 156 },
  { diagnosis_description: "Type 2 diabetes mellitus", case_count: 134 },
  { diagnosis_description: "Chronic obstructive pulmonary disease", case_count: 98 },
  { diagnosis_description: "Chronic ischemic heart disease", case_count: 87 },
  { diagnosis_description: "Upper respiratory infection", case_count: 82 },
  { diagnosis_description: "Hypothyroidism", case_count: 74 },
  { diagnosis_description: "Gastroenteritis", case_count: 63 },
  { diagnosis_description: "Asthma", case_count: 58 },
  { diagnosis_description: "Chronic kidney disease", case_count: 51 },
];

const getCategoryFromDiagnosis = (diagnosis: string): string => {
  if (diagnosis.includes("heart") || diagnosis.includes("hypertension")) return "Cardiovascular";
  if (diagnosis.includes("pulmonary") || diagnosis.includes("respiratory") || diagnosis.includes("Asthma")) return "Respiratory";
  if (diagnosis.includes("diabetes") || diagnosis.includes("Hypothyroidism")) return "Endocrine";
  if (diagnosis.includes("kidney")) return "Renal";
  if (diagnosis.includes("Gastro")) return "Gastrointestinal";
  return "Other";
};

const getShortName = (diagnosis: string): string => {
  const shortNames: Record<string, string> = {
    "Essential hypertension": "Hypertension",
    "Type 2 diabetes mellitus": "Diabetes T2",
    "Chronic obstructive pulmonary disease": "COPD",
    "Chronic ischemic heart disease": "Heart Disease",
    "Upper respiratory infection": "URI",
    "Hypothyroidism": "Hypothyroid",
    "Gastroenteritis": "Gastro",
    "Asthma": "Asthma",
    "Chronic kidney disease": "CKD",
  };
  return shortNames[diagnosis] || diagnosis;
};

export const diagnosisData: DiagnosisDataPoint[] = rawDiagnosisData.map(d => ({
  ...d,
  shortName: getShortName(d.diagnosis_description),
  category: getCategoryFromDiagnosis(d.diagnosis_description)
}));

// Category aggregation
export const categoryData = Object.entries(
  diagnosisData.reduce((acc, d) => {
    acc[d.category] = (acc[d.category] || 0) + d.case_count;
    return acc;
  }, {} as Record<string, number>)
).map(([category, count]) => ({ category, count }))
  .sort((a, b) => b.count - a.count);

export const diagnosisChartColors = {
  primary: "hsl(var(--chart-1))",
  secondary: "hsl(var(--chart-2))",
  tertiary: "hsl(var(--chart-3))",
  quaternary: "hsl(var(--chart-4))",
  quinary: "hsl(var(--chart-5))",
};

export const categoryColors: Record<string, string> = {
  "Cardiovascular": "hsl(var(--chart-1))",
  "Respiratory": "hsl(var(--chart-2))",
  "Endocrine": "hsl(var(--chart-3))",
  "Renal": "hsl(var(--chart-4))",
  "Gastrointestinal": "hsl(var(--chart-5))",
  "Other": "hsl(var(--muted-foreground))",
};

export const diagnosisSummaryStats = {
  totalCases: diagnosisData.reduce((sum, d) => sum + d.case_count, 0),
  totalDiagnoses: diagnosisData.length,
  topDiagnosis: diagnosisData[0],
  avgCasesPerDiagnosis: Math.round(diagnosisData.reduce((sum, d) => sum + d.case_count, 0) / diagnosisData.length),
  totalCategories: categoryData.length,
  topCategory: categoryData[0]
};
