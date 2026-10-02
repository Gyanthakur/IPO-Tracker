import axios from 'axios';
import { useMemo } from 'react';
import { useAuth } from '@clerk/clerk-react';

const raw = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const BASE_URL = raw.replace(/\/+$/, '').replace(/\/api$/, '') + '/api';

export default function useApi() {
  const { getToken } = useAuth();
  return useMemo(() => {
    const api = axios.create({ baseURL: BASE_URL });
    api.interceptors.request.use(async (config) => {
      const token = await getToken();
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
    return api;
  }, [getToken]);
}