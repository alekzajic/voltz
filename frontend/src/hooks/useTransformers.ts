import { useQuery } from '@tanstack/react-query';
import { fetchTransformers } from '../api/transformers';
import type { Transformer } from '../types/transformer';

export const useTransformers = () => {
    return useQuery<Transformer[], Error>({
        queryKey: ['transformers'],
        queryFn: fetchTransformers,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};
