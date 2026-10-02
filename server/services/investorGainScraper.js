import axios from 'axios';
import * as cheerio from 'cheerio';

const URL = 'https://www.investorgain.com/report/ipo-gmp-live/331/';
let cache = { at: 0, data: [] };

const num = (s = '') => {
  const n = parseFloat(String(s).replace(/[^\d.-]/g, ''));
  return isNaN(n) ? 0 : n;
};

// "10-Oct" -> Date (assumes current year, rolls over if far in the past)
// const toDate = (s = '') => {
//   const m = s.trim().match(/(\d{1,2})[-\s]([A-Za-z]{3})/);
//   if (!m) return null;
//   const now = new Date();
//   let d = new Date(`${m[1]} ${m[2]} ${now.getFullYear()}`);
//   if (isNaN(d)) return null;
//   if (d < new Date(now.getFullYear(), now.getMonth() - 6, 1))
//     d = new Date(`${m[1]} ${m[2]} ${now.getFullYear() + 1}`);
//   return d.toISOString().slice(0, 10);
// };


const MONTHS = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];

const toDate = (s = '') => {
  const m = s.trim().match(/(\d{1,2})[-\s]([A-Za-z]{3})/);
  if (!m) return null;
  const mon = MONTHS.indexOf(m[2].toLowerCase());
  if (mon < 0) return null;
  const now = new Date();
  let d = new Date(Date.UTC(now.getFullYear(), mon, +m[1]));
  if (d < new Date(Date.UTC(now.getFullYear(), now.getMonth() - 6, 1)))
    d = new Date(Date.UTC(now.getFullYear() + 1, mon, +m[1]));
  return d.toISOString().slice(0, 10);
};
export async function fetchIpoList() {
  if (Date.now() - cache.at < 10 * 60 * 1000 && cache.data.length)
    return cache.data;

  const { data: html } = await axios.get(URL, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
    timeout: 15000,
  });
  const $ = cheerio.load(html);

  const headers = [];
  $('table thead th').each((_, el) =>
    headers.push($(el).text().trim().toLowerCase())
  );
  const col = (...keys) =>
    headers.findIndex((h) => keys.some((k) => h.includes(k)));

  const idx = {
    name: col('ipo', 'name'),
    price: col('price'),
    gmp: col('gmp'),
    lot: col('lot'),
    open: col('open'),
    close: col('close'),
    boa: col('boa', 'allot'),
    listing: col('listing'),
  };

  const rows = [];
  $('table tbody tr').each((_, tr) => {
    const td = $(tr).find('td');
    const get = (i) => (i >= 0 ? $(td[i]).text().trim() : '');
    const rawName = get(idx.name);
    if (!rawName) return;

    const isSme = /\bSME\b/i.test(rawName);
    rows.push({
      name: rawName.replace(/\b(SME|IPO|BSE|NSE)\b/gi, '').replace(/\s+/g, ' ').trim(),
      type: isSme ? 'SME' : 'MAINBOARD',
      exchange: /\bBSE\b/i.test(rawName) ? 'BSE' : 'NSE',
      issuePrice: num(get(idx.price)),
      gmp: num(get(idx.gmp)),
      lotSize: num(get(idx.lot)) || 1,
      openDate: toDate(get(idx.open)),
      closeDate: toDate(get(idx.close)),
      allotmentDate: toDate(get(idx.boa)),
      listingDate: toDate(get(idx.listing)),
    });
  });

  cache = { at: Date.now(), data: rows };
  return rows;
}