import express from 'express';
import { errorHandler } from './middlewares/error.handler';
import podcastRoutes from './routes/podcast.routes';

const app = express();

app.use(express.json());

app.use('/api/podcasts', podcastRoutes);

app.use(errorHandler);

export default app;
