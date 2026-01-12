import { BarChart3, Database } from "lucide-react";
import { DashboardTabs } from "@/components/DashboardTabs";

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
                <h1 className="text-xl font-bold text-gradient">Parquet Data Analytics</h1>
                <p className="text-xs text-muted-foreground">Multi-Dataset Visualization Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Database className="h-4 w-4" />
              <span>2 Datasets Loaded</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <DashboardTabs />

        {/* Footer */}
        <footer className="text-center py-6 border-t border-border/30 mt-8">
          <p className="text-sm text-muted-foreground">
            Visualizing Spark-generated Parquet files with comprehensive analytics
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
