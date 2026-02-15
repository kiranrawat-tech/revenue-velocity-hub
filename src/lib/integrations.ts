import { CalculatorInputs, CalculatorResults } from "./calculations";

/**
 * Integration configuration interface
 */
export interface IntegrationConfig {
    sendFoxToken?: string;
    slackWebhookUrl?: string;
    enableAutoNotifications?: boolean;
}

/**
 * SendFox contact data structure
 */
export interface SendFoxContact {
    email: string;
    first_name?: string;
    last_name?: string;
    lists?: number[];
    contact_fields?: Array<{ name: string; value: string | number }>;
}

/**
 * Slack message block structure
 */
export interface SlackMessage {
    text: string;
    blocks: Array<{
        type: string;
        text?: { type: string; text: string };
        fields?: Array<{ type: string; text: string }>;
        elements?: Array<any>;
        accessory?: any;
    }>;
}

/**
 * Lead scoring and routing logic
 */
export function calculateLeadPriority(results: CalculatorResults): 'high' | 'medium' | 'low' {
    if (results.roi > 200 && results.leadScore > 70) return 'high';
    if (results.roi > 100 || results.leadScore > 60) return 'medium';
    return 'low';
}

/**
 * SendFox API Client
 */
export class SendFoxClient {
    private token: string;
    private baseUrl = 'https://api.sendfox.com';

    constructor(token: string) {
        this.token = token;
    }

    /**
     * Create or update a contact in SendFox
     */
    async createContact(contact: SendFoxContact): Promise<any> {
        const response = await fetch(`${this.baseUrl}/contacts`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contact),
        });

        if (!response.ok) {
            throw new Error(`SendFox API error: ${response.statusText}`);
        }

        return response.json();
    }

    /**
     * Format calculator results as SendFox contact fields
     */
    formatCalculatorResults(
        email: string,
        inputs: CalculatorInputs,
        results: CalculatorResults,
        firstName?: string,
        lastName?: string
    ): SendFoxContact {
        return {
            email,
            first_name: firstName,
            last_name: lastName,
            contact_fields: [
                { name: 'Projected_ROI', value: `${results.roi}%` },
                { name: 'Revenue_Surplus', value: `$${results.revenueSurplus.toLocaleString()}` },
                { name: 'Lead_Score', value: results.leadScore },
                { name: 'Confidence_Score', value: results.confidenceScore },
                { name: 'Payback_Period', value: `${results.paybackPeriodMonths} months` },
                { name: 'Current_Leads', value: inputs.currentLeads },
                { name: 'Avg_Deal_Size', value: `$${inputs.averageDealSize}` },
                { name: 'Priority', value: calculateLeadPriority(results) },
                { name: 'Sales_Velocity', value: `$${results.salesVelocity}/day` },
                { name: 'LTV', value: `$${results.lifetimeValue.toLocaleString()}` },
            ],
        };
    }
}

/**
 * Slack webhook client
 */
export class SlackClient {
    private webhookUrl: string;

    constructor(webhookUrl: string) {
        this.webhookUrl = webhookUrl;
    }

    /**
     * Send a message to Slack via webhook
     */
    async sendMessage(message: SlackMessage): Promise<void> {
        const response = await fetch(this.webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });

        if (!response.ok) {
            throw new Error(`Slack webhook error: ${response.statusText}`);
        }
    }

    /**
     * Format calculator results as Slack Block Kit message
     */
    createLeadNotification(
        email: string,
        results: CalculatorResults,
        inputs: CalculatorInputs
    ): SlackMessage {
        const priority = calculateLeadPriority(results);
        const priorityEmoji = priority === 'high' ? '🔥' : priority === 'medium' ? '⚡' : '📊';
        const priorityColor = priority === 'high' ? '#FF0000' : priority === 'medium' ? '#FFA500' : '#3AA3E3';

        return {
            text: `New High-Intent Lead: ${email}`,
            blocks: [
                {
                    type: 'header',
                    text: {
                        type: 'plain_text',
                        text: `${priorityEmoji} New Lead Alert - ${priority.toUpperCase()} Priority`,
                    },
                },
                {
                    type: 'section',
                    fields: [
                        {
                            type: 'mrkdwn',
                            text: `*Email:*\n${email}`,
                        },
                        {
                            type: 'mrkdwn',
                            text: `*Projected ROI:*\n${results.roi}%`,
                        },
                        {
                            type: 'mrkdwn',
                            text: `*Revenue Potential:*\n$${results.revenueSurplus.toLocaleString()}/mo`,
                        },
                        {
                            type: 'mrkdwn',
                            text: `*Lead Score:*\n${results.leadScore}/100`,
                        },
                        {
                            type: 'mrkdwn',
                            text: `*Current Leads:*\n${inputs.currentLeads.toLocaleString()}/mo`,
                        },
                        {
                            type: 'mrkdwn',
                            text: `*Avg Deal Size:*\n$${inputs.averageDealSize.toLocaleString()}`,
                        },
                        {
                            type: 'mrkdwn',
                            text: `*Confidence:*\n${results.confidenceScore}%`,
                        },
                        {
                            type: 'mrkdwn',
                            text: `*Payback Period:*\n${results.paybackPeriodMonths} months`,
                        },
                    ],
                },
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `*Top Insight:* ${results.insights[0] || 'No specific insights available'}`,
                    },
                },
                {
                    type: 'actions',
                    elements: [
                        {
                            type: 'button',
                            text: {
                                type: 'plain_text',
                                text: '👤 View Lead Details',
                            },
                            style: priority === 'high' ? 'primary' : 'default',
                            url: `mailto:${email}`,
                        },
                        {
                            type: 'button',
                            text: {
                                type: 'plain_text',
                                text: '📊 Open Calculator',
                            },
                            url: window.location.href,
                        },
                    ],
                },
            ],
        };
    }
}

