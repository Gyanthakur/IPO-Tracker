import { useState } from 'react';
import { useIpoModal } from '../context/IpoModalContext';
import { inr, fmtDate, allotmentReached } from '../utils/pnl';

const Info = ({ label, value }) => (
  <div>
    <p className="text-[11px] uppercase tracking-wide text-slate-400">{label}</p>
    <p className="text-sm font-medium">{value}</p>
  </div>
);

const Tag = ({ children, cls = 'bg-indigo-100 text-indigo-800 dark:bg-indigo-500/20 dark:text-indigo-200' }) => (
  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${cls}`}>{children}</span>
);

export default function IpoCard({ ipo, onUpdate, onDelete }) {
  const { openEdit } = useIpoModal();
  const [price, setPrice] = useState(ipo.listingPrice ?? '');
  const [busy, setBusy] = useState(false);

  const qty = ipo.lotSize * ipo.lots;
  const invested = ipo.issuePrice * qty;
  const gmpGain = ipo.gmp * qty;
  const ready = allotmentReached(ipo);

  const run = async (body) => {
    setBusy(true);
    try { await onUpdate(ipo._id, body); } finally { setBusy(false); }
  };

  const pct =
    ipo.pnl != null && ipo.issuePrice
      ? (((ipo.listingPrice - ipo.issuePrice) / ipo.issuePrice) * 100).toFixed(1)
      : null;

  return (
    <div className="card">
      {/* header */}
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-base font-semibold">{ipo.name}</h3>
        <Tag>{ipo.type}</Tag>
        <Tag>{ipo.exchange}</Tag>
        <Tag cls="bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-200">👤 {ipo.applicant}</Tag>
        {ipo.userName && (
          <Tag cls="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">acct: {ipo.userName}</Tag>
        )}
        <div className="ml-auto flex gap-1">
          <button onClick={() => openEdit(ipo)} title="Edit"
                  className="rounded-lg p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800">✏️</button>
          <button onClick={() => onDelete(ipo._id)} title="Delete"
                  className="rounded-lg p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800">🗑️</button>
        </div>
      </div>

      {/* details */}
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Info label="Opens" value={fmtDate(ipo.openDate)} />
        <Info label="Closes" value={fmtDate(ipo.closeDate)} />
        <Info label="Allotment" value={fmtDate(ipo.allotmentDate)} />
        <Info label="Listing" value={fmtDate(ipo.listingDate)} />
        <Info label="Issue price" value={inr(ipo.issuePrice)} />
        <Info label="Lot" value={`${ipo.lotSize} × ${ipo.lots} = ${qty} sh`} />
        <Info label="Invested" value={inr(invested)} />
        <Info label="GMP" value={`${inr(ipo.gmp)} (${gmpGain >= 0 ? '+' : '-'}${inr(Math.abs(gmpGain))})`} />
      </div>

      {/* APPLIED: choose result on / after allotment day */}
      {ipo.status === 'applied' && (
        <div className="mt-3 border-t border-slate-200 pt-3 dark:border-slate-800">
          <p className={`mb-2 text-sm ${ready ? 'font-medium text-indigo-600 dark:text-indigo-300' : 'text-slate-500 dark:text-slate-400'}`}>
            {ready
              ? '🔔 Allotment date reached. Update the result:'
              : `⏳ Result on ${fmtDate(ipo.allotmentDate)}. Buttons unlock that day.`}
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button disabled={!ready || busy} onClick={() => run({ status: 'allotted' })}
                    className="btn btn-success flex-1 sm:flex-none">✅ Allotted</button>
            <button disabled={!ready || busy} onClick={() => run({ status: 'not_allotted' })}
                    className="btn btn-danger flex-1 sm:flex-none">❌ Not allotted</button>
          </div>
        </div>
      )}

      {/* ALLOTTED: listing price -> gain / loss */}
      {ipo.status === 'allotted' && (
        <div className="mt-3 flex flex-col gap-2 border-t border-slate-200 pt-3 dark:border-slate-800 sm:flex-row sm:items-center">
          <input type="number" step="0.01" className="input sm:max-w-56"
                 placeholder="Listing / sell price (₹ per share)"
                 value={price} onChange={(e) => setPrice(e.target.value)} />
          <button disabled={busy} className="btn btn-primary"
                  onClick={() => run({ listingPrice: price === '' ? null : Number(price) })}>
            Save price
          </button>
          {ipo.pnl != null && (
            <p className={`text-sm font-bold ${ipo.pnl >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
              {ipo.pnl >= 0 ? 'Gain' : 'Loss'}: {inr(Math.abs(ipo.pnl))} ({pct}%)
            </p>
          )}
          <button disabled={busy} onClick={() => run({ status: 'applied' })}
                  className="text-xs text-slate-500 underline sm:ml-auto">↩ Move back to Applied</button>
        </div>
      )}

      {ipo.status === 'not_allotted' && (
        <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3 text-sm dark:border-slate-800">
          <span className="text-slate-500 dark:text-slate-400">No shares allotted.</span>
          <button disabled={busy} onClick={() => run({ status: 'applied' })}
                  className="text-xs text-slate-500 underline">↩ Move back to Applied</button>
        </div>
      )}
    </div>
  );
}