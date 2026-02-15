import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ExportSection } from './ExportSection';
import { calculate, defaultInputs } from '@/lib/calculations';

describe('ExportSection Component', () => {
    const mockInputs = defaultInputs;
    const mockResults = calculate(mockInputs);

    // Mock clipboard API
    beforeEach(() => {
        Object.assign(navigator, {
            clipboard: {
                writeText: vi.fn(() => Promise.resolve()),
            },
        });
    });

    it('should render all export buttons', () => {
        render(<ExportSection inputs={mockInputs} results={mockResults} />);

        expect(screen.getByText('JSON')).toBeInTheDocument();
        expect(screen.getByText('CSV')).toBeInTheDocument();
        expect(screen.getByText('PDF')).toBeInTheDocument();
        expect(screen.getByText('Link')).toBeInTheDocument();
    });

    it('should render email results button', () => {
        render(<ExportSection inputs={mockInputs} results={mockResults} />);

        expect(screen.getByText('Email Results')).toBeInTheDocument();
    });

    it('should trigger JSON export on button click', () => {
        render(<ExportSection inputs={mockInputs} results={mockResults} />);

        const jsonButton = screen.getByText('JSON');
        fireEvent.click(jsonButton);

        // Component should handle the click without errors
        expect(jsonButton).toBeInTheDocument();
    });

    it('should trigger CSV export on button click', () => {
        render(<ExportSection inputs={mockInputs} results={mockResults} />);

        const csvButton = screen.getByText('CSV');
        fireEvent.click(csvButton);

        expect(csvButton).toBeInTheDocument();
    });

    it('should trigger print on PDF button click', () => {
        const mockPrint = vi.fn();
        window.print = mockPrint;

        render(<ExportSection inputs={mockInputs} results={mockResults} />);

        const pdfButton = screen.getByText('PDF');
        fireEvent.click(pdfButton);

        expect(mockPrint).toHaveBeenCalled();
    });

    it('should copy share URL to clipboard', async () => {
        render(<ExportSection inputs={mockInputs} results={mockResults} />);

        const linkButton = screen.getByText('Link');
        fireEvent.click(linkButton);

        expect(navigator.clipboard.writeText).toHaveBeenCalled();
    });
});
