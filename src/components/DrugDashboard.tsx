import { Pill, Clock, TrendingUp, Layers } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { DrugBarChart } from "@/components/charts/DrugBarChart";
import { DrugPieChart } from "@/components/charts/DrugPieChart";
import { DrugRadialChart } from "@/components/charts/DrugRadialChart";
import { DrugAreaChart } from "@/components/charts/DrugAreaChart";
import { DrugTable } from "@/components/charts/DrugTable";
import { drugSummaryStats } from "@/data/drugData";

export function DrugDashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Drugs"
          value={drugSummaryStats.totalDrugs.toString()}
          subtitle="Medications analyzed"
          icon={Pill}
          variant="primary"
        />
        <StatCard
          title="Avg Supply"
          value={`${drugSummaryStats.avgDaysSupply.toFixed(1)} days`}
          subtitle="Average duration"
          icon={Clock}
        />
        <StatCard
          title="Max Supply"
          value={`${drugSummaryStats.maxDaysSupply} days`}
          subtitle="Longest duration"
          icon={TrendingUp}
          variant="accent"
        />
        <StatCard
          title="Categories"
          value={drugSummaryStats.totalCategories.toString()}
          subtitle="Drug categories"
          icon={Layers}
        />
      </section>

      {/* Primary Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DrugBarChart />
        <DrugPieChart />
      </section>

      {/* Secondary Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DrugAreaChart />
        <DrugRadialChart />
      </section>

      {/* Data Table */}
      <section>
        <DrugTable />
      </section>
    </div>
  );
}
