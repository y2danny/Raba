import { Badge } from "@/components/ui/badge";

interface Pool {
  id: string;
  label: string;
  isNew?: boolean;
}

interface PoolSelectorProps {
  pools: Pool[];
  activePool: string;
  onPoolChange: (poolId: string) => void;
}

export const PoolSelector = ({ pools, activePool, onPoolChange }: PoolSelectorProps) => {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {pools.map((pool) => (
        <button
          key={pool.id}
          onClick={() => onPoolChange(pool.id)}
          className={`relative px-6 py-2.5 rounded-full font-medium text-sm transition-all ${
            activePool === pool.id
              ? "bg-primary text-white shadow-lg"
              : "bg-card text-foreground hover:bg-muted"
          }`}
        >
          {pool.label}
          {pool.isNew && (
            <Badge className="absolute -top-2 -right-2 bg-accent text-white text-xs px-2 py-0.5">
              New
            </Badge>
          )}
        </button>
      ))}
    </div>
  );
};
