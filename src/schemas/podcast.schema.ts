import { z } from 'zod';

export const searchPodcastQuerySchema = z.object({
  term: z.string().min(3),
});

export type SearchPodcastQuery = z.infer<typeof searchPodcastQuerySchema>;
