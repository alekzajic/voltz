import { Search } from 'lucide-react';

interface SearchInputProps {
    value: string;
    placeholder?: string;
    className?: string;
    onChange: (value: string) => void;
}

export const SearchInput = ({ value, onChange, placeholder = "Search...", className = "" }: SearchInputProps) => {
    
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className={`relative ${className}`}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-400"
            />
        </div>
    );
};
