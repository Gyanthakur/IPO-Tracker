import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { getMarketIpos } from '../controllers/marketController.js';

const r = Router();
r.get('/ipos', requireAuth, getMarketIpos);
export default r;