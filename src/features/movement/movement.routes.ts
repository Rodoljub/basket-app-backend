import { Router } from 'express';
import {
  createMovement,
  deleteMovement,
  getAllMovements,
  getMovementById,
} from './movement.service';
import { getMovements } from './movement.controller';

const router = Router();

router.get('/movements', async (req, res) => {
  const result = await getAllMovements();
  res.json(result);
});

router.get('/movements/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await getMovementById(id);
  if (!result) return res.status(404).json({ error: 'Not found' });
  res.json(result);
});

router.post('/movements', async (req, res) => {
  try {
    const { fromPlaceId, toPlaceId, quantity, basketType } = req.body;
    const result = await createMovement({ fromPlaceId, toPlaceId, quantity, basketType });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create movement', details: err });
  }
});

router.delete('/movements/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await deleteMovement(id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Delete failed', details: err });
  }
});

router.get('/', getMovements);

export default router;
