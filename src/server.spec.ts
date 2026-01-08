import "reflect-metadata";
import type Application from "./app";
import type { ConfigService } from "./config/config";
import type { PodcastController } from "./controllers/podcast.controller";
import { Server } from "./server";

describe("Server", () => {
  let server: Server;
  let mockApp: jest.Mocked<Application>;
  let mockConfig: jest.Mocked<ConfigService>;
  let mockPodcastController: jest.Mocked<PodcastController>;
  let mockExpressApp: { use: jest.Mock };

  beforeEach(() => {
    mockExpressApp = {
      use: jest.fn(),
    };

    mockApp = {
      getApp: jest.fn().mockReturnValue(mockExpressApp),
      listen: jest.fn(),
    } as unknown as jest.Mocked<Application>;

    mockConfig = {
      getConfig: jest.fn().mockReturnValue({ port: 3000 }),
    } as unknown as jest.Mocked<ConfigService>;

    mockPodcastController = {
      // biome-ignore lint/suspicious/noExplicitAny: ignored using `--suppress`
      router: {} as any,
    } as unknown as jest.Mocked<PodcastController>;

    server = new Server(mockApp, mockConfig, mockPodcastController);
  });

  it("should setup routes and start listening", async () => {
    await server.start();

    expect(mockExpressApp.use).toHaveBeenCalledWith(
      "/api/podcasts",
      mockPodcastController.router,
    );
    expect(mockApp.listen).toHaveBeenCalledWith(3000);
  });
});
