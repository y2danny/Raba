import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useMemo } from "react";

export const Header = () => {
  const { wallet, disconnect, connected, publicKey } = useWallet();
  const { setVisible } = useWalletModal();

  const handleConnect = () => {
    setVisible(true);
  };

  const handleDisconnect = () => {
    disconnect();
  };

  const walletAddress = useMemo(() => {
    if (!publicKey) return null;
    const address = publicKey.toBase58();
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  }, [publicKey]);

  return (
    <header className="border-b bg-card shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">R</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Raba
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Dashboard
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Borrow
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Lend
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            My Loans
          </a>
        </nav>

        {connected ? (
          <Button variant="hero" className="gap-2" onClick={handleDisconnect}>
            <Wallet className="h-4 w-4" />
            {walletAddress}
          </Button>
        ) : (
          <Button variant="hero" className="gap-2" onClick={handleConnect}>
            <Wallet className="h-4 w-4" />
            Connect Wallet
          </Button>
        )}
      </div>
    </header>
  );
};
