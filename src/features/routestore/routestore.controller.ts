import { Request, Response } from 'express';
import * as routeStoreService from './routestore.service';

export const getAllRouteStores = async (_req: Request, res: Response) => {
  const result = await routeStoreService.getAll();
  res.json(result);
};

export const getById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await routeStoreService.getById(id);
  if (!result) return res.status(404).json({ error: 'Not found' });
  res.json(result);
};

export const create = async (req: Request, res: Response) => {
  const { routeId, placeId, order } = req.body;
  const result = await routeStoreService.create({ 
    routeId: Number(routeId),
    placeId: Number(placeId)
  });
  res.status(201).json(result);
};

export const update = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { routeId, placeId, order } = req.body;
  const result = await routeStoreService.update(id, { routeId, placeId, order });
  if (!result) return res.status(404).json({ error: 'Not found' });
  res.json(result);
};

export const remove = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const ok = await routeStoreService.remove(id);
  if (!ok) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
};


export const getByRouteId = async (req: Request, res: Response) => {
  const routeId = Number(req.params.routeId);
  if (isNaN(routeId)) return res.status(400).json({ error: 'Invalid routeId' });

  const result = await routeStoreService.getByRouteId(routeId);
  res.json(result);
};

export const bulkReorder = async (req: Request, res: Response) => {
  const updates: { id: number; order: number }[] = req.body;

  if (!Array.isArray(updates)) {
    return res.status(400).json({ error: 'Invalid input. Expected array.' });
  }

  try {
    const result = await routeStoreService.bulkReorder(updates);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Bulk reorder failed', detail: err });
  }
};

export const insertAtOrder = async (req: Request, res: Response) => {
  try {
    const dto = req.body; // Expecting routeId, placeId, order

    if (
      typeof dto.routeId !== 'number' ||
      typeof dto.placeId !== 'number' ||
      typeof dto.order !== 'number'
    ) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const inserted = await routeStoreService.insertAtOrder(dto);
    res.json(inserted);
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to insert at order' });
  }
};

export const moveToOrder = async (req: Request, res: Response) => {
  try {
    const { id, newOrder } = req.body;

    if (typeof id !== 'number' || typeof newOrder !== 'number') {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const updated = await routeStoreService.moveToOrder({ id, newOrder });
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to move RouteStore' });
  }
};

export const getOrderedRouteStores = async (req: Request, res: Response) => {
  try {
    const routeId = parseInt(req.params.routeId);

    if (isNaN(routeId)) {
      return res.status(400).json({ error: 'Invalid routeId' });
    }

    const stores = await routeStoreService.getOrderedRouteStores(routeId);
    res.json(stores);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to get route stores' });
  }
};





