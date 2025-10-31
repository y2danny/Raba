import { Card } from "@/components/ui/card";

interface TokenBalanceProps {
  icon: string;
  name: string;
  symbol: string;
  balance: string;
  usdValue: string;
  walletBalance?: string;
  apy?: string;
  type: "supply" | "borrow";
}

export const TokenBalance = ({
  icon,
  name,
  symbol,
  balance,
  usdValue,
  walletBalance,
  apy,
  type,
}: TokenBalanceProps) => {
  return (
    <Card className="p-4 hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
          {icon}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="font-semibold">{symbol}</p>
              <p className="text-xs text-muted-foreground">{name}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg">{balance}</p>
              <p className="text-xs text-muted-foreground">{usdValue}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            {walletBalance && (
              <div>
                <span className="text-muted-foreground">Wallet Balance: </span>
                <span className="font-medium">{walletBalance}</span>
              </div>
            )}
            {apy && (
              <div className={type === "supply" ? "text-success" : "text-destructive"}>
                <span className="font-medium">{type === "supply" ? "Supply" : "Borrow"} APY: </span>
                <span className="font-bold">{apy}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
