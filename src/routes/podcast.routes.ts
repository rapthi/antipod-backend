import { Router } from 'express';
import { searchPodcast } from '../controllers/podcast.controller';
import { validate } from '../middlewares/validate.middleware';
import { searchPodcastQuerySchema } from '../schemas/podcast.schema';

const router = Router();

router.get('/search', validate(searchPodcastQuerySchema), searchPodcast);

export default router;
