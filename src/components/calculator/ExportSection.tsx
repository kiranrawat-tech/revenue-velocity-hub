import { CalculatorInputs, CalculatorResults } from "@/lib/calculations";
import { Download, FileJson, FileSpreadsheet, Mail, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { exportAsJSON, exportAsCSV } from "@/lib/integrations";

interface ExportSectionProps {
    inputs: CalculatorInputs;
    results: CalculatorResults;
}

export function ExportSection({ inputs, results }: ExportSectionProps) {
    const { toast } = useToast();

    const downloadFile = (content: string, filename: string, type: string) => {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleExportJSON = () => {
        const json = exportAsJSON(inputs, results);
        downloadFile(json, `roi-calculator-results-${Date.now()}.json`, "application/json");
        toast({ title: "Exported!", description: "Downloaded as JSON file." });
    };

    const handleExportCSV = () => {
        const csv = exportAsCSV(inputs, results);
        downloadFile(csv, `roi-calculator-results-${Date.now()}.csv`, "text/csv");
        toast({ title: "Exported!", description: "Downloaded as CSV file." });
    };

    const handlePrint = () => {
        window.print();
        toast({ title: "Print dialog opened", description: "Save as PDF from print options." });
    };

    const handleShareURL = () => {
        const params = new URLSearchParams({
            revenue: inputs.targetMonthlyRevenue.toString(),
            dealSize: inputs.averageDealSize.toString(),
            leads: inputs.currentLeads.toString(),
            convRate: inputs.standardConversionRate.toString(),
            lift: inputs.conversionRateLift.toString(),
        });
        const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
        navigator.clipboard.writeText(url);
        toast({
            title: "Link copied!",
            description: "Share this URL to load the same inputs.",
        });
    };

    const handleEmailResults = () => {
        const subject = encodeURIComponent("Lead Nurturing ROI Calculator Results");
        const body = encodeURIComponent(`
My Lead Nurturing ROI Analysis:

📊 Projected ROI: ${results.roi}%
💰 Monthly Revenue Surplus: $${results.revenueSurplus.toLocaleString()}
⚡ Sales Velocity: $${results.salesVelocity.toLocaleString()}/day
🎯 Lead Score: ${results.leadScore}/100
📈 3-Year Projection: $${results.threeYearProjection.toLocaleString()}

View full details: ${window.location.href}
    `.trim());

        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    };

    return (
        <div className="glass-card p-4">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Share2 className="h-4 w-4 text-primary" />
                Export & Share
            </h3>
            <div className="grid grid-cols-2 gap-2">
                <Button
                    onClick={handleExportJSON}
                    variant="outline"
                    size="sm"
                    className="text-xs h-8 gap-1.5"
                >
                    <FileJson className="h-3.5 w-3.5" />
                    JSON
                </Button>
                <Button
                    onClick={handleExportCSV}
                    variant="outline"
                    size="sm"
                    className="text-xs h-8 gap-1.5"
                >
                    <FileSpreadsheet className="h-3.5 w-3.5" />
                    CSV
                </Button>
                <Button
                    onClick={handlePrint}
                    variant="outline"
                    size="sm"
                    className="text-xs h-8 gap-1.5"
                >
                    <Download className="h-3.5 w-3.5" />
                    PDF
                </Button>
                <Button
                    onClick={handleShareURL}
                    variant="outline"
                    size="sm"
                    className="text-xs h-8 gap-1.5"
                >
                    <Share2 className="h-3.5 w-3.5" />
                    Link
                </Button>
            </div>
            <Button
                onClick={handleEmailResults}
                variant="outline"
                size="sm"
                className="w-full mt-2 text-xs h-8 gap-1.5"
            >
                <Mail className="h-3.5 w-3.5" />
                Email Results
            </Button>
        </div>
    );
}
