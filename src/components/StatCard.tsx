import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  variant?: "default" | "primary" | "accent";
}

export function StatCard({ title, value, subtitle, icon: Icon, variant = "default" }: StatCardProps) {
  return (
    <Card className={`glass-card transition-all duration-300 hover:scale-[1.02] ${
      variant === "primary" ? "glow-primary" : variant === "accent" ? "glow-accent" : ""
    }`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className={`text-3xl font-bold ${
              variant === "primary" ? "text-primary" : 
              variant === "accent" ? "text-accent" : "text-foreground"
            }`}>
              {value}
            </p>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
          <div className={`p-3 rounded-xl ${
            variant === "primary" ? "bg-primary/10" : 
            variant === "accent" ? "bg-accent/10" : "bg-secondary"
          }`}>
            <Icon className={`h-6 w-6 ${
              variant === "primary" ? "text-primary" : 
              variant === "accent" ? "text-accent" : "text-muted-foreground"
            }`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