/**
 * Export results as JSON
 */
export function exportAsJSON(
    inputs: CalculatorInputs,
    results: CalculatorResults
): string {
    const exportData = {
        timestamp: new Date().toISOString(),
        inputs,
        results,
        summary: {
            roi: `${results.roi}%`,
            monthlyRevenueSurplus: `$${results.revenueSurplus.toLocaleString()}`,
            paybackPeriod: `${results.paybackPeriodMonths} months`,
            leadScore: results.leadScore,
            confidenceScore: results.confidenceScore,
        },
    };

    return JSON.stringify(exportData, null, 2);
}

/**
 * Export results as CSV
 */
export function exportAsCSV(
    inputs: CalculatorInputs,
    results: CalculatorResults
): string {
    const rows = [
        ['Metric', 'Value'],
        ['Projected ROI', `${results.roi}%`],
        ['Baseline Revenue (Monthly)', `$${results.baselineRevenue.toLocaleString()}`],
        ['Nurtured Revenue (Monthly)', `$${results.nurturedRevenue.toLocaleString()}`],
        ['Revenue Surplus (Monthly)', `$${results.revenueSurplus.toLocaleString()}`],
        ['Annual Time Savings', `$${results.annualTimeSavings.toLocaleString()}`],
        ['Total Investment (Annual)', `$${results.totalInvestment.toLocaleString()}`],
        ['Sales Velocity', `$${results.salesVelocity.toLocaleString()}/day`],
        ['Lead Score', results.leadScore.toString()],
        ['Confidence Score', `${results.confidenceScore}%`],
        ['Payback Period', `${results.paybackPeriodMonths} months`],
        ['Break-Even Month', results.breakEvenMonth.toString()],
        ['Customer Lifetime Value', `$${results.lifetimeValue.toLocaleString()}`],
        ['3-Year Projection', `$${results.threeYearProjection.toLocaleString()}`],
        ['', ''],
        ['Channel', 'Conversion Rate', 'Leads', 'Revenue', 'ROI'],
        ...results.channelBreakdown.map(ch => [
            ch.channel,
            `${ch.conversionRate}%`,
            ch.leads.toString(),
            `$${ch.revenue.toLocaleString()}`,
            `${ch.roi}%`,
        ]),
    ];

    return rows.map(row => row.join(',')).join('\n');
}

/**
 * Save configuration to localStorage
 */
export function saveIntegrationConfig(config: IntegrationConfig): void {
    localStorage.setItem('roi_calculator_integrations', JSON.stringify(config));
}

/**
 * Load configuration from localStorage
 */
export function loadIntegrationConfig(): IntegrationConfig {
    const stored = localStorage.getItem('roi_calculator_integrations');
    return stored ? JSON.parse(stored) : {};
}

/**
 * Test SendFox connection
 */
export async function testSendFoxConnection(token: string): Promise<boolean> {
    try {
        const response = await fetch('https://api.sendfox.com/me', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.ok;
    } catch (error) {
        return false;
    }
}

/**
 * Test Slack webhook
 */
export async function testSlackWebhook(webhookUrl: string): Promise<boolean> {
    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: '✅ Test message from ROI Calculator - Integration is working!',
            }),
        });
        return response.ok;
    } catch (error) {
        return false;
    }
}
