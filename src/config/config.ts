import { injectable } from 'inversify';

export interface Config {
  port: number;
  nodeEnv: string;
}

@injectable()
export class ConfigService {
  private readonly config: Config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
  };

  public getConfig(): Config {
    return this.config;
  }
}
