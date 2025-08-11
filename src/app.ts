import express from 'express';

import cors from 'cors';

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.use(cors({
//   origin: '*'
//   // origin: process.env.CORS_ORIGIN, // frontend origin
// //   credentials: true               // if you use cookies/auth
// }));

app.use(express.json());

import placeRoutes from './features/place/place.routes';
import inventoryRoutes from './features/inventory/inventory.routes';
import movementRoutes from './features/movement/movement.controller';
import driverRoutes from './features/driver/driver.routes';
import routeRoutes from './features/route/route.routes';
import routeStoreRoutes from './features/routestore/routestore.routes';

app.use('/api/places', placeRoutes); // Now available at /api/places
app.use('/api/inventories', inventoryRoutes);
app.use('/api/movements', movementRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/routestores', routeStoreRoutes);

app.use((req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.status(404).json({ message: "Not found" });
});

export default app;
