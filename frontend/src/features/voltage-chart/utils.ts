import { type Transformer } from '../../types/transformer';
import { palette } from '../../constants/colors';

export interface ChartDataPoint {
    timestamp: Date;
    [key: string]: number | Date;
}

/**
 * Processes the chart data for the selected transformers.
 * @param transformers The transformers to process.
 * @param selectedIds The IDs of the selected transformers.
 * @returns An object containing the selected transformers, chart data, and all voltages.
 */
export const processChartData = (transformers: Transformer[], selectedIds: number[]) => {
    const selectedTransformers = transformers.filter(t => selectedIds.includes(t.assetId));

    // handle empty selection
    if (selectedTransformers.length === 0) return { selectedTransformers, chartData: [], allVoltages: [] };

    const dataMap = new Map<string, ChartDataPoint>();

    // create a map of transformers by name
    selectedTransformers.forEach(t => {
        t.lastTenVoltageReadings.forEach(reading => {
            const date = new Date(reading.timestamp);
            const dateStr = date.toISOString(); // Use full ISO for unique keys if needed, or date string

            if (!dataMap.has(dateStr)) {
                dataMap.set(dateStr, { timestamp: date });
            }
            const entry = dataMap.get(dateStr)!;
            entry[t.name] = parseInt(reading.voltage, 10);
        });
    });

    // preferably the data is sorted on backend but just in case
    const chartData = Array.from(dataMap.values())
        .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

    const allVoltages: number[] = [];

    // create a list of all voltages
    for (const dataPoint of chartData) {
        for (const transformer of selectedTransformers) {
            const voltage = dataPoint[transformer.name] as number | undefined;

            if (voltage !== undefined) {
                allVoltages.push(voltage);
            }
        }
    }

    return { selectedTransformers, chartData, allVoltages };
};


/**
 * returns an array of colors based on the count of transformers.
 * @param count the number of transformers.
 * @returns array of colors.
 */
export const getColors = (count: number) => {
    return palette.chart.slice(0, Math.max(count, 1)) as string[];
};
