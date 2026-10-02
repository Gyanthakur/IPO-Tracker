export const calcPnl = ({ issuePrice, sellPrice, lotSize, lots }) => {
  const qty = Number(lotSize) * Number(lots);
  const invested = Number(issuePrice) * qty;
  const sold = Number(sellPrice) * qty;
  const pnl = sold - invested;
  const percent = invested ? (pnl / invested) * 100 : 0;
  return { qty, invested, sold, pnl, percent };
};

export const inr = (n) =>
  '₹' + Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 });

export const fmtDate = (d) =>
  d
    ? new Date(d).toLocaleDateString('en-IN', {
        timeZone: 'UTC', day: '2-digit', month: 'short', year: 'numeric',
      })
    : '-';

// "2026-10-02T00:00:00.000Z" -> "2026-10-02" (for <input type="date">)
export const toInputDate = (d) => (d ? String(d).slice(0, 10) : '');

// today's date in the user's local timezone as YYYY-MM-DD
export const todayISO = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

// true once the allotment date is today or in the past
export const allotmentReached = (ipo) =>
  !ipo.allotmentDate || toInputDate(ipo.allotmentDate) <= todayISO();