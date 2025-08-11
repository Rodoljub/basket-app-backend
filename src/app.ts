import express from 'express';
import placeRoutes from './features/place/place.routes';
import inventoryRoutes from './features/inventory/inventory.routes';
import movementRoutes from './features/movement/movement.controller';
import driverRoutes from './features/driver/driver.routes';
import routeRoutes from './features/route/route.routes';
import routeStoreRoutes from './features/routestore/routestore.routes';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN, // frontend origin
//   credentials: true               // if you use cookies/auth
}));

app.use(express.json());

app.use('/api/places', placeRoutes); // Now available at /api/places
app.use('/api/inventories', inventoryRoutes);
app.use('/api/movements', movementRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/routestores', routeStoreRoutes);

export default app;
