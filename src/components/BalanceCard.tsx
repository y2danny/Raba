import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowDown, Plus } from "lucide-react";

interface BalanceCardProps {
  title: string;
  amount: string;
  subAmount?: string;
  buttonText: string;
  buttonIcon?: "plus" | "arrow";
  variant?: "primary" | "secondary";
  onAction?: () => void;
}

export const BalanceCard = ({
  title,
  amount,
  subAmount,
  buttonText,
  buttonIcon = "plus",
  variant = "primary",
  onAction,
}: BalanceCardProps) => {
  const isPrimary = variant === "primary";
  
  return (
    <Card
      className={`p-6 ${
        isPrimary
          ? "bg-gradient-to-br from-primary to-accent text-white border-none"
          : "bg-gradient-to-br from-secondary to-secondary/80 text-white border-none"
      } shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]`}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium opacity-90">{title}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold">{amount}</span>
            {subAmount && (
              <span className="text-sm opacity-75">{subAmount}</span>
            )}
          </div>
        </div>
        
        <Button
          variant={isPrimary ? "secondary" : "outline"}
          size="lg"
          className={`gap-2 ${
            isPrimary
              ? "bg-white text-primary hover:bg-white/90"
              : "border-white/20 text-white hover:bg-white/10"
          }`}
          onClick={onAction}
        >
          {buttonIcon === "plus" ? (
            <Plus className="h-4 w-4" />
          ) : (
            <ArrowDown className="h-4 w-4" />
          )}
          {buttonText}
        </Button>
      </div>
    </Card>
  );
};
