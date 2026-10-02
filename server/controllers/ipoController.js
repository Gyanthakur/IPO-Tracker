import Ipo from '../models/Ipo.js';

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const scope = (req) =>
  req.isAdmin && req.query.scope === 'all' ? {} : { userId: req.userId };

export const listIpos = async (req, res) => {
  const filter = scope(req);
  ['status', 'type', 'exchange'].forEach((k) => {
    if (req.query[k]) filter[k] = req.query[k];
  });
  if (req.query.applicant)
    filter.applicant = new RegExp(escapeRe(req.query.applicant), 'i');
  res.json(await Ipo.find(filter).sort({ openDate: -1 }));
};

export const createIpo = async (req, res) => {
  const { userId, userName, _id, id, pnl, ...body } = req.body;
  const ipo = await Ipo.create({
    ...body,
    userId: req.userId,
    userName: req.userName,
  });
  res.status(201).json(ipo);
};

export const updateIpo = async (req, res) => {
  const { userId, userName, _id, id, pnl, ...body } = req.body;

  // listing price only makes sense for allotted IPOs
  if (body.status && body.status !== 'allotted') body.listingPrice = null;

  const filter = req.isAdmin
    ? { _id: req.params.id }
    : { _id: req.params.id, userId: req.userId };
  const ipo = await Ipo.findOneAndUpdate(filter, body, {
    new: true,
    runValidators: true,
  });
  if (!ipo) return res.status(404).json({ message: 'Not found' });
  res.json(ipo);
};

export const deleteIpo = async (req, res) => {
  const filter = req.isAdmin
    ? { _id: req.params.id }
    : { _id: req.params.id, userId: req.userId };
  const ipo = await Ipo.findOneAndDelete(filter);
  if (!ipo) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
};

export const summary = async (req, res) => {
  const ipos = await Ipo.find(scope(req));
  let totalGain = 0, totalLoss = 0;
  let applied = 0, allotted = 0, notAllotted = 0, pendingListing = 0;
  const byApplicant = {};

  ipos.forEach((i) => {
    if (i.status === 'applied') { applied++; return; }
    if (i.status === 'not_allotted') { notAllotted++; return; }

    allotted++;
    const p = i.pnl;
    if (p == null) { pendingListing++; return; }
    if (p >= 0) totalGain += p;
    else totalLoss += Math.abs(p);
    byApplicant[i.applicant] = (byApplicant[i.applicant] || 0) + p;
  });

  const net = totalGain - totalLoss;
  res.json({
    totalGain, totalLoss, net,
    result: net >= 0 ? 'GAIN' : 'LOSS',
    applied, allotted, notAllotted, pendingListing,
    byApplicant,
  });
};