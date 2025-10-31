import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Landing = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Card container */}
      <header className="container mx-auto px-4">
        <div className="relative mt-6 overflow-hidden rounded-[40px] md:rounded-[56px] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] bg-[radial-gradient(120%_120%_at_20%_10%,hsl(217_95%_55%)_0%,hsl(212_92%_48%)_40%,hsl(208_90%_45%)_60%,hsl(205_88%_40%)_100%)]">
          {/* Top-left brand */}
          <div className="absolute top-6 left-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-white/90 flex items-center justify-center">
              <span className="text-black font-extrabold">R</span>
            </div>
            <span className="hidden sm:block font-semibold tracking-wide">RABA</span>
          </div>

          {/* Centered black rounded nav */}
          <div className="absolute left-1/2 -translate-x-1/2 top-6 hidden md:block">
            <div className="px-6 py-3 bg-black/90 text-white rounded-full border border-white/10 shadow-lg">
              <ul className="flex items-center gap-8 text-sm">
                <li><a href="#" className="hover:text-white/80">Home</a></li>
                <li><a href="#how" className="hover:text-white/80">How it works</a></li>
                <li><a href="#benefits" className="hover:text-white/80">Benefits</a></li>
                <li><a href="#faq" className="hover:text-white/80">FAQ</a></li>
                <li className="text-white/70">EN ▾</li>
              </ul>
            </div>
          </div>

          {/* Top-right TGE pill */}
          <div className="absolute top-6 right-6">
            <div className="inline-flex items-center gap-2 bg-white text-black rounded-full px-4 py-2 text-xs font-semibold shadow">
              <span className="inline-block w-5 h-5 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600" />
              $RABA
            </div>
          </div>

          {/* Large Telegram watermark shape */}
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#a)">
              <path d="M540 120c60 40 110 100 140 170s34 147 9 210c-26 65-85 110-150 115-64 6-131-27-191-72-60-46-114-104-122-170-8-65 28-138 90-188 61-51 148-77 224-65z" fill="#fff" fillOpacity="0.1"/>
            </g>
            <defs>
              <filter id="a" x="0" y="0" width="800" height="600" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feGaussianBlur stdDeviation="40"/>
              </filter>
            </defs>
          </svg>

          {/* Curved bottom notch */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[75%] h-44 bg-black rounded-[56px]" />

          {/* CTAs - Bottom right in dark notch area */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col sm:flex-row gap-4 z-20">
            <Link to="/app" className="inline-flex">
              <Button className="rounded-full size-19 text-white shadow-xl px-12 py-6"
                style={{ background: "linear-gradient(135deg, #6D5DF6 0%, #8A5CF6 100%)" }}
              >
                Explore Web App
              </Button>
            </Link>
            <a href="https://t.me" target="_blank" rel="noreferrer" className="inline-flex">
              <Button className="rounded-full size-19 bg-white text-black hover:bg-white/90 px-6 py-6">
                Email Us
              </Button>
            </a>
          </div>

          {/* Content */}
          <div className="relative z-10 px-6 md:px-16 pt-24 pb-36">
            <h1 className="text-[40px] md:text-[88px] leading-[0.9] font-extrabold tracking-tight drop-shadow">
              Crypto Lending
              <br />
              On Solana
            </h1>
            <p className="mt-6 max-w-2xl text-lg md:text-2xl text-white/85">
              Deposit, earn or select a loan amount, and enjoy fast and simple lending on Solana
            </p>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 max-w-xl gap-8 text-left">
              <div>
                <div className="text-3xl md:text-4xl font-extrabold tracking-wider">118M+</div>
                <div className="text-xs md:text-sm text-white/80">Total Deposit at the peak</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-extrabold tracking-wider">300K+</div>
                <div className="text-xs md:text-sm text-white/80">Unique Wallets</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-extrabold tracking-wider">1.4B+</div>
                <div className="text-xs md:text-sm text-white/80">Transaction Volume</div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* How it works section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-center text-4xl md:text-6xl font-extrabold tracking-tight mb-16">
          How it works
        </h2>

        {/* Row 1 */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-28">
          <div className="relative">
            <div className="absolute -inset-10 bg-[radial-gradient(circle_at_30%_30%,#7c3aed66,transparent_60%),radial-gradient(circle_at_70%_70%,#22d3ee44,transparent_60%)] blur-2xl" />
            <div className="relative rounded-3xl bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md border border-white/10 p-6 shadow-2xl max-w-md">
              <img src="/illustrations/supply-collateral.svg" alt="Supply and collateral" className="h-56 w-full object-cover rounded-2xl" />
              <div className="mt-4 h-24 rounded-xl bg-black/60 border border-white/10" />
            </div>
          </div>
          <div className="text-left">
            <h3 className="text-2xl md:text-3xl font-extrabold leading-tight">
              Supply Assets
              <br />
              and Earn Yield
            </h3>
            <p className="mt-3 text-sm md:text-base text-white/80 max-w-md">
              Deposit your Solana assets to start earning passive income. Your supplied assets generate yield while you maintain full control of your funds.
            </p>
            <div className="mt-6">
              <Button className="rounded-full px-6" style={{ background: "linear-gradient(135deg,#7C3AED,#6D28D9)" }}>
                Supply Now
              </Button>
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-28">
          <div className="order-2 md:order-1 text-left md:text-right">
            <h3 className="text-2xl md:text-3xl font-extrabold leading-tight">
              Borrow Against
              <br />
              Your Collateral
            </h3>
            <p className="mt-3 text-sm md:text-base text-white/80 md:ml-auto max-w-md">
              Use your supplied assets as collateral to borrow instantly. Borrow only what you need while your collateral continues earning yield.
            </p>
            <div className="mt-6 md:justify-end flex">
              <Button className="rounded-full px-6" style={{ background: "linear-gradient(135deg,#7C3AED,#6D28D9)" }}>
                Borrow Now
              </Button>
            </div>
          </div>
          <div className="order-1 md:order-2 relative">
            <div className="absolute -inset-10 bg-[radial-gradient(circle_at_70%_30%,#f472b644,transparent_60%),radial-gradient(circle_at_30%_70%,#22d3ee44,transparent_60%)] blur-2xl" />
            <div className="relative rounded-3xl bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md border border-white/10 p-6 shadow-2xl max-w-md ml-auto">
              <img src="/illustrations/borrow-mobile.svg" alt="Borrow on mobile" className="h-56 w-full object-cover rounded-2xl" />
              <div className="mt-4 h-24 rounded-xl bg-black/60 border border-white/10" />
            </div>
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="relative">
            <div className="absolute -inset-10 bg-[radial-gradient(circle_at_30%_70%,#22c55e44,transparent_60%),radial-gradient(circle_at_70%_30%,#22d3ee33,transparent_60%)] blur-2xl" />
            <div className="relative rounded-3xl bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md border border-white/10 p-6 shadow-2xl max-w-md">
              <img src="/illustrations/health-factor.svg" alt="Health factor gauge" className="h-56 w-full object-cover rounded-2xl" />
              <div className="mt-4 h-24 rounded-xl bg-black/60 border border-white/10" />
            </div>
          </div>
          <div className="text-left">
            <h3 className="text-2xl md:text-3xl font-extrabold leading-tight">
              Monitor Your
              <br />
              Health Factor
            </h3>
            <p className="mt-3 text-sm md:text-base text-white/80 max-w-md">
              Track your position's safety with real-time health factor monitoring. Stay in control with automated risk management on Solana.
            </p>
            <div className="mt-6">
              <Button className="rounded-full px-6" style={{ background: "linear-gradient(135deg,#7C3AED,#6D28D9)" }}>
                View Dashboard
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Raba section */}
      <section className="container mx-auto px-4 pb-28">
        <h2 className="text-center text-4xl md:text-6xl font-extrabold tracking-tight mb-14">
          Why Raba?
        </h2>

        <div className="grid md:grid-cols-3 md:grid-rows-2 gap-6">
          {/* Top-left: Orange card */}
          <div className="rounded-3xl p-8 text-black bg-[linear-gradient(135deg,#FF8A5B_0%,#FF5A5A_40%,#FF3D3D_100%)] transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
            <h3 className="text-5xl md:text-6xl font-extrabold">Built on</h3>
            <p className="mt-2 text-2xl font-extrabold">Solana</p>
            <p className="mt-4 text-sm/6 max-w-sm text-black/90">
              Raba is a leading DeFi lending protocol on Solana. As a liquidity protocol, Raba simplifies earning yields,
              borrowing assets, and managing collateral with fast transactions and low fees.
            </p>
          </div>

          {/* Center: Tall purple feature with device mock, spans rows */}
          <div className="rounded-3xl p-8 text-white bg-[linear-gradient(135deg,#8B5CF6_0%,#6D28D9_100%)] md:row-span-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
            <h3 className="text-2xl md:text-3xl font-extrabold">Multiple Pools</h3>
            <p className="mt-3 text-white/90 text-sm/6 max-w-md">
              Access diverse lending pools including Main Pool, Stable Pool, LP Pool, and Alts Pool. Each pool offers different risk profiles and yield opportunities tailored to your strategy.
            </p>
            <div className="mt-8 relative">
              <div className="absolute -inset-8 bg-[radial-gradient(circle_at_20%_20%,#22d3ee44,transparent_60%),radial-gradient(circle_at_80%_80%,#f472b644,transparent_60%)] blur-2xl" />
              <div className="relative mx-auto h-96 max-w-sm rounded-[40px] bg-black/70 border border-white/15 shadow-2xl" />
            </div>
          </div>

          {/* Top-right: Dark card */}
          <div className="rounded-3xl p-8 bg-neutral-900 text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-neutral-800 cursor-pointer">
            <h3 className="text-2xl md:text-3xl font-extrabold">Solana Native
              <br />
              Assets
            </h3>
            <p className="mt-4 text-white/80 text-sm/6">
              Support for SOL, SPL tokens, and Solana-native assets. Lend and borrow using the fastest blockchain with ultra-low transaction costs.
            </p>
          </div>

          {/* Bottom-left: Dark card */}
          <div className="rounded-3xl p-8 bg-neutral-900 text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-neutral-800 cursor-pointer">
            <h3 className="text-2xl md:text-3xl font-extrabold">Real-Time
              <br />
              Health Factor
            </h3>
            <p className="mt-4 text-white/80 text-sm/6">
              Monitor your position safety with live health factor tracking. Automated risk management ensures your collateral stays secure.
            </p>
          </div>

          {/* Bottom-right: Green card */}
          <div className="rounded-3xl p-8 bg-[linear-gradient(135deg,#34D399_0%,#10B981_100%)] text-black transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
            <h3 className="text-2xl md:text-3xl font-extrabold">Smart Credit
              <br />
              Assessment
            </h3>
            <p className="mt-4 text-sm/6 max-w-md">
              Powered by Zerion's portfolio infrastructure, we offer transparent and fair borrowing limits based on your on-chain history.
            </p>
          </div>
        </div>
      </section>

      {/* Full Screen CTA Section */}
      <section className="bg-[linear-gradient(135deg,#3B82F6_0%,#F97316_100%)] text-white min-h-screen flex items-center justify-center py-32">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight">
            No naira? Earn, Pay & Borrow with your crypto
          </h2>
        </div>
      </section>

    </div>
  );
};

export default Landing;


