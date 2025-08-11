// app.ts
import express from 'express';
import cors from 'cors';

const app = express();

import fs from 'fs';
import path from 'path';

// Define log file path (in project root or /logs folder)
const logFilePath = path.join(process.cwd(), 'requests.log');

app.use((req, res, next) => {
  const logLine = `${new Date().toISOString()} ${req.method} ${req.url}\n`;
  fs.appendFile(logFilePath, logLine, (err) => {
    if (err) {
      console.error('Failed to write log:', err);
    }
  });
  next();
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ✅ Use cors middleware before routes
app.use(cors({
  origin: '*', // Or: process.env.CORS_ORIGIN if you want to restrict
  methods: ['GET', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
}));

// ✅ Parse incoming JSON
app.use(express.json());

app.get('/health', (req, res) => {
  res.send('OK');
});

// Routes
import placeRoutes from './features/place/place.routes';
import inventoryRoutes from './features/inventory/inventory.routes';
import movementRoutes from './features/movement/movement.controller';
import driverRoutes from './features/driver/driver.routes';
import routeRoutes from './features/route/route.routes';
import routeStoreRoutes from './features/routestore/routestore.routes';

app.use('/api/places', placeRoutes);
app.use('/api/inventories', inventoryRoutes);
app.use('/api/movements', movementRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/routestores', routeStoreRoutes);

// ✅ 404 handler (important for CORS preflight on missing routes)
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

export default app;




