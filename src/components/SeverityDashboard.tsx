import { DollarSign, TrendingUp, AlertTriangle, Database } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { BarChartCard } from "@/components/charts/BarChartCard";
import { LineChartCard } from "@/components/charts/LineChartCard";
import { AreaChartCard } from "@/components/charts/AreaChartCard";
import { PieChartCard } from "@/components/charts/PieChartCard";
import { ScatterChartCard } from "@/components/charts/ScatterChartCard";
import { RadarChartCard } from "@/components/charts/RadarChartCard";
import { DataTable } from "@/components/DataTable";
import { summaryStats } from "@/data/severityData";

export function SeverityDashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Cost"
          value={`$${summaryStats.totalCost.toLocaleString()}`}
          subtitle="Across all severity levels"
          icon={DollarSign}
          variant="primary"
        />
        <StatCard
          title="Average Cost"
          value={`$${summaryStats.avgCost.toLocaleString()}`}
          subtitle="Per severity level"
          icon={TrendingUp}
        />
        <StatCard
          title="Max Cost"
          value={`$${summaryStats.maxCost.toLocaleString()}`}
          subtitle="Critical severity"
          icon={AlertTriangle}
          variant="accent"
        />
        <StatCard
          title="Data Points"
          value={summaryStats.totalRecords.toString()}
          subtitle="Severity levels analyzed"
          icon={Database}
        />
      </section>

      {/* Primary Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChartCard />
        <LineChartCard />
      </section>

      {/* Secondary Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AreaChartCard />
        <PieChartCard />
      </section>

      {/* Additional Analysis */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ScatterChartCard />
        <RadarChartCard />
      </section>

      {/* Data Table */}
      <section>
        <DataTable />
      </section>
    </div>
  );
}
