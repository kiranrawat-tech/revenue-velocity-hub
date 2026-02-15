import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { defaultInputs, calculate } from "@/lib/calculations";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend,
} from "recharts";
import { Users, Globe, Target, TrendingDown, Timer } from "lucide-react";

const COLORS = ["hsl(42, 87%, 58%)", "hsl(42, 60%, 40%)", "hsl(30, 70%, 50%)"];

export default function ResultsDashboard() {
  const results = useMemo(() => calculate(defaultInputs), []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container py-8">
        <h1 className="text-3xl font-bold tracking-tight mb-1">Results Dashboard</h1>
        <p className="text-muted-foreground text-sm mb-8">Visual analytics from your calculator inputs</p>

        {/* Summary cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <SummaryCard icon={Users} label="Customers Needed" value={results.customersNeeded} />
          <SummaryCard icon={Target} label="Leads Required" value={results.leadsRequired} />
          <SummaryCard icon={Globe} label="Visitors Needed" value={results.visitorsNeeded} />
          <SummaryCard icon={TrendingDown} label="CAC Reduction" value={results.cacReduction} suffix="%" />
          <SummaryCard icon={Timer} label="Payback Period" value={results.paybackPeriodMonths} suffix=" mo" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Bar chart */}
          <div className="glass-card p-6">
            <h3 className="text-sm font-semibold mb-4">Revenue Comparison</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={[{ name: "Monthly", Baseline: results.baselineRevenue, Nurtured: results.nurturedRevenue }]}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,12%,20%)" />
                <XAxis dataKey="name" stroke="hsl(220,10%,55%)" fontSize={12} />
                <YAxis stroke="hsl(220,10%,55%)" fontSize={12} tickFormatter={(v: number) => `$${(v/1000).toFixed(0)}K`} />
                <RechartsTooltip contentStyle={{ background: "hsl(240,20%,10%)", border: "1px solid hsl(42,30%,18%)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="Baseline" fill="hsl(240,12%,25%)" radius={[4,4,0,0]} />
                <Bar dataKey="Nurtured" fill="hsl(42,87%,58%)" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Donut chart */}
          <div className="glass-card p-6">
            <h3 className="text-sm font-semibold mb-4">ROI Breakdown</h3>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={results.roiBreakdown} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" paddingAngle={4} stroke="none">
                  {results.roiBreakdown.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12, color: "hsl(220,10%,55%)" }} />
                <RechartsTooltip contentStyle={{ background: "hsl(240,20%,10%)", border: "1px solid hsl(42,30%,18%)", borderRadius: 8, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Line chart — full width */}
          <div className="glass-card p-6 lg:col-span-2">
            <h3 className="text-sm font-semibold mb-4">12-Month Revenue Projection</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={results.monthlyProjections}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,12%,20%)" />
                <XAxis dataKey="month" stroke="hsl(220,10%,55%)" fontSize={12} tickFormatter={(v: number) => `M${v}`} />
                <YAxis stroke="hsl(220,10%,55%)" fontSize={12} tickFormatter={(v: number) => `$${(v/1000).toFixed(0)}K`} />
                <RechartsTooltip contentStyle={{ background: "hsl(240,20%,10%)", border: "1px solid hsl(42,30%,18%)", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="baseline" name="Without Nurturing" stroke="hsl(240,12%,35%)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="nurtured" name="With Nurturing" stroke="hsl(42,87%,58%)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Sales Velocity formula */}
          <div className="glass-card p-6 lg:col-span-2">
            <h3 className="text-sm font-semibold mb-4">Sales Velocity Formula</h3>
            <div className="flex flex-wrap items-center justify-center gap-2 text-lg font-mono">
              <span className="text-muted-foreground">V =</span>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2">
                  <VelocityVar label="Opportunities" value={defaultInputs.currentLeads} />
                  <span className="text-muted-foreground">×</span>
                  <VelocityVar label="Deal Size" value={`$${defaultInputs.averageDealSize.toLocaleString()}`} />
                  <span className="text-muted-foreground">×</span>
                  <VelocityVar label="Win Rate" value={`${(defaultInputs.standardConversionRate * (1 + defaultInputs.conversionRateLift / 100)).toFixed(1)}%`} />
                </div>
                <div className="w-full h-px bg-muted-foreground/30 my-1" />
                <VelocityVar label="Cycle Length" value={`${Math.round(45 * (1 - defaultInputs.salesCycleReduction / 100))} days`} />
              </div>
              <span className="text-muted-foreground">=</span>
              <span className="text-primary font-bold">${results.salesVelocity.toLocaleString()}/day</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function SummaryCard({ icon: Icon, label, value, suffix = "" }: { icon: React.ElementType; label: string; value: number; suffix?: string }) {
  return (
    <div className="glass-card p-4">
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className="h-3.5 w-3.5 text-primary" />
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
      </div>
      <div className="text-2xl font-bold">
        <AnimatedCounter value={value} suffix={suffix} />
      </div>
    </div>
  );
}

function VelocityVar({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="glass-card px-3 py-1.5 text-center">
      <div className="text-[10px] text-muted-foreground">{label}</div>
      <div className="text-sm font-semibold text-primary">{value}</div>
    </div>
  );
}
