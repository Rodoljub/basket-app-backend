import { Request, Response } from 'express';
import { InventoryService } from './inventory.service';

export const InventoryController = {
  getAll: async (_req: Request, res: Response) => {
    const data = await InventoryService.getAll();
    res.json(data);
  },

  getById: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const item = await InventoryService.getById(id);
    if (!item) return res.status(404).json({ message: 'Inventory not found' });
    res.json(item);
  },

  create: async (req: Request, res: Response) => {
    const { placeId, basketType, quantity } = req.body;
    if (!placeId || !basketType || quantity == null) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const newInventory = await InventoryService.create({ placeId, basketType, quantity });
    res.status(201).json(newInventory);
  },

  update: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { quantity } = req.body;
    if (quantity == null) {
      return res.status(400).json({ message: 'Quantity is required' });
    }
    const updated = await InventoryService.update(id, { quantity });
    res.json(updated);
  },

  delete: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await InventoryService.delete(id);
    res.status(204).send();
  },

  getInventoryByPlaceId: async (req: Request, res: Response) => {
  const placeId = req.params.placeId;

  try {
    const inventory = await InventoryService.getInventoryByPlaceId(placeId);
    res.json({ placeId, inventory });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
}
};
