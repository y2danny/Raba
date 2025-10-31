import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { HelpCircle } from "lucide-react";

interface HealthFactorProps {
  value: number;
  label?: string;
  className?: string;
}

export const HealthFactor = ({ value, label = "Health Factor", className }: HealthFactorProps) => {
  const getHealthColor = (health: number) => {
    if (health >= 80) return "text-success";
    if (health >= 50) return "text-amber-500";
    return "text-destructive";
  };

  const getProgressColor = (health: number) => {
    if (health >= 80) return "bg-success";
    if (health >= 50) return "bg-amber-500";
    return "bg-destructive";
  };

  return (
    <Card className={`p-6 shadow-sm ${className ?? ""}`.trim()}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              {label}
            </span>
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
          </div>
          <span className={`text-2xl font-bold ${getHealthColor(value)}`}>
            {value}%
          </span>
        </div>
        
        <Progress value={value} className="h-2" indicatorClassName={getProgressColor(value)} />
      </div>
    </Card>
  );
};
