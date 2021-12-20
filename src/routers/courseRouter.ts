import { Router } from 'express';
import * as courseController from '../controllers/courseController';

const router = Router();

router.get('', courseController.getExamsGroupedByCourse);

export default router;
