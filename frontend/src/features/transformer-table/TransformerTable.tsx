import { useAppStore } from '../../store/useAppStore';
import { useShallow } from 'zustand/react/shallow';
import { useMemo, memo } from 'react';
import type { Transformer } from '../../types/transformer';
import { SearchInput } from '../../components/Table/SearchInput';
import { FilterSelect } from '../../components/Table/FilterSelect';
import { StatusBadge } from '../../components/StatusBadge/StatusBadge';
import { Table, TableHeader, TableRow, TableCell, TableHead } from '../../components/Table/Table';

interface TransformerTableProps {
    transformers: Transformer[];
}

// Column Configuration
const columns = [
    { id: 'chart', header: 'Chart', className: 'flex-[0_0_80px] text-center' },
    { id: 'name', header: 'Name', className: '' },
    { id: 'region', header: 'Region', className: '' },
    { id: 'health', header: 'Health', className: 'text-right' },
];

export const TransformerTable = memo(({ transformers }: TransformerTableProps) => {
    // Get state from the store
    const {
        searchQuery,
        setSearchQuery,
        healthFilter,
        setHealthFilter,
        selectedTransformerIds,
        toggleTransformerSelection
    } = useAppStore(useShallow(state => ({
        searchQuery: state.searchQuery,
        setSearchQuery: state.setSearchQuery,
        healthFilter: state.healthFilter,
        setHealthFilter: state.setHealthFilter,
        selectedTransformerIds: state.selectedTransformerIds,
        toggleTransformerSelection: state.toggleTransformerSelection
    })));

    // Filter transformers based on search and health filter
    const filteredTransformers = useMemo(() => 
        transformers.filter((t) => {
        const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) 
            || t.region.toLowerCase().includes(searchQuery.toLowerCase());
                
        const matchesHealth = healthFilter === 'All' || t.health === healthFilter;
        return matchesSearch && matchesHealth;
    }), [transformers, searchQuery, healthFilter]);

    // Get unique health statuses
    const uniqueHealthStatuses = ['All', ...new Set(transformers.map(t => t.health))];

    return (
        <div className="bg-surface rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex flex-col gap-4 justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Transformers</h2>

                <div className="flex gap-4 w-full md:w-auto">
                    <SearchInput
                        value={searchQuery}
                        onChange={setSearchQuery}
                        className="flex-grow md:flex-grow-0 md:w-64"
                    />

                    <FilterSelect
                        value={healthFilter}
                        onChange={setHealthFilter}
                        options={uniqueHealthStatuses}
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <Table className="w-full">
                    <TableHeader>
                        {columns.map((col) => (
                            <TableHead key={col.id} className={col.className}>
                                {col.header}
                            </TableHead>
                        ))}
                    </TableHeader>

                    {filteredTransformers.length === 0 ? (
                        <TableRow>
                            <TableCell className="text-center text-gray-500">No transformers found.</TableCell>
                        </TableRow>
                    ) : (
                        <div className="flex flex-col">
                            {filteredTransformers.map((t) => (
                                <TableRow key={t.assetId}>
                                    <TableCell className="flex-[0_0_80px] flex items-center justify-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedTransformerIds.includes(t.assetId)}
                                            onChange={() => toggleTransformerSelection(t.assetId)}
                                            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium text-gray-900 text-xs">{t.name}</TableCell>
                                    <TableCell className="text-gray-500 text-xs">{t.region}</TableCell>
                                    <TableCell className="text-xs text-right">
                                        <StatusBadge status={t.health} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </div>
                    )}
                </Table>
            </div>
        </div>
    );
});
