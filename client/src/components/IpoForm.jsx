import { useEffect, useState } from 'react';
import useApi from '../api/useApi';

const empty = {
  name: '', applicant: '', type: 'MAINBOARD', exchange: 'NSE',
  openDate: '', closeDate: '', allotmentDate: '', listingDate: '',
  issuePrice: '', lotSize: 1, lots: 1, gmp: 0,
};

export default function IpoForm({ status, onSaved }) {
  const api = useApi();
  const [form, setForm] = useState(empty);
  const [market, setMarket] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  // reload InvestorGain list whenever the type (Mainboard/SME) changes
  useEffect(() => {
    setLoading(true);
    api.get('/market/ipos', { params: { type: form.type } })
      .then((r) => { setMarket(r.data); setErr(''); })
      .catch(() => { setMarket([]); setErr('Could not load InvestorGain list - enter manually.'); })
      .finally(() => setLoading(false));
  }, [form.type]);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const pick = (e) => {
    const ipo = market.find((m) => m.name === e.target.value);
    if (ipo) setForm({ ...form, ...ipo });
  };

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/ipos', { ...form, status });
    setForm({ ...empty, applicant: form.applicant });
    onSaved();
  };

  return (
    <form className="form" onSubmit={submit}>
      <select value={form.type} onChange={set('type')}>
        <option value="MAINBOARD">Mainboard</option>
        <option value="SME">SME</option>
      </select>
      <select value={form.exchange} onChange={set('exchange')}>
        <option>NSE</option><option>BSE</option>
      </select>

      <select onChange={pick} defaultValue="">
        <option value="" disabled>{loading ? 'Loading...' : 'Fetch from InvestorGain'}</option>
        {market.map((m) => <option key={m.name}>{m.name}</option>)}
      </select>
      {err && <small className="err">{err}</small>}

      <input placeholder="IPO name" value={form.name} onChange={set('name')} required />
      <input placeholder="Applicant name" value={form.applicant} onChange={set('applicant')} required />

      <label>Open<input type="date" value={form.openDate?.slice(0, 10) || ''} onChange={set('openDate')} /></label>
      <label>Close<input type="date" value={form.closeDate?.slice(0, 10) || ''} onChange={set('closeDate')} /></label>
      <label>Allotment<input type="date" value={form.allotmentDate?.slice(0, 10) || ''} onChange={set('allotmentDate')} /></label>
      <label>Listing<input type="date" value={form.listingDate?.slice(0, 10) || ''} onChange={set('listingDate')} /></label>

      <label>Issue price<input type="number" step="0.01" value={form.issuePrice} onChange={set('issuePrice')} required /></label>
      <label>Lot size<input type="number" value={form.lotSize} onChange={set('lotSize')} required /></label>
      <label>Lots applied/allotted<input type="number" min="1" value={form.lots} onChange={set('lots')} required /></label>
      <label>GMP<input type="number" step="0.01" value={form.gmp} onChange={set('gmp')} /></label>

      <button className="btn">Add to {status === 'allotted' ? 'Allotted' : 'Not Allotted'}</button>
    </form>
  );
}