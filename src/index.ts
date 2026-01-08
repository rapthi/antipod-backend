import 'reflect-metadata';
import dotenv from 'dotenv';
import { prisma } from '../lib/prisma';
import logger from './config/logger';
import { container } from './di/container';
import type { Server } from './server';
import { TYPES } from './types';

dotenv.config();

async function bootstrap() {
  const server = container.get<Server>(TYPES.Server);
  await server.start();
}

bootstrap()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    logger.error('Failed to start app: ', err);
    await prisma.$disconnect();
    process.exit(1);
  });
