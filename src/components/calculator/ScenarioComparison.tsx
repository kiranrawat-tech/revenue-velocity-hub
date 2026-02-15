import { useState } from "react";
import { CalculatorInputs, calculate, CalculatorResults } from "@/lib/calculations";
import { Button } from "@/components/ui/button";
import { Save, Trash2, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface SavedScenario {
    name: string;
    inputs: CalculatorInputs;
    results: CalculatorResults;
}

interface ScenarioComparisonProps {
    currentInputs: CalculatorInputs;
    currentResults: CalculatorResults;
}

export function ScenarioComparison({ currentInputs, currentResults }: ScenarioComparisonProps) {
    const [scenarios, setScenarios] = useState<SavedScenario[]>([]);
    const { toast } = useToast();

    const saveScenario = (name: string) => {
        if (scenarios.length >= 3) {
            toast({
                title: "Maximum scenarios reached",
                description: "Delete a scenario to save a new one.",
                variant: "destructive",
            });
            return;
        }

        const newScenario: SavedScenario = {
            name,
            inputs: { ...currentInputs },
            results: { ...currentResults },
        };

        setScenarios([...scenarios, newScenario]);
        toast({ title: "Scenario saved!", description: `"${name}" has been saved.` });
    };

    const deleteScenario = (index: number) => {
        const updated = scenarios.filter((_, i) => i !== index);
        setScenarios(updated);
        toast({ title: "Scenario deleted" });
    };

    const loadTemplate = (type: "best" | "worst" | "realistic") => {
        const templates: Record<string, Partial<CalculatorInputs>> = {
            best: {
                conversionRateLift: 50,
                salesCycleReduction: 30,
                aovIncrease: 40,
                hoursSavedPerMonth: 60,
            },
            realistic: {
                conversionRateLift: 30,
                salesCycleReduction: 20,
                aovIncrease: 20,
                hoursSavedPerMonth: 40,
            },
            worst: {
                conversionRateLift: 15,
                salesCycleReduction: 10,
                aovIncrease: 10,
                hoursSavedPerMonth: 20,
            },
        };

        const template = templates[type];
        const inputs = { ...currentInputs, ...template };
        const results = calculate(inputs);
        const name = `${type.charAt(0).toUpperCase() + type.slice(1)} Case`;

        if (scenarios.length >= 3) {
            toast({
                title: "Maximum scenarios reached",
                description: "Delete a scenario first.",
                variant: "destructive",
            });
            return;
        }

        setScenarios([...scenarios, { name, inputs, results }]);
        toast({ title: `${name} loaded!` });
    };

    if (scenarios.length === 0) {
        return (
            <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-4">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    <h3 className="text-sm font-semibold">Scenario Comparison</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                    Save different scenarios to compare their ROI side-by-side.
                </p>
                <div className="grid grid-cols-3 gap-2 mb-3">
                    <Button onClick={() => loadTemplate("best")} variant="outline" size="sm" className="text-xs h-8">
                        Best Case
                    </Button>
                    <Button onClick={() => loadTemplate("realistic")} variant="outline" size="sm" className="text-xs h-8">
                        Realistic
                    </Button>
                    <Button onClick={() => loadTemplate("worst")} variant="outline" size="sm" className="text-xs h-8">
                        Worst Case
                    </Button>
                </div>
                <Button
                    onClick={() => saveScenario("Current Scenario")}
                    variant="default"
                    size="sm"
                    className="w-full text-xs h-8"
                >
                    <Save className="h-3.5 w-3.5 mr-1.5" />
                    Save Current
                </Button>
            </div>
        );
    }

    return (
        <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    <h3 className="text-sm font-semibold">Scenario Comparison</h3>
                </div>
                <Button
                    onClick={() => saveScenario(`Scenario ${scenarios.length + 1}`)}
                    variant="outline"
                    size="sm"
                    className="text-xs h-7"
                    disabled={scenarios.length >= 3}
                >
                    <Save className="h-3 w-3 mr-1" />
                    Save
                </Button>
            </div>

            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-xs">Metric</TableHead>
                            {scenarios.map((scenario, idx) => (
                                <TableHead key={idx} className="text-xs text-center">
                                    {scenario.name}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="text-xs font-medium">ROI</TableCell>
                            {scenarios.map((scenario, idx) => (
                                <TableCell key={idx} className="text-xs text-center font-semibold text-primary">
                                    {scenario.results.roi}%
                                </TableCell>
                            ))}
                        </TableRow>
                        <TableRow>
                            <TableCell className="text-xs">Revenue Surplus</TableCell>
                            {scenarios.map((scenario, idx) => (
                                <TableCell key={idx} className="text-xs text-center">
                                    ${scenario.results.revenueSurplus.toLocaleString()}
                                </TableCell>
                            ))}
                        </TableRow>
                        <TableRow>
                            <TableCell className="text-xs">Lead Score</TableCell>
                            {scenarios.map((scenario, idx) => (
                                <TableCell key={idx} className="text-xs text-center">
                                    {scenario.results.leadScore}
                                </TableCell>
                            ))}
                        </TableRow>
                        <TableRow>
                            <TableCell className="text-xs">Payback Period</TableCell>
                            {scenarios.map((scenario, idx) => (
                                <TableCell key={idx} className="text-xs text-center">
                                    {scenario.results.paybackPeriodMonths} mo
                                </TableCell>
                            ))}
                        </TableRow>
                        <TableRow>
                            <TableCell className="text-xs">Actions</TableCell>
                            {scenarios.map((_, idx) => (
                                <TableCell key={idx} className="text-center">
                                    <Button
                                        onClick={() => deleteScenario(idx)}
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 w-6 p-0"
                                    >
                                        <Trash2 className="h-3 w-3 text-destructive" />
                                    </Button>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableBody>
                </Table>
            </div>

            {scenarios.length < 3 && (
                <div className="grid grid-cols-3 gap-2 mt-4">
                    <Button onClick={() => loadTemplate("best")} variant="outline" size="sm" className="text-xs h-7">
                        + Best
                    </Button>
                    <Button onClick={() => loadTemplate("realistic")} variant="outline" size="sm" className="text-xs h-7">
                        + Realistic
                    </Button>
                    <Button onClick={() => loadTemplate("worst")} variant="outline" size="sm" className="text-xs h-7">
                        + Worst
                    </Button>
                </div>
            )}
        </div>
    );
}
