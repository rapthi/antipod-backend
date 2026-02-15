import { ItunesSearch } from '@rapthi/podca-ts';
import Elysia, { t } from 'elysia';
import { PodcastService } from '../services/podcast.service';

export const podcastController = new Elysia({ prefix: '/podcasts' })
  .decorate('podcastService', new PodcastService(new ItunesSearch()))
  .get(
    '/search',
    async ({ query: { term }, podcastService }) => {
      return await podcastService.search(term);
    },
    {
      query: t.Object({
        term: t.String(),
      }),
    },
  );
