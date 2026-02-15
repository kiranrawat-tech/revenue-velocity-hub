import { Navbar } from "@/components/Navbar";
import { TrendingUp } from "lucide-react";

const benchmarks = [
  { source: "Organic Search (SEO)", rate: "51.0%", notes: "Highest intent; focus on educational content.", top: true },
  { source: "Email Marketing", rate: "46.0%", notes: "Highly efficient for secondary nurturing.", top: true },
  { source: "Paid Search (PPC)", rate: "26.0%", notes: "Requires immediate, automated follow-up.", top: false },
  { source: "Webinars", rate: "17.8–30.0%", notes: "Excellent for mid-funnel education.", top: false },
  { source: "Lead Lists", rate: "2.5%", notes: "Low intent; requires extensive cold-to-warm nurturing.", top: false },
  { source: "Cold Email", rate: "0.2–2.0%", notes: "Strategic shift required to intent-driven nurturing.", top: false },
];

export default function Benchmarks() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container py-8 max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight mb-1">Industry Benchmarks</h1>
        <p className="text-muted-foreground text-sm mb-8">Conversion rates by lead source — compare your inputs against industry standards</p>

        <div className="space-y-4">
          {benchmarks.map((b) => (
            <div key={b.source} className={`glass-card-hover p-5 flex flex-col sm:flex-row sm:items-center gap-4 ${b.top ? "border-primary/25" : ""}`}>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm">{b.source}</h3>
                  {b.top && (
                    <span className="flex items-center gap-1 text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      <TrendingUp className="h-3 w-3" /> Top Performer
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{b.notes}</p>
              </div>
              <div className={`text-2xl font-black tracking-tight whitespace-nowrap ${b.top ? "glow-text" : "text-foreground"}`}>
                {b.rate}
              </div>
            </div>
          ))}
        </div>

        <div className="glass-card p-6 mt-8">
          <h3 className="font-semibold text-sm mb-3">How to Use These Benchmarks</h3>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li>• Compare your current conversion rate against the channel-specific benchmark above</li>
            <li>• If your rate is below the benchmark, increase the "Conversion Rate Lift" input in the calculator</li>
            <li>• Focus nurturing efforts on channels with the highest ROI potential for your business</li>
            <li>• Organic and Email consistently outperform paid channels for MQL-to-SQL conversion</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
