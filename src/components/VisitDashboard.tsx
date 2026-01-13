import { Calendar, TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import { StatCard } from "./StatCard";
import { VisitLineChart } from "./charts/VisitLineChart";
import { VisitBarChart } from "./charts/VisitBarChart";
import { VisitAreaChart } from "./charts/VisitAreaChart";
import { VisitPieChart } from "./charts/VisitPieChart";
import { VisitHeatmap } from "./charts/VisitHeatmap";
import { VisitTable } from "./charts/VisitTable";
import { visitSummaryStats } from "@/data/visitData";

export function VisitDashboard() {
  return (
    <div className="space-y-8">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Visits"
          value={visitSummaryStats.totalVisits.toLocaleString()}
          subtitle={`Across ${visitSummaryStats.totalYears} years`}
          icon={Calendar}
          variant="primary"
        />
        <StatCard
          title="Avg Monthly Visits"
          value={visitSummaryStats.avgMonthlyVisits.toLocaleString()}
          subtitle={`${visitSummaryStats.totalMonths} months tracked`}
          icon={BarChart3}
        />
        <StatCard
          title="Peak Month"
          value={visitSummaryStats.peakMonth.visit_count.toLocaleString()}
          subtitle={`${visitSummaryStats.peakMonth.monthLabel} ${visitSummaryStats.peakMonth.visit_year}`}
          icon={TrendingUp}
          variant="accent"
        />
        <StatCard
          title="Lowest Month"
          value={visitSummaryStats.lowMonth.visit_count.toLocaleString()}
          subtitle={`${visitSummaryStats.lowMonth.monthLabel} ${visitSummaryStats.lowMonth.visit_year}`}
          icon={TrendingDown}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VisitLineChart />
        <VisitBarChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VisitAreaChart />
        <VisitPieChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VisitHeatmap />
        <VisitTable />
      </div>
    </div>
  );
}
