import { DollarSign, TrendingUp, AlertTriangle, BarChart3, Database } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { BarChartCard } from "@/components/charts/BarChartCard";
import { LineChartCard } from "@/components/charts/LineChartCard";
import { AreaChartCard } from "@/components/charts/AreaChartCard";
import { PieChartCard } from "@/components/charts/PieChartCard";
import { ScatterChartCard } from "@/components/charts/ScatterChartCard";
import { RadarChartCard } from "@/components/charts/RadarChartCard";
import { DataTable } from "@/components/DataTable";
import { summaryStats } from "@/data/severityData";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">Severity Cost Analytics</h1>
                <p className="text-xs text-muted-foreground">Parquet Data Visualization Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Database className="h-4 w-4" />
              <span>Data source: parquet file</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 space-y-8">
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

        {/* Footer */}
        <footer className="text-center py-6 border-t border-border/30">
          <p className="text-sm text-muted-foreground">
            Visualizing severity_score and avg_cost data from Spark-generated Parquet file
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
