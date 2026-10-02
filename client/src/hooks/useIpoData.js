import { useCallback, useEffect, useState } from 'react';
import useApi from '../api/useApi';

export function useIpoList({ status, applicant, scope } = {}) {
  const api = useApi();
  const [ipos, setIpos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try {
      const { data } = await api.get('/ipos', { params: { status, applicant, scope } });
      setIpos(Array.isArray(data) ? data : []);
      setError('');
    } catch (e) {
      setError(e.response?.data?.message || e.message || 'Failed to load IPOs');
    } finally {
      setLoading(false);
    }
  }, [api, status, applicant, scope]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    window.addEventListener('ipos:changed', load);
    return () => window.removeEventListener('ipos:changed', load);
  }, [load]);

  return { ipos, loading, error, reload: load };
}

export function useSummary(scope) {
  const api = useApi();
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try {
      const { data } = await api.get('/ipos/summary', { params: { scope } });
      if (data && typeof data === 'object' && 'totalGain' in data) {
        setSummary(data);
        setError('');
      } else {
        setError('Unexpected response from server.');
      }
    } catch (e) {
      setError(e.response?.data?.message || e.message || 'Failed to load summary');
    }
  }, [api, scope]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    window.addEventListener('ipos:changed', load);
    return () => window.removeEventListener('ipos:changed', load);
  }, [load]);

  return { summary, error };
}