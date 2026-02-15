import { CalculatorInputs } from "@/lib/calculations";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, HelpCircle, DollarSign, TrendingUp, Clock, Receipt } from "lucide-react";
import { useState } from "react";

interface InputSectionProps {
  inputs: CalculatorInputs;
  onChange: (inputs: CalculatorInputs) => void;
}

interface FieldConfig {
  key: keyof CalculatorInputs;
  label: string;
  tooltip: string;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
}

const groups: {
  title: string;
  icon: React.ElementType;
  fields: FieldConfig[];
}[] = [
    {
      title: "Financial Goals",
      icon: DollarSign,
      fields: [
        { key: "targetMonthlyRevenue", label: "Target Monthly Revenue", tooltip: "Your desired monthly revenue goal. Average B2B SaaS: $50K–$500K/mo.", prefix: "$" },
        { key: "averageDealSize", label: "Average Deal Size", tooltip: "Typical contract value. B2B SaaS average: $3K–$25K.", prefix: "$" },
        { key: "currentLeads", label: "Current Monthly Leads", tooltip: "Leads entering your funnel monthly. Median B2B: 200–1,000." },
        { key: "standardConversionRate", label: "Current Conversion Rate", tooltip: "Your baseline lead-to-customer rate. Industry avg: 2–5%.", suffix: "%", min: 0, max: 100, step: 0.5 },
        { key: "visitorToLeadRate", label: "Visitor-to-Lead Rate", tooltip: "Website visitors who become leads. Avg: 2–5%.", suffix: "%", min: 0, max: 100, step: 0.5 },
      ],
    },
    {
      title: "Nurturing Impact",
      icon: TrendingUp,
      fields: [
        { key: "conversionRateLift", label: "Conversion Rate Lift", tooltip: "Expected increase in conversion from nurturing. Typical: 20–50%.", suffix: "%", min: 0, max: 200 },
        { key: "salesCycleReduction", label: "Sales Cycle Reduction", tooltip: "How much nurturing shortens sales cycle. Typical: 15–30%.", suffix: "%", min: 0, max: 80 },
        { key: "aovIncrease", label: "AOV Increase", tooltip: "Nurtured leads buy 20–47% more on average.", suffix: "%", min: 0, max: 100 },
      ],
    },
    {
      title: "Efficiency Gains",
      icon: Clock,
      fields: [
        { key: "hoursSavedPerMonth", label: "Hours Saved / Month", tooltip: "Time saved through automation. Avg: 20–60 hrs/mo." },
        { key: "hourlyLaborRate", label: "Hourly Labor Rate", tooltip: "Fully-loaded cost per hour for marketing/sales staff.", prefix: "$" },
      ],
    },
    {
      title: "Costs (TCO)",
      icon: Receipt,
      fields: [
        { key: "platformFees", label: "Monthly Platform Fees", tooltip: "Nurturing software subscription costs.", prefix: "$" },
        { key: "contentCreationCosts", label: "Monthly Content Costs", tooltip: "Email copy, landing pages, design, etc.", prefix: "$" },
        { key: "setupCosts", label: "One-time Setup Costs", tooltip: "Migration, integrations, initial build.", prefix: "$" },
        { key: "trainingHours", label: "Training Hours", tooltip: "Hours needed to train team on new tools.", suffix: " hrs" },
      ],
    },
  ];

export function InputSection({ inputs, onChange }: InputSectionProps) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    "Financial Goals": true,
    "Nurturing Impact": true,
    "Efficiency Gains": true,
    "Costs (TCO)": true,
  });

  const handleChange = (key: keyof CalculatorInputs, value: string) => {
    const num = parseFloat(value) || 0;
    onChange({ ...inputs, [key]: num });
  };

  const toggleGroup = (title: string) => {
    setOpenGroups(prev => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <div className="space-y-3">
      {groups.map((group) => (
        <Collapsible
          key={group.title}
          open={openGroups[group.title]}
          onOpenChange={() => toggleGroup(group.title)}
        >
          <div className="glass-card p-3">
            <CollapsibleTrigger className="w-full group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-primary/15 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <group.icon className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm text-foreground">{group.title}</h3>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${openGroups[group.title] ? "transform rotate-180" : ""
                    }`}
                />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-2.5 mt-3 pt-3 border-t border-border/40">
                {group.fields.map((field) => (
                  <div key={field.key} className="space-y-1">
                    <div className="flex items-center gap-1">
                      <Label htmlFor={field.key} className="text-xs font-medium text-foreground/90">
                        {field.label}
                      </Label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button type="button" className="inline-flex">
                            <HelpCircle className="h-3 w-3 text-muted-foreground hover:text-foreground transition-colors" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs text-xs">
                          <p>{field.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="relative">
                      {field.prefix && (
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                          {field.prefix}
                        </span>
                      )}
                      <Input
                        id={field.key}
                        type="number"
                        value={inputs[field.key]}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        min={field.min}
                        max={field.max}
                        step={field.step || 1}
                        className={`h-8 text-xs transition-all hover:border-primary/40 focus:border-primary ${field.prefix ? "pl-6" : ""
                          } ${field.suffix ? "pr-10" : ""}`}
                      />
                      {field.suffix && (
                        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                          {field.suffix}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      ))}
    </div>
  );
}
