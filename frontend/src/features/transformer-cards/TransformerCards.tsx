import { Zap, MapPin, Activity } from 'lucide-react';
import { useTransformers } from '../../hooks/useTransformers';
import { StatusBadge } from '../../components/StatusBadge/StatusBadge';

export function TransformerCards() {
  const { data: transformers, isLoading, isError, error } = useTransformers();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center py-8">
        Error loading transformers: {error?.message || 'Unknown error'}
      </div>
    );
  }

  if (!transformers || transformers.length === 0) {
    return (
      <div className="text-gray-500 text-center py-8">
        No transformers found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {transformers.map((transformer) => (
        <div
          key={transformer.assetId}
          className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Zap className="text-primary w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{transformer.name}</h3>
                <p className="text-sm text-gray-500">ID: {transformer.assetId}</p>
              </div>
            </div>
            <StatusBadge status={transformer.health} />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{transformer.region}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Activity className="w-4 h-4" />
              <span>{transformer.lastTenVoltageReadings.length} readings</span>
            </div>
          </div>

          {transformer.lastTenVoltageReadings.length > 0 && (
            <div className="mt-4 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-2">Recent Voltage</p>
              <div className="flex gap-1">
                {transformer.lastTenVoltageReadings.slice(-5).map((reading) => (
                  <div
                    key={`${reading.timestamp}-${reading.voltage}`}
                    className="flex-1 bg-primary/20 rounded text-center text-xs py-1"
                    title={`${reading.voltage}V`}
                  >
                    {reading.voltage}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
