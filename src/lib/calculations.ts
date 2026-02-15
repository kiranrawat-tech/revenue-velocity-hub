export interface CalculatorInputs {
  // Financial Goals
  targetMonthlyRevenue: number;
  averageDealSize: number;
  currentLeads: number;
  standardConversionRate: number;
  visitorToLeadRate: number;

  // Nurturing Impact
  conversionRateLift: number;
  salesCycleReduction: number;
  aovIncrease: number;

  // Efficiency Gains
  hoursSavedPerMonth: number;
  hourlyLaborRate: number;

  // Costs (TCO)
  platformFees: number;
  contentCreationCosts: number;
  setupCosts: number;
  trainingHours: number;
}

export interface CalculatorResults {
  roi: number;
  baselineRevenue: number;
  nurturedRevenue: number;
  revenueSurplus: number;
  annualTimeSavings: number;
  totalInvestment: number;
  totalGain: number;
  salesVelocity: number;
  salesVelocityBaseline: number;
  customersNeeded: number;
  leadsRequired: number;
  visitorsNeeded: number;
  cacReduction: number;
  paybackPeriodMonths: number;
  monthlyProjections: { month: number; baseline: number; nurtured: number }[];
  roiBreakdown: { name: string; value: number }[];
}

export const defaultInputs: CalculatorInputs = {
  targetMonthlyRevenue: 100000,
  averageDealSize: 5000,
  currentLeads: 500,
  standardConversionRate: 5,
  visitorToLeadRate: 3,
  conversionRateLift: 40,
  salesCycleReduction: 25,
  aovIncrease: 20,
  hoursSavedPerMonth: 40,
  hourlyLaborRate: 50,
  platformFees: 500,
  contentCreationCosts: 2000,
  setupCosts: 5000,
  trainingHours: 20,
};

export function calculate(inputs: CalculatorInputs): CalculatorResults {
  const {
    targetMonthlyRevenue, averageDealSize, currentLeads, standardConversionRate, visitorToLeadRate,
    conversionRateLift, salesCycleReduction, aovIncrease,
    hoursSavedPerMonth, hourlyLaborRate,
    platformFees, contentCreationCosts, setupCosts, trainingHours,
  } = inputs;

  const stdRate = standardConversionRate / 100;
  const nurturedRate = stdRate * (1 + conversionRateLift / 100);
  const nurturedAOV = averageDealSize * (1 + aovIncrease / 100);

  const baselineRevenue = currentLeads * stdRate * averageDealSize;
  const nurturedRevenue = currentLeads * nurturedRate * nurturedAOV;
  const revenueSurplus = nurturedRevenue - baselineRevenue;

  const annualTimeSavings = hoursSavedPerMonth * hourlyLaborRate * 12;

  const annualPlatformCost = platformFees * 12;
  const annualContentCost = contentCreationCosts * 12;
  const trainingCost = trainingHours * hourlyLaborRate;
  const totalInvestment = annualPlatformCost + annualContentCost + setupCosts + trainingCost;

  const totalGain = revenueSurplus * 12 + annualTimeSavings;
  const roi = totalInvestment > 0 ? ((totalGain - totalInvestment) / totalInvestment) * 100 : 0;

  // Sales velocity
  const baseCycleLength = 45;
  const nurturedCycleLength = baseCycleLength * (1 - salesCycleReduction / 100);
  const salesVelocityBaseline = (currentLeads * averageDealSize * stdRate) / baseCycleLength;
  const salesVelocity = (currentLeads * nurturedAOV * nurturedRate) / nurturedCycleLength;

  // Reverse-engineer from target
  const customersNeeded = averageDealSize > 0 ? Math.ceil(targetMonthlyRevenue / averageDealSize) : 0;
  const leadsRequired = nurturedRate > 0 ? Math.ceil(customersNeeded / nurturedRate) : 0;
  const vtlRate = visitorToLeadRate / 100;
  const visitorsNeeded = vtlRate > 0 ? Math.ceil(leadsRequired / vtlRate) : 0;

  const cacReduction = conversionRateLift > 0 ? (conversionRateLift / (100 + conversionRateLift)) * 100 : 0;

  const monthlyNetGain = revenueSurplus + annualTimeSavings / 12;
  const monthlyCost = platformFees + contentCreationCosts;
  const paybackPeriodMonths = monthlyNetGain > monthlyCost
    ? (setupCosts + trainingCost) / (monthlyNetGain - monthlyCost)
    : 99;

  // 12-month projections with ramp-up
  const monthlyProjections = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const ramp = Math.min(1, month / 3);
    return {
      month,
      baseline: Math.round(baselineRevenue),
      nurtured: Math.round(baselineRevenue + revenueSurplus * ramp),
    };
  });

  const revenueGainShare = revenueSurplus * 12;
  const costSavingsShare = annualTimeSavings;
  const ltvShare = revenueSurplus * 12 * 0.3; // estimate 30% LTV uplift
  const total = revenueGainShare + costSavingsShare + ltvShare;

  const roiBreakdown = [
    { name: "Revenue Gain", value: total > 0 ? Math.round((revenueGainShare / total) * 100) : 40 },
    { name: "Cost Savings", value: total > 0 ? Math.round((costSavingsShare / total) * 100) : 30 },
    { name: "LTV Impact", value: total > 0 ? Math.round((ltvShare / total) * 100) : 30 },
  ];

  return {
    roi: Math.round(roi),
    baselineRevenue: Math.round(baselineRevenue),
    nurturedRevenue: Math.round(nurturedRevenue),
    revenueSurplus: Math.round(revenueSurplus),
    annualTimeSavings: Math.round(annualTimeSavings),
    totalInvestment: Math.round(totalInvestment),
    totalGain: Math.round(totalGain),
    salesVelocity: Math.round(salesVelocity),
    salesVelocityBaseline: Math.round(salesVelocityBaseline),
    customersNeeded,
    leadsRequired,
    visitorsNeeded,
    cacReduction: Math.round(cacReduction),
    paybackPeriodMonths: Math.round(paybackPeriodMonths * 10) / 10,
    monthlyProjections,
    roiBreakdown,
  };
}
