import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import {
  listIpos, createIpo, updateIpo, deleteIpo, summary,
} from '../controllers/ipoController.js';

const r = Router();
r.use(requireAuth);
r.get('/summary', summary);
r.route('/').get(listIpos).post(createIpo);
r.route('/:id').put(updateIpo).delete(deleteIpo);
export default r;