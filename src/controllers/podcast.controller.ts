import { type Request, type Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import logger from '../config/logger';
import type { PodcastService } from '../services/podcast.service';
import { TYPES } from '../types';

@injectable()
export class PodcastController {
  public readonly router = Router();

  constructor(
    @inject(TYPES.PodcastService)
    private readonly podcastService: PodcastService,
  ) {
    this.router.get('/search', this.searchPodcast.bind(this));
  }

  async searchPodcast(request: Request, response: Response) {
    try {
      const podcastResult = await this.podcastService.searchPodcast(
        request.query.term as string,
      );
      logger.info('podcastResult', podcastResult);
      return response.status(200).json(podcastResult);
    } catch (error) {
      logger.error('An error occurred during podcast search: ', error);
      response.status(500).json({
        error: 'Internal Server Error',
        message: 'An unexpected error occurred during podcast search.',
      });
    }
  }
}
