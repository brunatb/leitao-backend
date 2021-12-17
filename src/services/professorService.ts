import { getRepository } from 'typeorm';
import { Professor } from '../entities/Professor';
import ExamError from '../errors/ExamError';

export async function findById(id: number): Promise<Professor> {
	return getRepository(Professor).findOne(id);
}

export async function getExamsGroupedByProfessor(): Promise<Professor[]> {
	const exams = await getRepository(Professor).find({ relations: ['exams'] });
	if (!exams?.length) {
		throw new ExamError('There are no exams registered yet', 'NOT_FOUND');
	}
	return exams;
}
