import { useEffect, useMemo, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  computeCreditScoreFromHistory,
  fetchZerionPortfolioHistoryUsd,
  fetchZerionPortfolioUsd,
  hasZerionApiKey,
} from "@/services/zerion";

export type WalletData = {
  usdBalance: number | null;
  creditScore: number | null;
  loading: boolean;
  error: string | null;
};

export function useWalletData(): WalletData {
  const { publicKey, connected } = useWallet();
  const address = useMemo(() => publicKey?.toBase58() ?? null, [publicKey]);
  const [state, setState] = useState<WalletData>({ usdBalance: null, creditScore: null, loading: false, error: null });

  useEffect(() => {
    if (!connected || !address) {
      setState({ usdBalance: null, creditScore: null, loading: false, error: null });
      return;
    }

    let aborted = false;
    const run = async () => {
      setState((s) => ({ ...s, loading: true, error: null }));
      try {
        if (!hasZerionApiKey()) {
          setState({ usdBalance: null, creditScore: null, loading: false, error: "Missing VITE_ZERION_API_KEY" });
          return;
        }
        // Fetch current USD portfolio value
        const [usd, history] = await Promise.all([
          fetchZerionPortfolioUsd(address),
          fetchZerionPortfolioHistoryUsd(address, { period: "30d", resolution: "1d" }),
        ]);

        let credit = computeCreditScoreFromHistory(history);
        if (credit == null && typeof usd === "number") {
          credit = Math.round(usd * 0.2);
        }

        if (!aborted) setState({ usdBalance: usd ?? null, creditScore: credit ?? null, loading: false, error: null });
      } catch (e) {
        if (!aborted)
          setState({ usdBalance: null, creditScore: null, loading: false, error: (e as Error).message ?? "Failed" });
      }
    };

    run();
    const id = setInterval(run, 30000);
    return () => {
      aborted = true;
      clearInterval(id);
    };
  }, [connected, address]);

  return state;
}

export function useAddressWalletData(address: string | null): WalletData {
  const [state, setState] = useState<WalletData>({ usdBalance: null, creditScore: null, loading: false, error: null });

  useEffect(() => {
    if (!address) {
      setState({ usdBalance: null, creditScore: null, loading: false, error: null });
      return;
    }

    let aborted = false;
    const run = async () => {
      setState((s) => ({ ...s, loading: true, error: null }));
      try {
        if (!hasZerionApiKey()) {
          setState({ usdBalance: null, creditScore: null, loading: false, error: "Missing VITE_ZERION_API_KEY" });
          return;
        }
        const [usd, history] = await Promise.all([
          fetchZerionPortfolioUsd(address),
          fetchZerionPortfolioHistoryUsd(address, { period: "30d", resolution: "1d" }),
        ]);
        let credit = computeCreditScoreFromHistory(history);
        if (credit == null && typeof usd === "number") credit = Math.round(usd * 0.2);
        if (!aborted) setState({ usdBalance: usd ?? null, creditScore: credit ?? null, loading: false, error: null });
      } catch (e) {
        if (!aborted)
          setState({ usdBalance: null, creditScore: null, loading: false, error: (e as Error).message ?? "Failed" });
      }
    };

    run();
    return () => {
      aborted = true;
    };
  }, [address]);

  return state;
}


