// src/features/place/place.controller.ts
import { Request, Response } from 'express';
import { placeService } from './place.service';
import { PlaceType } from '@prisma/client';

export const placeController = {
  async getAll(req: Request, res: Response) {
    const places = await placeService.getAll();
    res.json(places);
  },

   async getWarehousesAndStores(req: Request, res: Response) {
    try {
      const places = await placeService.getWarehousesAndStores();
      res.json(places);
    } catch (error) {
      console.error('Failed to get warehouses and stores:', error);
      res.status(500).json({ error: 'Failed to fetch places' });
    }
  },

  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const place = await placeService.getById(id);
    if (!place) return res.status(404).json({ error: 'Place not found' });
    res.json(place);
  },

  async getByType(req: Request, res: Response) {
    const type = req.query.type as PlaceType;
    
    const place = await placeService.getByType(type);
    if (!place) return res.status(404).json({ error: 'Place not found' });
    res.json(place);
  },

  async create(req: Request, res: Response) {
    const data = req.body;
    const newPlace = await placeService.create(data);
    res.status(201).json(newPlace);
  },

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = req.body;
    const updated = await placeService.update(id, data);
    res.json(updated);
  },

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    await placeService.delete(id);
    res.status(204).send();
  }
};
