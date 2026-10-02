import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../api/useApi';
import { toInputDate } from '../utils/pnl';

const EMPTY = {
  name: '', applicant: '', type: 'MAINBOARD', exchange: 'NSE',
  openDate: '', closeDate: '', allotmentDate: '', listingDate: '',
  issuePrice: '', lotSize: 1, lots: 1, gmp: 0,
};
const DATE_KEYS = ['openDate', 'closeDate', 'allotmentDate', 'listingDate'];
const NUM_KEYS = ['issuePrice', 'lotSize', 'lots', 'gmp'];

function Field({ label, className = '', children }) {
  return (
    <label className={`flex flex-col gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 ${className}`}>
      {label}
      {children}
    </label>
  );
}

export default function IpoFormModal({ ipo, onClose }) {
  const api = useApi();
  const navigate = useNavigate();
  const editing = Boolean(ipo);

  const [form, setForm] = useState(() => {
    const f = { ...EMPTY, ...(ipo || {}) };
    DATE_KEYS.forEach((k) => { f[k] = toInputDate(f[k]); });
    return f;
  });
  const [market, setMarket] = useState([]);
  const [loadingList, setLoadingList] = useState(false);
  const [listErr, setListErr] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  // close on Esc + lock page scroll while open
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  // InvestorGain list (only when adding a new IPO)
  useEffect(() => {
    if (editing) return;
    let off = false;
    setLoadingList(true);
    api
      .get('/market/ipos', { params: { type: form.type } })
      .then((r) => { if (!off) { setMarket(Array.isArray(r.data) ? r.data : []); setListErr(''); } })
      .catch(() => { if (!off) { setMarket([]); setListErr('Could not load InvestorGain list. Enter details manually.'); } })
      .finally(() => { if (!off) setLoadingList(false); });
    return () => { off = true; };
  }, [api, editing, form.type]);

  const pick = (idx) => {
    const m = market[Number(idx)];
    if (!m) return;
    setForm((f) => ({
      ...f,
      name: m.name,
      type: m.type,
      exchange: m.exchange,
      issuePrice: m.issuePrice,
      lotSize: m.lotSize,
      gmp: m.gmp,
      openDate: m.openDate || '',
      closeDate: m.closeDate || '',
      allotmentDate: m.allotmentDate || '',
      listingDate: m.listingDate || '',
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload = {};
    Object.keys(EMPTY).forEach((k) => { payload[k] = form[k]; });
    DATE_KEYS.forEach((k) => { payload[k] = form[k] || null; });
    NUM_KEYS.forEach((k) => { payload[k] = Number(form[k]) || 0; });

    try {
      if (editing) await api.put(`/ipos/${ipo._id}`, payload);
      else await api.post('/ipos', { ...payload, status: 'applied' });

      window.dispatchEvent(new Event('ipos:changed'));
      if (!editing) navigate('/applied');
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Could not save');
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 sm:items-center sm:p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <form
        onSubmit={submit}
        className="flex max-h-[92vh] w-full flex-col rounded-t-2xl bg-white shadow-xl dark:bg-slate-900 sm:max-w-2xl sm:rounded-2xl"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-semibold">{editing ? 'Edit IPO' : 'Add new IPO'}</h2>
            {!editing && (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Saved as <b>Applied</b>. Mark it Allotted / Not allotted on the allotment date.
              </p>
            )}
          </div>
          <button type="button" onClick={onClose} aria-label="Close"
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">✕</button>
        </div>

        <div className="grid grid-cols-1 gap-3 overflow-y-auto p-4 sm:grid-cols-2">
          <Field label="Type">
            <select className="input" value={form.type} onChange={set('type')}>
              <option value="MAINBOARD">Mainboard</option>
              <option value="SME">SME</option>
            </select>
          </Field>
          <Field label="Exchange">
            <select className="input" value={form.exchange} onChange={set('exchange')}>
              <option>NSE</option>
              <option>BSE</option>
            </select>
          </Field>

          {!editing && (
            <Field label="Auto-fill from InvestorGain" className="sm:col-span-2">
              <select className="input" value="" onChange={(e) => pick(e.target.value)}>
                <option value="" disabled>
                  {loadingList ? 'Loading…' : `Select an IPO (${market.length} found)`}
                </option>
                {market.map((m, i) => (
                  <option key={`${m.name}-${i}`} value={i}>{m.name}</option>
                ))}
              </select>
              {listErr && <span className="text-red-500">{listErr}</span>}
            </Field>
          )}

          <Field label="IPO name">
            <input className="input" required value={form.name} onChange={set('name')} placeholder="e.g. ABC Industries" />
          </Field>
          <Field label="Applicant name">
            <input className="input" required value={form.applicant} onChange={set('applicant')} placeholder="Who applied?" />
          </Field>

          <Field label="Open date">
            <input type="date" className="input" value={form.openDate} onChange={set('openDate')} />
          </Field>
          <Field label="Close date">
            <input type="date" className="input" value={form.closeDate} onChange={set('closeDate')} />
          </Field>
          <Field label="Allotment date">
            <input type="date" className="input" value={form.allotmentDate} onChange={set('allotmentDate')} />
          </Field>
          <Field label="Listing date">
            <input type="date" className="input" value={form.listingDate} onChange={set('listingDate')} />
          </Field>

          <Field label="Issue price (₹)">
            <input type="number" step="0.01" min="0" required className="input" value={form.issuePrice} onChange={set('issuePrice')} />
          </Field>
          <Field label="GMP (₹)">
            <input type="number" step="0.01" className="input" value={form.gmp} onChange={set('gmp')} />
          </Field>
          <Field label="Lot size (shares)">
            <input type="number" min="1" required className="input" value={form.lotSize} onChange={set('lotSize')} />
          </Field>
          <Field label="Lots applied">
            <input type="number" min="1" required className="input" value={form.lots} onChange={set('lots')} />
          </Field>

          {error && <p className="text-sm text-red-500 sm:col-span-2">{error}</p>}
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-slate-200 p-4 dark:border-slate-800 sm:flex-row sm:justify-end">
          <button type="button" onClick={onClose} className="btn btn-ghost">Cancel</button>
          <button disabled={saving} className="btn btn-primary">
            {saving ? 'Saving…' : editing ? 'Save changes' : 'Add IPO'}
          </button>
        </div>
      </form>
    </div>
  );
}