import { useState, useMemo, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { InputSection } from "@/components/calculator/InputSection";
import { ResultsPanel } from "@/components/calculator/ResultsPanel";
import { InsightsPanel } from "@/components/calculator/InsightsPanel";
import { ExportSection } from "@/components/calculator/ExportSection";
import { ScenarioComparison } from "@/components/calculator/ScenarioComparison";
import { defaultInputs, calculate, CalculatorInputs } from "@/lib/calculations";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

export default function Calculator() {
  // Load from URL params or localStorage, fallback to defaults
  const [inputs, setInputs] = useState<CalculatorInputs>(() => {
    // Check URL params first
    const params = new URLSearchParams(window.location.search);
    if (params.has('revenue')) {
      return {
        ...defaultInputs,
        targetMonthlyRevenue: Number(params.get('revenue')) || defaultInputs.targetMonthlyRevenue,
        averageDealSize: Number(params.get('dealSize')) || defaultInputs.averageDealSize,
        currentLeads: Number(params.get('leads')) || defaultInputs.currentLeads,
        standardConversionRate: Number(params.get('convRate')) || defaultInputs.standardConversionRate,
        conversionRateLift: Number(params.get('lift')) || defaultInputs.conversionRateLift,
      };
    }

    // Check localStorage
    const stored = localStorage.getItem('roi_calculator_inputs');
    return stored ? JSON.parse(stored) : defaultInputs;
  });

  const results = useMemo(() => calculate(inputs), [inputs]);

  // Save to localStorage whenever inputs change
  useEffect(() => {
    localStorage.setItem('roi_calculator_inputs', JSON.stringify(inputs));
  }, [inputs]);

  const handleReset = () => {
    setInputs(defaultInputs);
    localStorage.removeItem('roi_calculator_inputs');
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container py-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Lead Nurturing ROI Calculator</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Quantify the financial impact of your lead nurturing strategy
            </p>
          </div>
          <Button onClick={handleReset} variant="outline" size="sm" className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-6 mb-6">
          <InputSection inputs={inputs} onChange={setInputs} />
          <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <ResultsPanel results={results} />
            <InsightsPanel results={results} />
            <ExportSection inputs={inputs} results={results} />
          </div>
        </div>

        <ScenarioComparison currentInputs={inputs} currentResults={results} />
      </main>
    </div>
  );
}
