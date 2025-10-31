import { useState } from "react";
import { Header } from "@/components/Header";
import { ViewToggle } from "@/components/ViewToggle";
import { PoolSelector } from "@/components/PoolSelector";
import { BalanceCard } from "@/components/BalanceCard";
import { HealthFactor } from "@/components/HealthFactor";
import { TokenBalance } from "@/components/TokenBalance";
import { Card } from "@/components/ui/card";
import { useAddressWalletData, useWalletData } from "@/hooks/useWalletData";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { ArrowDown, Heart, DollarSign } from "lucide-react";

const pools = [
  { id: "main", label: "Main Pool" },
  { id: "stable", label: "Stable Pool", isNew: true },
  { id: "lp", label: "LP Pool", isNew: true },
  { id: "alts", label: "Alts Pool" },
];

const Index = () => {
  const [activeView, setActiveView] = useState("Dashboard");
  const [activePool, setActivePool] = useState("main");
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);
  const { usdBalance, creditScore, loading, error } = useWalletData();
  const [lookupAddress, setLookupAddress] = useState("");
  const [queriedAddress, setQueriedAddress] = useState<string | null>(null);
  const lookup = useAddressWalletData(queriedAddress);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Subtle gradient overlays at edges */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-accent/5 to-transparent" />
      </div>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-6 relative z-10">
        {/* View Toggle and Pool Selector */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <ViewToggle
            views={["Dashboard", "Market"]}
            activeView={activeView}
            onViewChange={setActiveView}
          />
          
          <PoolSelector
            pools={pools}
            activePool={activePool}
            onPoolChange={setActivePool}
          />
        </div>

        {/* Total Balance */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <p className="text-sm text-muted-foreground mb-2">All pools Balance</p>
            <h2 className="text-5xl font-bold mb-1">
              {loading ? (
                <span className="text-3xl text-muted-foreground">Loading...</span>
              ) : typeof usdBalance === "number" ? (
                <>
                  ${usdBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  <span className="text-3xl text-muted-foreground">.00</span>
                </>
              ) : (
                <>
                  $0<span className="text-3xl text-muted-foreground">.00</span>
                </>
              )}
            </h2>
          </div>
          <Card className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 text-sm md:mt-0 mt-2 p-4 bg-muted border-0 rounded-xl w-full">
            <button 
              onClick={() => setHowItWorksOpen(true)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              How it works?
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              Account 1
            </button>
            {error && (
              <div className="text-muted-foreground">
                {error}
              </div>
            )}
            {typeof creditScore === "number" && (
              <div className="text-primary font-medium">
                Credit Score <span className="ml-1">{creditScore.toLocaleString()}</span>
              </div>
            )}
            <div className="text-success font-medium">
              NET APY <span className="ml-1">+0.00</span>
            </div>

            {/* Address lookup */}
            <div className="flex items-center gap-2 md:ml-auto w-full md:w-auto">
              <Input
                value={lookupAddress}
                onChange={(e) => setLookupAddress(e.target.value)}
                placeholder="Paste Solana address"
                className="md:w-72"
              />
              <button
                onClick={() => setQueriedAddress(lookupAddress.trim() || null)}
                className="px-3 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Lookup
              </button>
            </div>
          </Card>
        </div>
        {/* Lookup Results */}
        {queriedAddress && (
          <Card className="p-4 bg-muted border-0 rounded-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="text-sm text-muted-foreground break-all">
                Address: <span className="text-foreground">{queriedAddress}</span>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div>
                  Balance: {lookup.loading ? "Loading..." : typeof lookup.usdBalance === "number" ? `$${lookup.usdBalance.toLocaleString()}` : "—"}
                </div>
                <div>
                  Credit Score: {lookup.loading ? "Loading..." : typeof lookup.creditScore === "number" ? lookup.creditScore.toLocaleString() : "—"}
                </div>
                {lookup.error && <div className="text-muted-foreground">{lookup.error}</div>}
              </div>
            </div>
          </Card>
        )}

        {/* Balance Cards & Health Factor */}
        <Card className="p-6 bg-muted border-0 rounded-2xl space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <BalanceCard
              title="Supply Balance"
              amount="$0"
              subAmount=".00"
              buttonText="Supply"
              buttonIcon="plus"
              variant="primary"
            />
            
            <BalanceCard
              title="Available to Borrow"
              amount="$0"
              subAmount=".00"
              buttonText="Borrow"
              buttonIcon="arrow"
              variant="secondary"
            />
          </div>

          <HealthFactor value={100} className="bg-success/10 border-success/20" />
        </Card>

        {/* Supplies and Borrows */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Supplies Section */}
          <Card className="p-6 bg-muted border-0 rounded-2xl">
            <h3 className="text-xl font-bold mb-4">Supplies</h3>
            <div className="space-y-3">
              <TokenBalance
                icon="◎"
                name="Solana"
                symbol="SOL"
                balance="0.00"
                usdValue="$0.00"
                walletBalance="0.00 $0.00"
                apy="4.01%"
                type="supply"
              />
            </div>
          </Card>

          {/* Borrows Section */}
          <Card className="p-6 bg-muted border-0 rounded-2xl">
            <h3 className="text-xl font-bold mb-4">Borrows</h3>
            <div className="space-y-3">
              <TokenBalance
                icon="◎"
                name="Solana"
                symbol="SOL"
                balance="0.00"
                usdValue="$0.00"
                walletBalance="979.36K $1.23M"
                apy="0.11%"
                type="borrow"
              />
            </div>
          </Card>
        </div>
      </main>

      {/* How it works Modal */}
      <Dialog open={howItWorksOpen} onOpenChange={setHowItWorksOpen}>
        <DialogContent className="max-w-sm p-0 gap-0 rounded-2xl overflow-hidden">
          <DialogHeader className="px-5 pt-5 pb-3">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold">How it works?</DialogTitle>
              <DialogClose className="rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-100 transition-colors">
                <span className="sr-only">Close</span>
              </DialogClose>
            </div>
          </DialogHeader>
          
          <div className="space-y-0">
            {/* Section 1: Supply & Collateral */}
            <div className="relative p-5 bg-gradient-to-br from-blue-50 via-blue-50 to-pink-50 rounded-lg mx-2 mb-2">
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0 w-20 h-20">
                  <div className="w-16 h-16 rounded-full border-2 border-gray-800 flex items-center justify-center bg-white">
                    <ArrowDown className="w-7 h-7 text-gray-800" />
                  </div>
                  <div className="absolute top-2 -right-2 text-xs font-semibold text-gray-800"></div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full border border-gray-800" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Supply & Collateral</h4>
                  <p className="text-xs text-gray-700 mb-2 leading-relaxed">
                    Supply a token to earn and then use it as collateral to borrow.
                  </p>
                  <a href="#" className="text-primary text-xs underline">Learn more</a>
                </div>
              </div>
            </div>

            {/* Section 2: Health Factor */}
            <div className="relative p-5 bg-gradient-to-br from-pink-50 via-pink-50 to-purple-50 rounded-lg mx-2 mb-2">
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0 w-20 h-20">
                  <div className="w-16 h-16 rounded-full border-2 border-gray-800 flex items-center justify-center bg-white relative">
                    <Heart className="w-7 h-7 text-gray-800 absolute z-10" />
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-10 h-1 bg-gray-300 rounded-full">
                      <div className="w-7 h-1 bg-gray-800 rounded-full" />
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Health Factor</h4>
                  <p className="text-xs text-gray-700 mb-2 leading-relaxed">
                    Health Factor shows how safe your loan is – a higher score means less risk of liquidation.
                  </p>
                  <a href="#" className="text-primary text-xs underline">Learn more</a>
                </div>
              </div>
            </div>

            {/* Section 3: Liquidation */}
            <div className="relative p-5 bg-gradient-to-br from-purple-50 via-purple-50 to-blue-50 rounded-lg mx-2 mb-2">
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0 w-20 h-20">
                  <div className="w-16 h-16 rounded-full border-2 border-gray-800 flex items-center justify-center bg-white relative overflow-visible">
                    <DollarSign className="w-7 h-7 text-gray-800 z-10 relative" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 bg-white transform rotate-45 border-2 border-gray-800" 
                      style={{ clipPath: 'polygon(100% 0, 100% 50%, 50% 100%, 0 100%, 0 50%)' }} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Liquidation</h4>
                  <p className="text-xs text-gray-700 mb-2 leading-relaxed">
                    Liquidation could happen if your loan's value rises against the value of your supply.
                  </p>
                  <a href="#" className="text-primary text-xs underline">Learn more</a>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
