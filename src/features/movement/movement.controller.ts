// movement.controller.ts

import { Router } from 'express';
import { handleSimplifiedInteraction } from './movement.service';
import { SimplifiedInteractionInput } from './movement.dto';

import { Request, Response } from 'express';
import { getMovementsFiltered } from './movement.service';

const router = Router();

// POST /api/movements/simplified
router.post('/simplified', async (req, res) => {
  try {
    const data = req.body as SimplifiedInteractionInput;

    if (!data || typeof data.placeId !== 'number' || typeof data.routeId !== 'number' || typeof data.delta !== 'number' || !data.basketType) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const result = await handleSimplifiedInteraction(data);
    res.status(201).json(result);
  } catch (error: any) {
    console.error('[POST /simplified] Error:', error);
    res.status(500).json({ error: error.message });
  }
});

export const getMovements = async (req: Request, res: Response) => {
  const { placeId, dateFrom, dateTo } = req.query;

  try {
    const movements = await getMovementsFiltered({
      placeId: placeId as string | undefined,
      dateFrom: dateFrom as string | undefined,
      dateTo: dateTo as string | undefined,
    });
    res.json(movements);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movements' });
  }
};

export default router;
