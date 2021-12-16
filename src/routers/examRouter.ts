import { Router } from 'express';
import * as examController from '../controllers/examController';

const router = Router();

router.post('/create', examController.postExam);

export default router;
