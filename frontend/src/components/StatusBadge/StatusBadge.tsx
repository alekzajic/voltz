import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface StatusBadgeProps {
    status: string;
    className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
    const statusColors: Record<string, string> = {
        Good: 'bg-green-100 text-green-700',
        Excellent: 'bg-green-100 text-green-700',
        Fair: 'bg-yellow-100 text-yellow-800',
        Poor: 'bg-red-100 text-red-700',
        Critical: 'bg-red-100 text-red-700',
    };

    const colorClass = statusColors[status] || 'bg-gray-500/20 text-gray-400';

    return (
        <span className={cn(`px-2 py-1 rounded-full text-xs font-semibold`, colorClass, className)}>
            {status}
        </span>
    );
};
