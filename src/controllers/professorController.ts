import { Request, Response, NextFunction } from 'express';
import StatusCode from '../enum/HttpStatus.enum';
import * as professorService from '../services/professorService';
import ExamError from '../errors/ExamError';
import idSchema from '../validations/idSchema';

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

export async function getProfessorsByCourseId(
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<Response> {
	try {
		const joiValidation = idSchema.validate(req.params); // TO-DO checkar essse number
		if (joiValidation.error) throw new ExamError(joiValidation.error.message);

		const { id } = req.params;

		const professorsList = await professorService.findAllByCourseId(Number(id));
		return res.status(StatusCode.OK).send(professorsList);
	} catch (err) {
		if (err instanceof ExamError) {
			console.error(err.message);
			return res.status(err.statusCode).send(err.message);
		}
		next(err);
	}
}
