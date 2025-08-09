import { Router } from 'express';
import {
  getAllRouteStores,
  getById,
  create,
  update,
  remove,
  getByRouteId,
  bulkReorder,
  insertAtOrder,
  moveToOrder,
  getOrderedRouteStores
} from './routestore.controller';

const router = Router();

router.get('/by-route/:routeId', getByRouteId);
router.put('/bulk-reorder', bulkReorder);
router.post('/insert-at-order', insertAtOrder);
router.patch('/move-to-order', moveToOrder);

router.get('/route/:routeId', getOrderedRouteStores);



router.get('/', getAllRouteStores);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);


export default router;
