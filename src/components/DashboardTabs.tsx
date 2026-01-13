import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Pill, CalendarDays } from "lucide-react";
import { SeverityDashboard } from "./SeverityDashboard";
import { DrugDashboard } from "./DrugDashboard";
import { VisitDashboard } from "./VisitDashboard";

export function DashboardTabs() {
  return (
    <Tabs defaultValue="severity" className="w-full">
      <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-8 bg-secondary/50">
        <TabsTrigger value="severity" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
          <Activity className="h-4 w-4" />
          Severity Analysis
        </TabsTrigger>
        <TabsTrigger value="drugs" className="flex items-center gap-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
          <Pill className="h-4 w-4" />
          Drug Supply
        </TabsTrigger>
        <TabsTrigger value="visits" className="flex items-center gap-2 data-[state=active]:bg-chart-3 data-[state=active]:text-primary-foreground">
          <CalendarDays className="h-4 w-4" />
          Visit Trends
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="severity" className="mt-0">
        <SeverityDashboard />
      </TabsContent>
      
      <TabsContent value="drugs" className="mt-0">
        <DrugDashboard />
      </TabsContent>
      
      <TabsContent value="visits" className="mt-0">
        <VisitDashboard />
      </TabsContent>
    </Tabs>
  );
}
