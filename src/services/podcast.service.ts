import type { ITunesSearchResponse, ItunesSearch } from '@rapthi/podca-ts';
import { inject, injectable } from 'inversify';
import logger from '../config/logger';
import { TYPES } from '../types';

@injectable()
export class PodcastService {
  constructor(
    @inject(TYPES.ItunesSearch)
    private itunesSearch: ItunesSearch,
  ) {}

  async searchPodcast(term: string): Promise<ITunesSearchResponse> {
    try {
      return await this.itunesSearch.search({
        term,
        media: 'podcast',
      });
    } catch (error) {
      logger.error('PodcastService: Search failed', error);
      throw new Error('Failed to search podcasts');
    }
  }
}
