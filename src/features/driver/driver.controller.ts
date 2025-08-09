import { Request, Response } from 'express';
import { DriverService }  from './driver.service';
import { Driver } from '@prisma/client';

export const getAllDrivers = async (_req: Request, res: Response) => {
  const drivers = await DriverService.getAllDrivers();
  res.json(drivers);
};

export const getDriverById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const driver = await DriverService.getDriverById(id);
  if (!driver) return res.status(404).json({ error: 'Driver not found' });
  res.json(driver);
};

export const createDriver = async (req: Request, res: Response) => {
  const driver = await DriverService.createDriver(req.body.name);
  res.status(201).json(driver);
};

// export const updateDriver = async (req: Request, res: Response) => {
//   const id = Number(req.params.id);
//   const updated = await DriverService.updateDriver(id, req.body.name);
//   if (!updated) return res.status(404).json({ error: 'Driver not found' });
//   res.json(updated);
// };

export const updateDriver = async (req: Request, res: Response) => {
const driverId = Number(req.params.id);
  const data = req.body as Driver; // could contain vanId or other fields
console.log("konsola", data)
  const updated = await DriverService.updateDriver(driverId, data)
  if (!updated) return res.status(404).json({ error: 'Driver not found' });
  res.json(updated);
}

export const deleteDriver = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deleted = await DriverService.deleteDriver(id);
  if (!deleted) return res.status(404).json({ error: 'Driver not found' });
  res.json({ message: 'Driver deleted' });
};
