import { beforeEach, describe, expect, it, mock } from 'bun:test';
import { PodcastService } from './podcast.service';

describe('PodcastService', () => {
  let service: PodcastService;
  let mockItunesSearch: any;

  beforeEach(() => {
    mockItunesSearch = {
      search: mock(),
    } as unknown as any;

    service = new PodcastService(mockItunesSearch);
  });

  it('should return podcasts when search is successful', async () => {
    const mockResponse = {
      resultCount: 1,
      results: [{ collectionName: 'Test Podcast' }],
      // biome-ignore lint/suspicious/noExplicitAny: ignored using `--suppress`
    } as any;
    mockItunesSearch.search.mockResolvedValue(mockResponse);

    const result = await service.search('tech');

    expect(result).toEqual(mockResponse);
    expect(mockItunesSearch.search).toHaveBeenCalledWith({
      term: 'tech',
      media: 'podcast',
    });
  });

  it('should throw an error when search fails', async () => {
    mockItunesSearch.search.mockRejectedValue(new Error('API Error'));

    await expect(service.search('error')).rejects.toThrow(
      'Failed to search podcasts',
    );
  });
});
