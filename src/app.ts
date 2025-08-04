import express from 'express';
import placeRoutes from './features/place/place.routes';

const app = express();
app.use(express.json());

app.use('/api/places', placeRoutes); // Now available at /api/places

export default app;
