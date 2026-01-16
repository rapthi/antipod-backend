import type { ITunesSearchResponse, ItunesSearch } from '@rapthi/podca-ts';
import logger from '../config/logger';

export class PodcastService {
  constructor(private itunesSearch: ItunesSearch) {}

  async search(term: string): Promise<ITunesSearchResponse> {
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
