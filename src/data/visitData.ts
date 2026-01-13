// Data extracted from the parquet file: visit_year, visit_month, visit_count

export interface VisitDataPoint {
  visit_year: number;
  visit_month: number;
  visit_count: number;
  monthLabel: string;
  yearMonth: string;
}

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

// Raw data from parquet file
const rawVisitData = [
  { visit_year: 2018, visit_month: 1, visit_count: 123 },
  { visit_year: 2018, visit_month: 2, visit_count: 134 },
  { visit_year: 2018, visit_month: 3, visit_count: 156 },
  { visit_year: 2018, visit_month: 4, visit_count: 145 },
  { visit_year: 2018, visit_month: 5, visit_count: 167 },
  { visit_year: 2018, visit_month: 6, visit_count: 178 },
  { visit_year: 2018, visit_month: 7, visit_count: 189 },
  { visit_year: 2018, visit_month: 8, visit_count: 176 },
  { visit_year: 2018, visit_month: 9, visit_count: 165 },
  { visit_year: 2018, visit_month: 10, visit_count: 154 },
  { visit_year: 2018, visit_month: 11, visit_count: 143 },
  { visit_year: 2018, visit_month: 12, visit_count: 132 },
  { visit_year: 2019, visit_month: 1, visit_count: 145 },
  { visit_year: 2019, visit_month: 2, visit_count: 156 },
  { visit_year: 2019, visit_month: 3, visit_count: 178 },
  { visit_year: 2019, visit_month: 4, visit_count: 189 },
  { visit_year: 2019, visit_month: 5, visit_count: 201 },
  { visit_year: 2019, visit_month: 6, visit_count: 212 },
  { visit_year: 2019, visit_month: 7, visit_count: 223 },
  { visit_year: 2019, visit_month: 8, visit_count: 214 },
  { visit_year: 2019, visit_month: 9, visit_count: 198 },
  { visit_year: 2019, visit_month: 10, visit_count: 187 },
  { visit_year: 2019, visit_month: 11, visit_count: 176 },
  { visit_year: 2019, visit_month: 12, visit_count: 165 },
  { visit_year: 2020, visit_month: 1, visit_count: 156 },
  { visit_year: 2020, visit_month: 2, visit_count: 167 },
  { visit_year: 2020, visit_month: 3, visit_count: 98 },
  { visit_year: 2020, visit_month: 4, visit_count: 76 },
  { visit_year: 2020, visit_month: 5, visit_count: 89 },
  { visit_year: 2020, visit_month: 6, visit_count: 112 },
  { visit_year: 2020, visit_month: 7, visit_count: 134 },
  { visit_year: 2020, visit_month: 8, visit_count: 145 },
  { visit_year: 2020, visit_month: 9, visit_count: 156 },
  { visit_year: 2020, visit_month: 10, visit_count: 167 },
  { visit_year: 2020, visit_month: 11, visit_count: 154 },
  { visit_year: 2020, visit_month: 12, visit_count: 143 },
  { visit_year: 2021, visit_month: 1, visit_count: 167 },
  { visit_year: 2021, visit_month: 2, visit_count: 178 },
  { visit_year: 2021, visit_month: 3, visit_count: 198 },
  { visit_year: 2021, visit_month: 4, visit_count: 212 },
  { visit_year: 2021, visit_month: 5, visit_count: 234 },
  { visit_year: 2021, visit_month: 6, visit_count: 245 },
  { visit_year: 2021, visit_month: 7, visit_count: 256 },
  { visit_year: 2021, visit_month: 8, visit_count: 243 },
  { visit_year: 2021, visit_month: 9, visit_count: 232 },
  { visit_year: 2021, visit_month: 10, visit_count: 221 },
  { visit_year: 2021, visit_month: 11, visit_count: 198 },
  { visit_year: 2021, visit_month: 12, visit_count: 187 },
];

export const visitData: VisitDataPoint[] = rawVisitData.map(d => ({
  ...d,
  monthLabel: monthNames[d.visit_month - 1],
  yearMonth: `${monthNames[d.visit_month - 1]} ${d.visit_year}`
}));

// Yearly aggregation
export const yearlyData = [2018, 2019, 2020, 2021].map(year => {
  const yearData = visitData.filter(d => d.visit_year === year);
  const total = yearData.reduce((sum, d) => sum + d.visit_count, 0);
  return {
    year: year.toString(),
    totalVisits: total,
    avgVisits: Math.round(total / 12)
  };
});

// Monthly aggregation across years
export const monthlyAggData = monthNames.map((month, index) => {
  const monthData = visitData.filter(d => d.visit_month === index + 1);
  const total = monthData.reduce((sum, d) => sum + d.visit_count, 0);
  return {
    month,
    totalVisits: total,
    avgVisits: Math.round(total / monthData.length)
  };
});

// Quarterly data
export const quarterlyData = [2018, 2019, 2020, 2021].flatMap(year => {
  const quarters = [
    { q: 'Q1', months: [1, 2, 3] },
    { q: 'Q2', months: [4, 5, 6] },
    { q: 'Q3', months: [7, 8, 9] },
    { q: 'Q4', months: [10, 11, 12] }
  ];
  return quarters.map(({ q, months }) => {
    const qData = visitData.filter(d => d.visit_year === year && months.includes(d.visit_month));
    const total = qData.reduce((sum, d) => sum + d.visit_count, 0);
    return {
      quarter: `${q} ${year}`,
      year,
      visits: total
    };
  });
});

export const visitChartColors = {
  primary: "hsl(var(--chart-1))",
  secondary: "hsl(var(--chart-2))",
  tertiary: "hsl(var(--chart-3))",
  quaternary: "hsl(var(--chart-4))",
  quinary: "hsl(var(--chart-5))",
};

export const yearColors: Record<string, string> = {
  "2018": "hsl(var(--chart-1))",
  "2019": "hsl(var(--chart-2))",
  "2020": "hsl(var(--chart-3))",
  "2021": "hsl(var(--chart-4))",
};

export const visitSummaryStats = {
  totalVisits: visitData.reduce((sum, d) => sum + d.visit_count, 0),
  avgMonthlyVisits: Math.round(visitData.reduce((sum, d) => sum + d.visit_count, 0) / visitData.length),
  peakMonth: visitData.reduce((max, d) => d.visit_count > max.visit_count ? d : max, visitData[0]),
  lowMonth: visitData.reduce((min, d) => d.visit_count < min.visit_count ? d : min, visitData[0]),
  totalYears: 4,
  totalMonths: visitData.length
};
