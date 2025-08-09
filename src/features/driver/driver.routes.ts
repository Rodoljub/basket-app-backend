import { Router } from 'express';
import {
  getAllDrivers,
  getDriverById,
  createDriver,
  updateDriver,
  deleteDriver,
  // updateDriverVan,
} from './driver.controller';

const router = Router();



router.get('/', getAllDrivers);
router.get('/:id', getDriverById);
router.post('/', createDriver);
// router.put('/:id', updateDriver);
router.patch('/:id', updateDriver)
router.delete('/:id', deleteDriver);

export default router;
