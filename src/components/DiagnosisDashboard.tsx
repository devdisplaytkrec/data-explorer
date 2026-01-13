import { Stethoscope, TrendingUp, Layers, Activity } from "lucide-react";
import { StatCard } from "./StatCard";
import { DiagnosisBarChart } from "./charts/DiagnosisBarChart";
import { DiagnosisPieChart } from "./charts/DiagnosisPieChart";
import { DiagnosisRadialChart } from "./charts/DiagnosisRadialChart";
import { DiagnosisTreemap } from "./charts/DiagnosisTreemap";
import { DiagnosisTable } from "./charts/DiagnosisTable";
import { diagnosisSummaryStats } from "@/data/diagnosisData";

export function DiagnosisDashboard() {
  return (
    <div className="space-y-8">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Cases"
          value={diagnosisSummaryStats.totalCases.toLocaleString()}
          subtitle={`${diagnosisSummaryStats.totalDiagnoses} diagnoses`}
          icon={Stethoscope}
          variant="primary"
        />
        <StatCard
          title="Top Diagnosis"
          value={diagnosisSummaryStats.topDiagnosis.shortName}
          subtitle={`${diagnosisSummaryStats.topDiagnosis.case_count} cases`}
          icon={TrendingUp}
          variant="accent"
        />
        <StatCard
          title="Avg Cases/Diagnosis"
          value={diagnosisSummaryStats.avgCasesPerDiagnosis.toString()}
          subtitle="Average case load"
          icon={Activity}
        />
        <StatCard
          title="Top Category"
          value={diagnosisSummaryStats.topCategory.category}
          subtitle={`${diagnosisSummaryStats.topCategory.count} cases`}
          icon={Layers}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DiagnosisBarChart />
        <DiagnosisPieChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DiagnosisTreemap />
        <DiagnosisRadialChart />
      </div>

      <DiagnosisTable />
    </div>
  );
}
