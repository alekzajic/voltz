import { Filter } from 'lucide-react';

interface FilterSelectProps {
    value: string;
    options: string[];
    className?: string;
    onChange: (value: string) => void;
}

export const FilterSelect = ({ value, onChange, options, className = "" }: FilterSelectProps) => {
    
    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
    };  

    return (
        <div className={`relative ${className}`}>
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <select
                value={value}
                onChange={handleFilterChange}
                className="pl-10 pr-8 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
            >
                {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
};
