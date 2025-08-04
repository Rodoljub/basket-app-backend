import express from 'express';
import cors from 'cors';

import placeRoutes from './routes/place.routes.js';
import transferRoutes from './routes/transfer.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/places', placeRoutes);
app.use('/transfers', transferRoutes);

app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});
