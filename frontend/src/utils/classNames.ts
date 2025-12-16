import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Helper 
 * @param inputs 
 * @returns 
 */
export default function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}