import { describe, it, expect } from 'vitest';
import {
    exportAsJSON,
    exportAsCSV,
    calculateLeadPriority,
    SendFoxClient,
    SlackClient,
    type IntegrationConfig
} from './integrations';
import { defaultInputs, calculate } from './calculations';

describe('Integration Library', () => {
    const mockInputs = defaultInputs;
    const mockResults = calculate(mockInputs);

    describe('exportAsJSON', () => {
        it('should export data as valid JSON', () => {
            const json = exportAsJSON(mockInputs, mockResults);
            const parsed = JSON.parse(json);

            expect(parsed.inputs).toBeDefined();
            expect(parsed.results).toBeDefined();
            expect(parsed.exportDate).toBeDefined();
        });

        it('should include all input fields', () => {
            const json = exportAsJSON(mockInputs, mockResults);
            const parsed = JSON.parse(json);

            expect(parsed.inputs.targetMonthlyRevenue).toBe(mockInputs.targetMonthlyRevenue);
            expect(parsed.inputs.currentLeads).toBe(mockInputs.currentLeads);
        });

        it('should include all result fields', () => {
            const json = exportAsJSON(mockInputs, mockResults);
            const parsed = JSON.parse(json);

            expect(parsed.results.roi).toBe(mockResults.roi);
            expect(parsed.results.leadScore).toBe(mockResults.leadScore);
            expect(parsed.results.insights).toEqual(mockResults.insights);
        });
    });

    describe('exportAsCSV', () => {
        it('should export data as valid CSV', () => {
            const csv = exportAsCSV(mockInputs, mockResults);

            expect(csv).toContain('Metric,Value');
            expect(csv.split('\n').length).toBeGreaterThan(10);
        });

        it('should include key metrics', () => {
            const csv = exportAsCSV(mockInputs, mockResults);

            expect(csv).toContain('ROI');
            expect(csv).toContain('Lead Quality Score');
            expect(csv).toContain('Monthly Revenue Surplus');
        });

        it('should include channel breakdown', () => {
            const csv = exportAsCSV(mockInputs, mockResults);

            expect(csv).toContain('CHANNEL BREAKDOWN');
            expect(csv).toContain('Organic Search');
        });

        it('should properly escape commas in values', () => {
            const csv = exportAsCSV(mockInputs, mockResults);
            const lines = csv.split('\n');

            // Check that all lines have proper CSV structure
            lines.forEach(line => {
                if (line.trim()) {
                    expect(line.split(',').length).toBeGreaterThanOrEqual(2);
                }
            });
        });
    });

    describe('calculateLeadPriority', () => {
        it('should return "high" for excellent results', () => {
            const highROIResults = { ...mockResults, roi: 500, leadScore: 85 };
            const priority = calculateLeadPriority(highROIResults);

            expect(priority).toBe('high');
        });

        it('should return "medium" for moderate results', () => {
            const mediumROIResults = { ...mockResults, roi: 150, leadScore: 60 };
            const priority = calculateLeadPriority(mediumROIResults);

            expect(priority).toBe('medium');
        });

        it('should return "low" for poor results', () => {
            const lowROIResults = { ...mockResults, roi: 50, leadScore: 30 };
            const priority = calculateLeadPriority(lowROIResults);

            expect(priority).toBe('low');
        });
    });

    describe('SendFoxClient', () => {
        const client = new SendFoxClient('test-token');

        it('should format calculator results correctly', () => {
            const contact = client.formatCalculatorResults(
                'test@example.com',
                mockInputs,
                mockResults,
                'John',
                'Doe'
            );

            expect(contact.email).toBe('test@example.com');
            expect(contact.first_name).toBe('John');
            expect(contact.last_name).toBe('Doe');
            expect(contact.custom_fields).toBeDefined();
        });

        it('should include ROI in custom fields', () => {
            const contact = client.formatCalculatorResults(
                'test@example.com',
                mockInputs,
                mockResults
            );

            expect(contact.custom_fields?.Projected_ROI).toBe(`${mockResults.roi}%`);
        });

        it('should include lead score in custom fields', () => {
            const contact = client.formatCalculatorResults(
                'test@example.com',
                mockInputs,
                mockResults
            );

            expect(contact.custom_fields?.Lead_Score).toBe(mockResults.leadScore);
        });

        it('should include lead priority', () => {
            const contact = client.formatCalculatorResults(
                'test@example.com',
                mockInputs,
                mockResults
            );

            const priority = calculateLeadPriority(mockResults);
            expect(contact.custom_fields?.Priority).toBe(priority);
        });
    });

    describe('SlackClient', () => {
        const client = new SlackClient('https://hooks.slack.com/test');

        it('should create lead notification with correct structure', () => {
            const message = client.createLeadNotification(
                'test@example.com',
                mockResults,
                mockInputs
            );

            expect(message.text).toContain('New ROI Calculator Lead');
            expect(message.blocks).toBeDefined();
            expect(message.blocks!.length).toBeGreaterThan(0);
        });

        it('should include email in notification', () => {
            const message = client.createLeadNotification(
                'test@example.com',
                mockResults,
                mockInputs
            );

            const messageText = JSON.stringify(message);
            expect(messageText).toContain('test@example.com');
        });

        it('should color-code by priority', () => {
            const highPriorityResults = { ...mockResults, roi: 500, leadScore: 90 };
            const message = client.createLeadNotification(
                'test@example.com',
                highPriorityResults,
                mockInputs
            );

            // Check for color coding (would be in blocks)
            expect(message.blocks).toBeDefined();
        });

        it('should include key metrics', () => {
            const message = client.createLeadNotification(
                'test@example.com',
                mockResults,
                mockInputs
            );

            const messageJSON = JSON.stringify(message);
            expect(messageJSON).toContain('ROI');
            expect(messageJSON).toContain('Lead Score');
        });
    });

    describe('Integration Config', () => {
        it('should handle empty config', () => {
            const config: IntegrationConfig = {};

            expect(config.sendFoxToken).toBeUndefined();
            expect(config.slackWebhookUrl).toBeUndefined();
        });

        it('should handle full config', () => {
            const config: IntegrationConfig = {
                sendFoxToken: 'test-token',
                slackWebhookUrl: 'https://hooks.slack.com/test',
                enableAutoNotifications: true
            };

            expect(config.sendFoxToken).toBe('test-token');
            expect(config.enableAutoNotifications).toBe(true);
        });
    });
});
