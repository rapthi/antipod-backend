import { ItunesSearch } from '@rapthi/podca-ts';
import { Container } from 'inversify';
import Application from '../app';
import { ConfigService } from '../config/config';
import { PodcastController } from '../controllers/podcast.controller';
import { Server } from '../server';
import { PodcastService } from '../services/podcast.service';
import { TYPES } from '../types';

const container = new Container();

container.bind(TYPES.Application).to(Application).inSingletonScope();
container.bind(TYPES.Server).to(Server).inSingletonScope();

container
  .bind(TYPES.PodcastController)
  .to(PodcastController)
  .inSingletonScope();

container.bind(TYPES.Config).to(ConfigService).inSingletonScope();
container.bind(TYPES.PodcastService).to(PodcastService).inSingletonScope();

container.bind(TYPES.ItunesSearch).to(ItunesSearch).inSingletonScope();

export { container };
