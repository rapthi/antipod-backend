import 'reflect-metadata';
import dotenv from 'dotenv';
import logger from './config/logger';
import { container } from './di/container';
import type { Server } from './server';
import { TYPES } from './types';

dotenv.config();

async function bootstrap() {
  const server = container.get<Server>(TYPES.Server);
  await server.start();
}

bootstrap().catch((err) => {
  logger.error('Failed to start app: ', err);
  process.exit(1);
});
