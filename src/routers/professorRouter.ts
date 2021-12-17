import { Router } from 'express';
import * as professorController from '../controllers/professorController';

const router = Router();

router.get('', professorController.getExamsGroupedByProfessor);

export default router;
