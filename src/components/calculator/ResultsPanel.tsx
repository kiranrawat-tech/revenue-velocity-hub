import { CalculatorResults } from "@/lib/calculations";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { TrendingUp, DollarSign, Zap, Clock, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ResultsPanelProps {
  results: CalculatorResults;
}

export function ResultsPanel({ results }: ResultsPanelProps) {
  const { toast } = useToast();

  const copyResults = () => {
    const text = `Lead Nurturing ROI Summary
━━━━━━━━━━━━━━━━━━━━━━━
ROI: ${results.roi}%
Revenue Surplus: $${results.revenueSurplus.toLocaleString()}/mo
Baseline Revenue: $${results.baselineRevenue.toLocaleString()}/mo
Nurtured Revenue: $${results.nurturedRevenue.toLocaleString()}/mo
Annual Time Savings: $${results.annualTimeSavings.toLocaleString()}
Total Investment: $${results.totalInvestment.toLocaleString()}/yr
Sales Velocity: $${results.salesVelocity.toLocaleString()}/day
CAC Reduction: ${results.cacReduction}%
Payback Period: ${results.paybackPeriodMonths} months`;
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard!", description: "Results summary copied." });
  };

  return (
    <div className="space-y-4">
      {/* ROI Hero */}
      <div className="glass-card p-6 text-center glow-border">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Projected ROI</p>
        <div className="glow-text text-6xl font-black tracking-tight animate-pulse-glow">
          <AnimatedCounter value={results.roi} suffix="%" />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          ${results.totalGain.toLocaleString()} gain on ${results.totalInvestment.toLocaleString()} investment
        </p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 gap-3">
        <MetricCard
          icon={DollarSign}
          label="Revenue Surplus"
          value={results.revenueSurplus}
          prefix="$"
          suffix="/mo"
          sub={`$${results.nurturedRevenue.toLocaleString()} vs $${results.baselineRevenue.toLocaleString()}`}
        />
        <MetricCard
          icon={Zap}
          label="Sales Velocity"
          value={results.salesVelocity}
          prefix="$"
          suffix="/day"
          sub={`${Math.round(((results.salesVelocity - results.salesVelocityBaseline) / (results.salesVelocityBaseline || 1)) * 100)}% faster`}
        />
        <MetricCard
          icon={Clock}
          label="Annual Time Savings"
          value={results.annualTimeSavings}
          prefix="$"
          sub="Reclaimed labor value"
        />
        <MetricCard
          icon={TrendingUp}
          label="Payback Period"
          value={results.paybackPeriodMonths}
          suffix=" mo"
          sub={`CAC reduced ${results.cacReduction}%`}
        />
      </div>

      <Button onClick={copyResults} variant="outline" className="w-full border-primary/20 hover:bg-primary/10 hover:text-primary">
        <Copy className="h-4 w-4 mr-2" /> Copy Summary
      </Button>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, prefix = "", suffix = "", sub }: {
  icon: React.ElementType;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  sub?: string;
}) {
  return (
    <div className="glass-card p-4 space-y-1">
      <div className="flex items-center gap-1.5">
        <Icon className="h-3.5 w-3.5 text-primary" />
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
      </div>
      <div className="text-xl font-bold">
        <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
      </div>
      {sub && <p className="text-[10px] text-muted-foreground">{sub}</p>}
    </div>
  );
}
