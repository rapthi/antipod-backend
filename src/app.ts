import cors from '@elysiajs/cors';
import swagger from '@elysiajs/swagger';
import Elysia from 'elysia';
import logger from './config/logger';
import { podcastController } from './controllers/podcast.controller';

export const app = new Elysia()
  .use(cors())
  .use(swagger())
  .decorate('logger', logger)
  .group('/api', (app) => app.use(podcastController))
  .onError(({ code, error, set }) => {
    if (code === 'VALIDATION') {
      set.status = 400;
      return { status: 'error', message: error.all };
    }

    set.status = 500;
    return { status: 'error', message: error };
  })
  .listen(
    {
      port: Bun.env.PORT ?? 3000,
      maxRequestBodySize: Number.MAX_SAFE_INTEGER,
    },
    ({ port }) => {
      logger.info(`Listening on port: ${port}`);
    },
  );
