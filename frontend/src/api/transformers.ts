import axios from 'axios';
import type { Transformer } from '../types/transformer';

// In a real app, this would be an environment variable
const API_URL = '/sampledata.json';

export const fetchTransformers = async (): Promise<Transformer[]> => {
    const response = await axios.get<Transformer[]>(API_URL);
    return response.data;
};
