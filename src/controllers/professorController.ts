import { Request, Response, NextFunction } from 'express';
import StatusCode from '../enum/HttpStatus.enum';
import * as professorService from '../services/professorService';

export async function getExamsGroupedByProfessor(
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<Response> {
	try {
		const exams = await professorService.getExamsGroupedByProfessor();
		return res.status(StatusCode.OK).send(exams);
	} catch (err) {
		next(err);
	}
}
