import "reflect-metadata";
import type { Request, Response } from "express";
import type { PodcastService } from "../services/podcast.service";
import { PodcastController } from "./podcast.controller";

describe("PodcastController", () => {
  let controller: PodcastController;
  let mockPodcastService: jest.Mocked<PodcastService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockPodcastService = {
      searchPodcast: jest.fn(),
    } as unknown as jest.Mocked<PodcastService>;

    controller = new PodcastController(mockPodcastService);

    mockRequest = {
      query: { term: "science" },
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it("should respond with 200 and data when service succeeds", async () => {
    // biome-ignore lint/suspicious/noExplicitAny: ignored using `--suppress`
    const mockData = { results: [] } as any;
    mockPodcastService.searchPodcast.mockResolvedValue(mockData);

    await controller.searchPodcast(
      mockRequest as Request,
      mockResponse as Response,
    );

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockData);
  });

  it("should respond with 500 when service fails", async () => {
    mockPodcastService.searchPodcast.mockRejectedValue(
      new Error("Service Failure"),
    );

    await controller.searchPodcast(
      mockRequest as Request,
      mockResponse as Response,
    );

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: "Internal Server Error",
      }),
    );
  });
});
