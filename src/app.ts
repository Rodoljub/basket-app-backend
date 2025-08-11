import express from 'express';
import cors from 'cors';

// Import routes after middleware setup
import placeRoutes from './features/place/place.routes';
import inventoryRoutes from './features/inventory/inventory.routes';
import movementRoutes from './features/movement/movement.controller';
import driverRoutes from './features/driver/driver.routes';
import routeRoutes from './features/route/route.routes';
import routeStoreRoutes from './features/routestore/routestore.routes';

const app = express();

// Request logging middleware (optional, keep if helpful)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// CORS middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*', // allow all if not set
  methods: ['GET', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
}));

// JSON body parser
app.use(express.json());

// Routes
app.use('/api/places', placeRoutes);
app.use('/api/inventories', inventoryRoutes);
app.use('/api/movements', movementRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/routestores', routeStoreRoutes);


// 404 handler for unmatched routes (important for CORS preflight)
app.use((_req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

export default app;
