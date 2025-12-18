import { render, screen } from '@testing-library/react';
import { VoltageChart } from './VoltageChart';
import { useAppStore } from '../../store/useAppStore';
import type { Transformer } from '../../types/transformer';

jest.mock('../../store/useAppStore', () => ({
  useAppStore: jest.fn(),
}));

jest.mock('@visx/responsive', () => ({
  ParentSize: ({ children }: any) => children({ width: 500, height: 300 }),
}));

const mockUseAppStore = useAppStore as jest.MockedFunction<typeof useAppStore>;

const mockTransformers: Transformer[] = [
  {
    assetId: 1,
    name: 'T1',
    region: 'North',
    health: 'Good',
    lastTenVoltageReadings: [
      { timestamp: '2023-01-01T10:00:00Z', voltage: '220.5' },
      { timestamp: '2023-01-01T10:05:00Z', voltage: '221.0' },
    ],
  },
];

describe('VoltageChart', () => {
  beforeEach(() => {
    mockUseAppStore.mockReset();
  });

  test('renders empty state when no transformers are selected', () => {
    mockUseAppStore.mockReturnValue([]); // no selected IDs

    render(<VoltageChart transformers={mockTransformers} />);

    expect(
      screen.getByText(/Select transformers from the table/i)
    ).toBeInTheDocument();
  });

  test('renders chart titles when transformers are selected', () => {
    mockUseAppStore.mockReturnValue([1]); // T1 selected

    const { container } = render(
      <VoltageChart transformers={mockTransformers} />
    );

    expect(screen.getByText('Voltage History')).toBeInTheDocument();

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
