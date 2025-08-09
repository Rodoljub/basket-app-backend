// src/features/place/place.routes.ts
import { Router } from 'express';
import { placeController } from './place.controller';

const router = Router();

router.get('/by-type', placeController.getByType);

router.get('/', placeController.getAll);
router.get('/:id', placeController.getById);
router.post('/', placeController.create);
router.put('/:id', placeController.update);
router.delete('/:id', placeController.delete);

export default router;
