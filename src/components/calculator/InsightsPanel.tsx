import { CalculatorResults } from "@/lib/calculations";
import { Lightbulb, AlertCircle, TrendingUp, Sparkles } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface InsightsPanelProps {
    results: CalculatorResults;
}

export function InsightsPanel({ results }: InsightsPanelProps) {
    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-green-500";
        if (score >= 60) return "text-yellow-500";
        return "text-orange-500";
    };

    const getScoreLabel = (score: number) => {
        if (score >= 80) return "Excellent";
        if (score >= 60) return "Good";
        if (score >= 40) return "Fair";
        return "Needs Improvement";
    };

    return (
        <div className="space-y-4">
            {/* Score Cards */}
            <div className="grid grid-cols-2 gap-3">
                <div className="glass-card p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground">Lead Quality</span>
                        <Sparkles className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div className={`text-2xl font-bold mb-1 ${getScoreColor(results.leadScore)}`}>
                        {results.leadScore}/100
                    </div>
                    <Progress value={results.leadScore} className="h-1.5 mb-1" />
                    <span className="text-[10px] text-muted-foreground">{getScoreLabel(results.leadScore)}</span>
                </div>

                <div className="glass-card p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground">Confidence</span>
                        <TrendingUp className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div className={`text-2xl font-bold mb-1 ${getScoreColor(results.confidenceScore)}`}>
                        {results.confidenceScore}%
                    </div>
                    <Progress value={results.confidenceScore} className="h-1.5 mb-1" />
                    <span className="text-[10px] text-muted-foreground">{getScoreLabel(results.confidenceScore)}</span>
                </div>
            </div>

            {/* Break-even indicator */}
            {results.breakEvenMonth < 99 && (
                <Alert className="border-primary/30 bg-primary/5">
                    <AlertCircle className="h-4 w-4 text-primary" />
                    <AlertTitle className="text-sm">Break-Even Analysis</AlertTitle>
                    <AlertDescription className="text-xs">
                        Your investment breaks even in <strong>{results.breakEvenMonth} months</strong>.
                        After that, it's pure profit!
                    </AlertDescription>
                </Alert>
            )}

            {/* Insights */}
            <div className="glass-card p-4">
                <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="h-4 w-4 text-primary" />
                    <h3 className="text-sm font-semibold">AI Insights</h3>
                    <Badge variant="outline" className="text-[10px] ml-auto">
                        {results.insights.length} insights
                    </Badge>
                </div>
                <div className="space-y-2">
                    {results.insights.map((insight, idx) => (
                        <div
                            key={idx}
                            className="text-xs text-muted-foreground bg-secondary/30 rounded-lg p-2.5 leading-relaxed"
                        >
                            {insight}
                        </div>
                    ))}
                </div>
            </div>

            {/* LTV Preview */}
            <div className="glass-card p-4">
                <h3 className="text-xs text-muted-foreground mb-2">Customer Lifetime Value</h3>
                <div className="text-xl font-bold text-primary mb-1">
                    ${results.lifetimeValue.toLocaleString()}
                </div>
                <p className="text-[10px] text-muted-foreground">
                    3-Year Projection: ${results.threeYearProjection.toLocaleString()}
                </p>
            </div>
        </div>
    );
}
