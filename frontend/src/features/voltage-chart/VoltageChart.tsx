import { useMemo, useCallback, memo } from 'react';
import { Group } from '@visx/group';
import { LinePath } from '@visx/shape';
import { scaleTime, scaleLinear, scaleOrdinal } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';
import { curveMonotoneX } from '@visx/curve';
import { ParentSize } from '@visx/responsive';
import { LegendOrdinal } from '@visx/legend';
import { useTooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { useAppStore } from '../../store/useAppStore';
import type { Transformer } from '../../types/transformer';
import { processChartData, getColors, type ChartDataPoint } from './utils';

interface VoltageChartProps {
    transformers: Transformer[];
}

export const VoltageChart = memo(({ transformers }: VoltageChartProps) => {
    const selectedTransformerIds = useAppStore(state => state.selectedTransformerIds);

    // 1. Data Preparation
    const { selectedTransformers, chartData, allVoltages } = useMemo(() =>
        processChartData(transformers, selectedTransformerIds),
        [transformers, selectedTransformerIds]);

    // 2. Scales & Accessors
    const getX = useCallback((d: ChartDataPoint) => d.timestamp, []);
    const transformerNames = useMemo(() =>
        selectedTransformers.map(t => t.name), [selectedTransformers]);

    const colorScale = useMemo(() => scaleOrdinal({
        domain: transformerNames,
        range: getColors(transformerNames.length)
    }), [transformerNames]);

    const {
        tooltipData,
        tooltipLeft,
        tooltipTop,
        tooltipOpen,
        showTooltip,
        hideTooltip,
    } = useTooltip<ChartDataPoint>();

    if (selectedTransformers.length === 0) {
        return (
            <div className="bg-surface rounded-lg shadow-sm border border-gray-200 p-8 h-[400px] flex items-center justify-center text-gray-500">
                Select transformers from the table to view their voltage history and the chart.
            </div>
        );
    }

    // Chart Config
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };

    return (
        <div className="bg-surface rounded-lg shadow-sm border border-gray-200 p-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Voltage History</h2>
            <div className="h-[400px] w-full relative">
                <ParentSize>
                    {({ width, height }) => {
                        // handle empy data
                        if (width < 10 || height < 10) return null;

                        // calculate inner dimensions
                        const innerWidth = width - margin.left - margin.right;
                        const innerHeight = height - margin.top - margin.bottom;

                        // calculate scales
                        const xScale = scaleTime({
                            domain: [
                                new Date(Math.min(...chartData.map(d => d.timestamp.getTime()))),
                                new Date(Math.max(...chartData.map(d => d.timestamp.getTime())))
                            ],
                            range: [0, innerWidth],
                        });

                        const yScale = scaleLinear({
                            domain: [Math.min(...allVoltages) * 0.95, Math.max(...allVoltages, 100) * 1.05],
                            range: [innerHeight, 0],
                            nice: true,
                        });

                        //  tootip fn
                        const handleTooltip = (event: React.PointerEvent<SVGRectElement> | React.TouchEvent<SVGRectElement>) => {
                            const { x } = localPoint(event) || { x: 0 };
                            const x0 = xScale.invert(x - margin.left);

                            // Simple distance check to find closest point
                            let recipient = chartData[0];
                            let minDiff = Math.abs(x0.getTime() - recipient.timestamp.getTime());

                            for (const d of chartData) {
                                const diff = Math.abs(x0.getTime() - d.timestamp.getTime());
                                if (diff < minDiff) {
                                    minDiff = diff;
                                    recipient = d;
                                }
                            }

                            if (recipient) {
                                showTooltip({
                                    tooltipData: recipient,
                                    tooltipLeft: xScale(recipient.timestamp) + margin.left,
                                    tooltipTop: yScale(allVoltages[0] || 0)
                                });
                            }
                        };

                        return (
                            <div className="relative">
                                <svg width={width} height={height}>
                                    <Group left={margin.left} top={margin.top}>
                                        {/* draw grid */}
                                        <GridRows scale={yScale} width={innerWidth} stroke="#374151" strokeDasharray="3 3" />
                                        <GridColumns scale={xScale} height={innerHeight} stroke="#374151" strokeDasharray="3 3" />

                                        {/* draw axis */}
                                        <AxisBottom
                                            top={innerHeight}
                                            scale={xScale}
                                            stroke="#9ca3af"
                                            tickStroke="#9ca3af"
                                            tickFormat={(val) => {
                                                if (val instanceof Date) {
                                                    return val.toLocaleDateString('en-US', {
                                                        month: '2-digit',
                                                        day: '2-digit',
                                                        year: '2-digit'
                                                    });
                                                }
                                                return '';
                                            }}
                                            tickLabelProps={{ fill: '#6b7280', fontSize: 11, textAnchor: 'middle' }}
                                        />
                                        <AxisLeft
                                            scale={yScale}
                                            stroke="#9ca3af"
                                            tickStroke="#9ca3af"
                                            tickLabelProps={{ fill: '#6b7280', fontSize: 11, textAnchor: 'end', dx: -5, dy: 3 }}
                                            tickFormat={(val) => `${val}V`}
                                        />

                                        {/* Lines */}
                                        {selectedTransformers.map((t) => (
                                            <g key={`lines-${t.assetId}`}>
                                                <LinePath
                                                    data={chartData}
                                                    x={d => xScale(getX(d))}
                                                    y={d => yScale(d[t.name] as number)}
                                                    stroke={colorScale(t.name)}
                                                    strokeWidth={2}
                                                    curve={curveMonotoneX}
                                                />
                                                {/* Dots */}
                                                {chartData.map((d, i) => {
                                                    const yVal = d[t.name];
                                                    if (typeof yVal !== 'number') return null;
                                                    return (
                                                        <circle
                                                            key={`dot-${t.assetId}-${i}`}
                                                            cx={xScale(getX(d))}
                                                            cy={yScale(yVal)}
                                                            r={4}
                                                            fill={colorScale(t.name)}
                                                            stroke="#ffffff"
                                                            strokeWidth={2}
                                                        />
                                                    );
                                                })}
                                            </g>
                                        ))}

                                        {/* tooltip */}
                                        {tooltipOpen && tooltipData && selectedTransformers.map(t => {
                                            const yVal = tooltipData[t.name];
                                            if (typeof yVal !== 'number') return null;
                                            return (
                                                <circle
                                                    key={`active-dot-${t.assetId}`}
                                                    cx={xScale(getX(tooltipData))}
                                                    cy={yScale(yVal)}
                                                    r={6}
                                                    fill={colorScale(t.name)}
                                                    stroke="white"
                                                    strokeWidth={2}
                                                    pointerEvents="none"
                                                />
                                            );
                                        })}
                                        <rect width={innerWidth} height={innerHeight} fill="transparent"
                                            onPointerMove={handleTooltip} onPointerLeave={() => hideTooltip()} />
                                    </Group>
                                </svg>

                                {tooltipOpen && tooltipData && (
                                    <TooltipWithBounds top={tooltipTop} left={tooltipLeft}
                                        style={{ ...defaultStyles, backgroundColor: '#ffffff', border: '1px solid #e5e7eb', color: '#111827', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                                        <div className="font-bold mb-1">{tooltipData.timestamp.toLocaleDateString()}</div>
                                        {selectedTransformers.map(t => (
                                            <div key={t.assetId} style={{ color: colorScale(t.name) }}>
                                                {t.name}: {tooltipData[t.name] as number} V
                                            </div>
                                        ))}
                                    </TooltipWithBounds>
                                )}
                            </div>
                        );
                    }}
                </ParentSize>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-4 justify-center">
                <LegendOrdinal scale={colorScale} direction="row" labelFormat={(label) => `${label}`}>
                    {labels => (
                        <div className="flex gap-4">
                            {labels.map((label, i) => (
                                <div key={`legend-${i}`} className="flex items-center gap-1">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: label.value }} />
                                    <span className="text-xs text-gray-500">{label.text}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </LegendOrdinal>
            </div>
        </div>
    );
});
