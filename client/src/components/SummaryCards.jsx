import { inr } from '../utils/pnl';

function Stat({ label, value, border = 'border-l-slate-300 dark:border-l-slate-600', text = '' }) {
  return (
    <div className={`card border-l-4 ${border}`}>
      <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
      <p className={`mt-1 text-xl font-bold sm:text-2xl ${text}`}>{value}</p>
    </div>
  );
}

export default function SummaryCards({ s }) {
  if (!s) return null;
  const isGain = s.net >= 0;
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Stat label="Total Gain" value={inr(s.totalGain)}
              border="border-l-emerald-500" text="text-emerald-600 dark:text-emerald-400" />
        <Stat label="Total Loss" value={inr(s.totalLoss)}
              border="border-l-red-500" text="text-red-600 dark:text-red-400" />
        <Stat label={`Overall ${s.result}`} value={inr(Math.abs(s.net))}
              border={isGain ? 'border-l-emerald-500' : 'border-l-red-500'}
              text={isGain ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'} />
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Applied (waiting)" value={s.applied} />
        <Stat label="Allotted" value={s.allotted} />
        <Stat label="Not allotted" value={s.notAllotted} />
        <Stat label="Awaiting listing price" value={s.pendingListing} />
      </div>
    </div>
  );
}