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

export interface ChannelROI {
  channel: string;
  conversionRate: number;
  leads: number;
  revenue: number;
  roi: number;
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
  leadScore: number;
  confidenceScore: number;
  breakEvenMonth: number;
  lifetimeValue: number;
  threeYearProjection: number;
  channelBreakdown: ChannelROI[];
  insights: string[];
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

/**
 * Calculate lead quality score (1-100) based on inputs
 */
function calculateLeadScore(inputs: CalculatorInputs): number {
  let score = 50; // Base score

  // Higher conversion rate = better leads
  if (inputs.standardConversionRate > 5) score += 15;
  else if (inputs.standardConversionRate > 3) score += 10;
  else if (inputs.standardConversionRate < 2) score -= 10;

  // Higher deal size = better leads
  if (inputs.averageDealSize > 10000) score += 15;
  else if (inputs.averageDealSize > 5000) score += 10;
  else if (inputs.averageDealSize < 2000) score -= 10;

  // Nurturing lift potential
  if (inputs.conversionRateLift > 40) score += 10;
  else if (inputs.conversionRateLift > 25) score += 5;

  // Sales cycle efficiency
  if (inputs.salesCycleReduction > 25) score += 10;
  else if (inputs.salesCycleReduction > 15) score += 5;

  return Math.max(1, Math.min(100, score));
}

/**
 * Calculate confidence score for the ROI projection (1-100)
 */
function calculateConfidenceScore(inputs: CalculatorInputs): number {
  let confidence = 70; // Base confidence

  // Realistic conversion rates increase confidence
  if (inputs.standardConversionRate >= 2 && inputs.standardConversionRate <= 10) confidence += 10;
  else confidence -= 15;

  // Moderate nurturing lift is more believable
  if (inputs.conversionRateLift <= 50) confidence += 10;
  else if (inputs.conversionRateLift > 100) confidence -= 20;

  // Reasonable AOV increase
  if (inputs.aovIncrease <= 50) confidence += 5;
  else confidence -= 10;

  // Sufficient lead volume
  if (inputs.currentLeads >= 100) confidence += 5;
  else if (inputs.currentLeads < 50) confidence -= 10;

  return Math.max(1, Math.min(100, confidence));
}

/**
 * Generate actionable insights based on calculations
 */
function generateInsights(inputs: CalculatorInputs, results: Partial<CalculatorResults>): string[] {
  const insights: string[] = [];

  // ROI insights
  if ((results.roi ?? 0) > 300) {
    insights.push("🚀 Exceptional ROI! Your nurturing strategy has massive potential.");
  } else if ((results.roi ?? 0) > 150) {
    insights.push("✅ Strong ROI. Your nurturing program is well-positioned for success.");
  } else if ((results.roi ?? 0) > 50) {
    insights.push("💡 Positive ROI. Consider optimizing conversion lift for better results.");
  } else if ((results.roi ?? 0) > 0) {
    insights.push("⚠️ Low ROI. Review your costs or increase conversion rate lift.");
  } else {
    insights.push("❌ Negative ROI. Investment costs exceed gains. Reassess strategy.");
  }

  // Conversion rate insights
  if (inputs.standardConversionRate < 3) {
    insights.push("📊 Your baseline conversion rate is below average (3-5%). Lead nurturing can help!");
  } else if (inputs.standardConversionRate > 8) {
    insights.push("🎯 Your conversion rate is excellent! Nurturing will amplify these results.");
  }

  // Sales velocity insights
  if (inputs.salesCycleReduction > 20) {
    insights.push("⚡ Reducing sales cycle by " + inputs.salesCycleReduction + "% will significantly boost pipeline velocity.");
  }

  // Cost efficiency insights
  if (inputs.platformFees + inputs.contentCreationCosts > 5000) {
    insights.push("💰 Consider consolidating tools to reduce monthly platform costs.");
  }

  // Time savings insights
  if (inputs.hoursSavedPerMonth > 40) {
    insights.push("⏰ Automation is saving significant time - " + inputs.hoursSavedPerMonth + " hours/month!");
  }

  // Payback period insights
  if ((results.paybackPeriodMonths ?? 0) < 3) {
    insights.push("🎉 Fast payback period (" + results.paybackPeriodMonths + " months)! Quick ROI realization.");
  } else if ((results.paybackPeriodMonths ?? 0) > 12) {
    insights.push("⏳ Long payback period. Consider reducing setup costs or increasing conversion lift.");
  }

  return insights;
}

/**
 * Calculate channel-specific ROI breakdown
 */
function calculateChannelBreakdown(inputs: CalculatorInputs, avgDealSize: number): ChannelROI[] {
  const channels = [
    { name: "Organic Search (SEO)", rate: 51.0 },
    { name: "Email Marketing", rate: 46.0 },
    { name: "Paid Search (PPC)", rate: 26.0 },
    { name: "Webinars", rate: 23.0 },
    { name: "Social Media", rate: 12.0 },
    { name: "Lead Lists", rate: 2.5 },
  ];

  const leadsPerChannel = Math.floor(inputs.currentLeads / channels.length);
  const totalInvestment = inputs.platformFees * 12 + inputs.contentCreationCosts * 12;
  const investmentPerChannel = totalInvestment / channels.length;

  return channels.map(channel => {
    const conversionRate = channel.rate / 100;
    const revenue = leadsPerChannel * conversionRate * avgDealSize * 12; // Annual
    const roi = investmentPerChannel > 0 ? ((revenue - investmentPerChannel) / investmentPerChannel) * 100 : 0;

    return {
      channel: channel.name,
      conversionRate: channel.rate,
      leads: leadsPerChannel,
      revenue: Math.round(revenue),
      roi: Math.round(roi),
    };
  });
}

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

  // Break-even month calculation
  let cumulativeGain = 0;
  let breakEvenMonth = 1;
  for (let month = 1; month <= 36; month++) {
    const ramp = Math.min(1, month / 3);
    const monthlyGain = (revenueSurplus * ramp) + (annualTimeSavings / 12);
    const monthlyInvestment = platformFees + contentCreationCosts + (month === 1 ? setupCosts + trainingCost : 0);
    cumulativeGain += monthlyGain - monthlyInvestment;

    if (cumulativeGain >= 0 && breakEvenMonth === 1) {
      breakEvenMonth = month;
      break;
    }
  }
  if (cumulativeGain < 0) breakEvenMonth = 99;

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

  // Calculate new metrics
  const leadScore = calculateLeadScore(inputs);
  const confidenceScore = calculateConfidenceScore(inputs);

  // Lifetime value calculation (3-year projection with retention)
  const avgRetentionRate = 0.85; // 85% year-over-year retention
  const year1 = nurturedRevenue * 12;
  const year2 = year1 * avgRetentionRate * 1.15; // 15% expansion
  const year3 = year2 * avgRetentionRate * 1.15;
  const lifetimeValue = Math.round((year1 + year2 + year3) / (currentLeads * nurturedRate || 1));
  const threeYearProjection = Math.round(year1 + year2 + year3);

  // Channel breakdown
  const channelBreakdown = calculateChannelBreakdown(inputs, nurturedAOV);

  // Partial results for insights generation
  const partialResults: Partial<CalculatorResults> = {
    roi: Math.round(roi),
    paybackPeriodMonths: Math.round(paybackPeriodMonths * 10) / 10,
  };

  const insights = generateInsights(inputs, partialResults);

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
    leadScore,
    confidenceScore,
    breakEvenMonth,
    lifetimeValue,
    threeYearProjection,
    channelBreakdown,
    insights,
  };
}
