import { Router } from 'express';
import { getHello } from '../controllers/hello.controller';

const router = Router();

router.get('/hello', getHello);

export default router;
