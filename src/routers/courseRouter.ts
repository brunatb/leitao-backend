import { Router } from 'express';
import * as courseController from '../controllers/courseController';

const router = Router();

router.get('', courseController.getCourses);
router.get('/exams', courseController.getExamsGroupedByCourse);

export default router;
