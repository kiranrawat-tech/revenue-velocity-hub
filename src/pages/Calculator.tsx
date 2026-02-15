import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { InputSection } from "@/components/calculator/InputSection";
import { ResultsPanel } from "@/components/calculator/ResultsPanel";
import { defaultInputs, calculate, CalculatorInputs } from "@/lib/calculations";

export default function Calculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>(defaultInputs);
  const results = useMemo(() => calculate(inputs), [inputs]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Lead Nurturing ROI Calculator</h1>
          <p className="text-muted-foreground text-sm mt-1">Quantify the financial impact of your lead nurturing strategy</p>
        </div>
        <div className="grid lg:grid-cols-[1fr_400px] gap-6">
          <InputSection inputs={inputs} onChange={setInputs} />
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ResultsPanel results={results} />
          </div>
        </div>
      </main>
    </div>
  );
}
