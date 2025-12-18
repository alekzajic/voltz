import { render, screen } from '@testing-library/react';
import { TransformerTable } from './TransformerTable';
import type { Transformer } from '../../types/transformer';

const mockTransformers: Transformer[] = [
    {
        assetId: 101,
        name: 'Transformer 1',
        region: 'North',
        health: 'Good',
        lastTenVoltageReadings: []
    }
];

describe('TransformerTable', () => {
    test('renders table headers', () => {
        render(<TransformerTable transformers={mockTransformers} />);

        expect(screen.getByText('Name')).toBeInTheDocument();
    });

    test('renders transformer data', () => {
        render(<TransformerTable transformers={mockTransformers} />);

        expect(screen.getByText('Transformer 1')).toBeInTheDocument();
        expect(screen.getAllByText('Good')[0]).toBeInTheDocument();
    });
});
