import { Request, Response } from 'express';
import {RouteService} from './route.service';

export const getAllRoutes = async (_req: Request, res: Response) => {
  const routes = await RouteService.getAllRoutes();
  res.json(routes);
};

export const getRouteById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const route = await RouteService.getRouteById(id);
  if (!route) return res.status(404).json({ error: 'Route not found' });
  res.json(route);
};

export const createRoute = async (req: Request, res: Response) => {
  const { name } = req.body;
  const route = await RouteService.createRoute(name);
  res.status(201).json(route);
};

export const updateRoute = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, driverId } = req.body;
  const updated = await RouteService.updateRoute(id, name, driverId);
  if (!updated) return res.status(404).json({ error: 'Route not found' });
  res.json(updated);
};

export const deleteRoute = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deleted = await RouteService.deleteRoute(id);
  if (!deleted) return res.status(404).json({ error: 'Route not found' });
  res.json({ message: 'Route deleted' });
};
