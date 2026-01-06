import express from 'express';
import logger from './config/logger';
import { errorHandler } from './middlewares/error.handler';

export default class Application {
  private readonly app: express.Application;

  constructor() {
    this.app = express();
    this.setupMiddlewares();
  }

  getApp() {
    return this.app;
  }

  private setupMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(errorHandler);
    this.app.use(express.urlencoded({ extended: true }));
  }

  listen(port: number) {
    return this.app.listen(port, () =>
      logger.info(`App listening on port ${port}`),
    );
  }
}
