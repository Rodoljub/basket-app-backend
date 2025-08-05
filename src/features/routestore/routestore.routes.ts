import { Router } from 'express';
import {
  getAllRouteStores,
  getById,
  create,
  update,
  remove,
  getByRouteId,
  bulkReorder
} from './routestore.controller';

const router = Router();

router.get('/by-route/:routeId', getByRouteId);
router.put('/bulk-reorder', bulkReorder);

router.get('/', getAllRouteStores);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);


export default router;
