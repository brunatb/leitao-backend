import { Request, Response, NextFunction } from 'express';
import StatusCode from '../enum/HttpStatus.enum';
import * as professorService from '../services/professorService';
import ExamError from '../errors/ExamError';

export async function getExamsGroupedByProfessor(
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<Response> {
	try {
		const exams = await professorService.getExamsGroupedByProfessor();
		return res.status(StatusCode.OK).send(exams);
	} catch (err) {
		if (err instanceof ExamError) {
			console.error(err.message);
			return res.status(err.statusCode).send(err.message);
		}
		next(err);
	}
}

export async function getProfessors(
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<Response> {
	try {
		const professors = await professorService.getAllProfessors();
		return res.status(StatusCode.OK).send(professors);
	} catch (err) {
		if (err instanceof ExamError) {
			console.error(err.message);
			return res.status(err.statusCode).send(err.message);
		}
		next(err);
	}
}
