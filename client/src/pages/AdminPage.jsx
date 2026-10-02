import { useIpoList, useSummary } from '../hooks/useIpoData';
import SummaryCards from '../components/SummaryCards';
import { inr, fmtDate } from '../utils/pnl';

const STATUS = {
  applied: 'Applied',
  allotted: 'Allotted',
  not_allotted: 'Not allotted',
};

export default function AdminPage() {
  const { summary: s, error: sErr } = useSummary('all');
  const { ipos, loading, error } = useIpoList({ scope: 'all' });

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold sm:text-2xl">🛡️ Admin: all users</h2>
      {(sErr || error) && <p className="text-sm text-red-500">{sErr || error}</p>}
      <SummaryCards s={s} />

      <div className="card overflow-x-auto p-0">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
            <tr>
              {['Account', 'Applicant', 'IPO', 'Type', 'Status', 'Listing', 'P/L'].map((h) => (
                <th key={h} className="whitespace-nowrap px-4 py-2.5">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan="7" className="px-4 py-4 text-slate-500">Loading…</td></tr>}
            {ipos.map((i) => (
              <tr key={i._id} className="border-t border-slate-200 dark:border-slate-800">
                <td className="whitespace-nowrap px-4 py-2.5">{i.userName}</td>
                <td className="whitespace-nowrap px-4 py-2.5">{i.applicant}</td>
                <td className="whitespace-nowrap px-4 py-2.5">{i.name}</td>
                <td className="whitespace-nowrap px-4 py-2.5">{i.type}/{i.exchange}</td>
                <td className="whitespace-nowrap px-4 py-2.5">{STATUS[i.status] || i.status}</td>
                <td className="whitespace-nowrap px-4 py-2.5">{fmtDate(i.listingDate)}</td>
                <td className={`whitespace-nowrap px-4 py-2.5 font-semibold ${
                  i.pnl == null ? '' : i.pnl >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                  {i.pnl == null ? '-' : inr(i.pnl)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}