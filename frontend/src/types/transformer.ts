export interface VoltageReading {
    timestamp: string;
    voltage: string;
}

export interface Transformer {
    assetId: number;
    name: string;
    region: string;
    health: 'Good' | 'Fair' | 'Poor' | 'Critical' | 'Excellent' | string;
    lastTenVoltageReadings: VoltageReading[];
}
