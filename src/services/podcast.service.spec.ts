import 'reflect-metadata';
import type { ItunesSearch } from '@rapthi/podca-ts';
import { PodcastService } from './podcast.service';

describe('PodcastService', () => {
  let service: PodcastService;
  let mockItunesSearch: jest.Mocked<ItunesSearch>;

  beforeEach(() => {
    mockItunesSearch = {
      search: jest.fn(),
    } as unknown as jest.Mocked<ItunesSearch>;

    service = new PodcastService(mockItunesSearch);
  });

  it('should return podcasts when search is successful', async () => {
    const mockResponse = {
      resultCount: 1,
      results: [{ collectionName: 'Test Podcast' }],
    // biome-ignore lint/suspicious/noExplicitAny: ignored using `--suppress`
    } as any;
    mockItunesSearch.search.mockResolvedValue(mockResponse);

    const result = await service.searchPodcast('tech');

    expect(result).toEqual(mockResponse);
    expect(mockItunesSearch.search).toHaveBeenCalledWith({
      term: 'tech',
      media: 'podcast',
    });
  });

  it('should throw an error when search fails', async () => {
    mockItunesSearch.search.mockRejectedValue(new Error('API Error'));

    await expect(service.searchPodcast('error')).rejects.toThrow(
      'Failed to search podcasts',
    );
  });
});
