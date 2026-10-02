import { useState } from 'react';
import { calcPnl, inr } from '../utils/pnl';

export default function CalculatorPage() {
  const [f, setF] = useState({ issuePrice: '', sellPrice: '', lotSize: 1, lots: 1 });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const r = calcPnl(f);
  const ready = f.issuePrice !== '' && f.sellPrice !== '';
  const gain = r.pnl >= 0;

  const Field = ({ label, k, step }) => (
    <label className="flex flex-col gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
      {label}
      <input type="number" step={step} min="0" className="input" value={f[k]} onChange={set(k)} />
    </label>
  );

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h2 className="text-xl font-bold sm:text-2xl">🧮 Gain / Loss Calculator</h2>

      <div className="card grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Issue price (₹)" k="issuePrice" step="0.01" />
        <Field label="Listing / sell price (₹)" k="sellPrice" step="0.01" />
        <Field label="Lot size (shares)" k="lotSize" />
        <Field label="Lots" k="lots" />
      </div>

      {ready && (
        <div className={`card border-l-4 ${gain ? 'border-l-emerald-500' : 'border-l-red-500'}`}>
          <div className="grid grid-cols-1 gap-1 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-3">
            <p>Quantity: <b>{r.qty}</b> shares</p>
            <p>Invested: <b>{inr(r.invested)}</b></p>
            <p>Sale value: <b>{inr(r.sold)}</b></p>
          </div>
          <p className={`mt-3 text-2xl font-bold ${gain ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
            {gain ? 'GAIN' : 'LOSS'}: {inr(Math.abs(r.pnl))} ({r.percent.toFixed(2)}%)
          </p>
        </div>
      )}
    </div>
  );
}