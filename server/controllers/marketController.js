import { fetchIpoList } from '../services/investorGainScraper.js';

export const getMarketIpos = async (req, res) => {
  try {
    let list = await fetchIpoList();
    const { type } = req.query; // MAINBOARD | SME
    if (type) list = list.filter((i) => i.type === type);
    res.json(list);
  } catch (e) {
    res.status(502).json({ message: 'Could not fetch InvestorGain data' });
  }
};