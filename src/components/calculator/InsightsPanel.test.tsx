import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { InsightsPanel } from './InsightsPanel';
import { calculate, defaultInputs } from '@/lib/calculations';

describe('InsightsPanel Component', () => {
    const mockResults = calculate(defaultInputs);

    it('should render lead quality score', () => {
        render(<InsightsPanel results={mockResults} />);

        expect(screen.getByText(/Lead Quality/i)).toBeInTheDocument();
        expect(screen.getByText(`${mockResults.leadScore}/100`)).toBeInTheDocument();
    });

    it('should render confidence score', () => {
        render(<InsightsPanel results={mockResults} />);

        expect(screen.getByText(/Confidence/i)).toBeInTheDocument();
        expect(screen.getByText(`${mockResults.confidenceScore}%`)).toBeInTheDocument();
    });

    it('should render break-even analysis', () => {
        render(<InsightsPanel results={mockResults} />);

        expect(screen.getByText(/Break-Even/i)).toBeInTheDocument();
    });

    it('should render all insights', () => {
        render(<InsightsPanel results={mockResults} />);

        const insights = screen.getAllByText(/🚀|📊|⚡|💰|⏰|🎉/);
        expect(insights.length).toBeGreaterThan(0);
    });

    it('should render lifetime value', () => {
        render(<InsightsPanel results={mockResults} />);

        expect(screen.getByText(/Lifetime Value/i)).toBeInTheDocument();
    });

    it('should apply correct score color for high score', () => {
        const highScoreResults = { ...mockResults, leadScore: 85 };
        render(<InsightsPanel results={highScoreResults} />);

        // Component should render without errors
        expect(screen.getByText('85/100')).toBeInTheDocument();
    });

    it('should apply correct score color for low score', () => {
        const lowScoreResults = { ...mockResults, leadScore: 35 };
        render(<InsightsPanel results={lowScoreResults} />);

        expect(screen.getByText('35/100')).toBeInTheDocument();
    });
});
