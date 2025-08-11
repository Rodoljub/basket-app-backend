import { Router } from 'express';
import {
  getAllRoutes,
  getRouteById,
  createRoute,
  updateRoute,
  deleteRoute,
  patchRoute,
} from './route.controller';

const router = Router();

router.get('/', getAllRoutes);
router.get('/:id', getRouteById);
router.post('/', createRoute);
router.patch('/:id', patchRoute);

router.put('/:id', updateRoute);
router.delete('/:id', deleteRoute);

export default router;
