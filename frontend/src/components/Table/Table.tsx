/* 
    Table component and sub-components. 
    If this was a real app all of these would have their own sparate files,
    but for the sake of simplicity I keep them in one file.  
*/
import { type ReactNode } from 'react';
import cn from '../../utils/classNames';

interface TableProps {
    children: ReactNode;
    className?: string;
}

export const Table = ({ children, className }: TableProps) => {
    return (
        <div className={cn("w-full flex flex-col", className)}>
            {children}
        </div>
    );
};

export const TableHeader = ({ children, className }: TableProps) => {
    return (
        <div className={cn("flex w-full bg-gray-50 text-gray-500 text-xs font-medium border-b border-gray-200", className)}>
            {children}
        </div>
    );
};

export const TableRow = ({ children, className }: TableProps) => {
    return (
        <div className={cn("flex w-full border-b border-gray-200 hover:bg-gray-50 transition-colors items-center", className)}>
            {children}
        </div>
    );
};

export const TableCell = ({ children, className }: TableProps) => {
    return (
        <div className={cn("p-4 flex-1 break-words min-w-0", className)}>
            {children}
        </div>
    );
};

export const TableHead = ({ children, className }: TableProps) => {
    return (
        <div className={cn("p-4 flex-1 font-semibold break-words min-w-0", className)}>
            {children}
        </div>
    );
};
