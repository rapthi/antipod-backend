import { ItunesSearch } from '@rapthi/podca-ts';
import type { Request, Response } from 'express';
import logger from '../config/logger';
import type { SearchPodcastQuery } from '../schemas/podcast.schema';

export const searchPodcast = async (req: Request, res: Response) => {
  try {
    const { term } = req.query as SearchPodcastQuery;
    logger.info(`Will search for ${term}`);

    const searcher = new ItunesSearch();
    const results = await searcher.search({
      term,
      media: 'podcast',
    });

    logger.info('Found results', results);
    return res.status(200).json(results);
  } catch (error) {
    logger.error('An error occurred during podcast search: ', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred during podcast search.',
    });
  }
};
