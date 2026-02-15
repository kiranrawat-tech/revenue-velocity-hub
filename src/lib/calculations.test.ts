import { describe, it, expect } from 'vitest';
import { calculate, defaultInputs, type CalculatorInputs } from './calculations';

describe('ROI Calculations', () => {
    describe('calculate function', () => {
        it('should calculate correct ROI with default inputs', () => {
            const results = calculate(defaultInputs);

            expect(results.roi).toBeGreaterThan(0);
            expect(results.baselineRevenue).toBeDefined();
            expect(results.nurturedRevenue).toBeGreaterThan(results.baselineRevenue);
            expect(results.revenueSurplus).toBe(results.nurturedRevenue - results.baselineRevenue);
        });

        it('should handle zero conversion rate', () => {
            const inputs: CalculatorInputs = {
                ...defaultInputs,
                standardConversionRate: 0
            };

            const results = calculate(inputs);

            expect(results.roi).toBe(0);
            expect(results.baselineRevenue).toBe(0);
        });

        it('should calculate lead score correctly', () => {
            const results = calculate(defaultInputs);

            expect(results.leadScore).toBeGreaterThanOrEqual(1);
            expect(results.leadScore).toBeLessThanOrEqual(100);
        });

        it('should calculate confidence score correctly', () => {
            const results = calculate(defaultInputs);

            expect(results.confidenceScore).toBeGreaterThanOrEqual(1);
            expect(results.confidenceScore).toBeLessThanOrEqual(100);
        });

        it('should calculate break-even month', () => {
            const results = calculate(defaultInputs);

            expect(results.breakEvenMonth).toBeGreaterThan(0);
            expect(Number.isFinite(results.breakEvenMonth)).toBe(true);
        });

        it('should calculate lifetime value', () => {
            const results = calculate(defaultInputs);

            expect(results.lifetimeValue).toBeGreaterThan(0);
        });

        it('should generate insights array', () => {
            const results = calculate(defaultInputs);

            expect(Array.isArray(results.insights)).toBe(true);
            expect(results.insights.length).toBeGreaterThan(0);
            expect(results.insights.length).toBeLessThanOrEqual(7);
        });

        it('should calculate channel breakdown', () => {
            const results = calculate(defaultInputs);

            expect(Array.isArray(results.channelBreakdown)).toBe(true);
            expect(results.channelBreakdown.length).toBe(6);

            // Check all channels are present
            const channels = results.channelBreakdown.map(c => c.channel);
            expect(channels).toContain('Organic Search');
            expect(channels).toContain('Email Marketing');
            expect(channels).toContain('Paid Ads');
        });

        it('should calculate sales velocity improvement', () => {
            const results = calculate(defaultInputs);

            expect(results.salesVelocity).toBeGreaterThan(results.salesVelocityBaseline);
        });

        it('should calculate 3-year projection', () => {
            const results = calculate(defaultInputs);

            expect(results.threeYearProjection).toBeGreaterThan(results.nurturedRevenue * 12);
        });

        it('should generate monthly projections', () => {
            const results = calculate(defaultInputs);

            expect(Array.isArray(results.monthlyProjections)).toBe(true);
            expect(results.monthlyProjections.length).toBe(12);

            results.monthlyProjections.forEach((projection, index) => {
                expect(projection.month).toBe(index + 1);
                expect(projection.baseline).toBeGreaterThanOrEqual(0);
                expect(projection.nurtured).toBeGreaterThanOrEqual(projection.baseline);
            });
        });

        it('should calculate payback period', () => {
            const results = calculate(defaultInputs);

            expect(results.paybackPeriodMonths).toBeGreaterThan(0);
            expect(Number.isFinite(results.paybackPeriodMonths)).toBe(true);
        });

        it('should handle high conversion lift', () => {
            const inputs: CalculatorInputs = {
                ...defaultInputs,
                conversionRateLift: 100 // 100% lift
            };

            const results = calculate(inputs);

            expect(results.nurturedRevenue).toBeGreaterThan(results.baselineRevenue * 1.5);
        });

        it('should handle zero investment scenario', () => {
            const inputs: CalculatorInputs = {
                ...defaultInputs,
                platformFees: 0,
                contentCreationCosts: 0,
                setupCosts: 0,
                trainingHours: 0,
                hoursSavedPerMonth: 0
            };

            const results = calculate(inputs);

            expect(results.totalInvestment).toBe(0);
        });

        it('should calculate CAC reduction', () => {
            const results = calculate(defaultInputs);

            expect(results.cacReduction).toBeGreaterThanOrEqual(0);
        });
    });

    describe('Edge cases', () => {
        it('should handle negative inputs gracefully', () => {
            const inputs: CalculatorInputs = {
                ...defaultInputs,
                targetMonthlyRevenue: -1000
            };

            const results = calculate(inputs);

            expect(Number.isNaN(results.roi)).toBe(false);
        });

        it('should handle very large numbers', () => {
            const inputs: CalculatorInputs = {
                ...defaultInputs,
                targetMonthlyRevenue: 10000000,
                currentLeads: 100000
            };

            const results = calculate(inputs);

            expect(Number.isFinite(results.roi)).toBe(true);
        });

        it('should handle zero leads scenario', () => {
            const inputs: CalculatorInputs = {
                ...defaultInputs,
                currentLeads: 0
            };

            const results = calculate(inputs);

            expect(results.baselineRevenue).toBe(0);
        });
    });

    describe('Insights generation', () => {
        it('should include ROI insight for high ROI', () => {
            const inputs: CalculatorInputs = {
                ...defaultInputs,
                conversionRateLift: 50
            };

            const results = calculate(inputs);
            const hasROIInsight = results.insights.some(insight =>
                insight.includes('ROI') || insight.includes('Exceptional')
            );

            expect(hasROIInsight).toBe(true);
        });

        it('should include conversion rate insight for low conversion', () => {
            const inputs: CalculatorInputs = {
                ...defaultInputs,
                standardConversionRate: 1
            };

            const results = calculate(inputs);
            const hasConversionInsight = results.insights.some(insight =>
                insight.toLowerCase().includes('conversion')
            );

            expect(hasConversionInsight).toBe(true);
        });

        it('should include payback period insight for fast payback', () => {
            const inputs: CalculatorInputs = {
                ...defaultInputs,
                setupCosts: 500,
                platformFees: 100
            };

            const results = calculate(inputs);

            if (results.paybackPeriodMonths < 6) {
                const hasPaybackInsight = results.insights.some(insight =>
                    insight.toLowerCase().includes('payback')
                );
                expect(hasPaybackInsight).toBe(true);
            }
        });
    });
});
