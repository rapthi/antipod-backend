import { inject, injectable } from 'inversify';
import type Application from './app';
import type { ConfigService } from './config/config';
import type { PodcastController } from './controllers/podcast.controller';
import { TYPES } from './types';

@injectable()
export class Server {
  constructor(
    @inject(TYPES.Application)
    private readonly app: Application,
    @inject(TYPES.Config)
    private readonly config: ConfigService,
    @inject(TYPES.PodcastController)
    private readonly podcastController: PodcastController,
  ) {}

  async start() {
    const expressApp = this.app.getApp();
    expressApp.use('/api/podcasts', this.podcastController.router);
    this.app.listen(this.config.getConfig().port);
  }
}
