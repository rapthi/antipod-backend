import express from 'express';
import { errorHandler } from './middlewares/error.handler';
import helloRoutes from './routes/hello.routes';

const app = express();

app.use(express.json());

app.use('/api', helloRoutes);

app.use(errorHandler);

export default app;
