import { getRepository } from 'typeorm';
import { Professor } from '../entities/Professor';
import ExamError from '../errors/ExamError';

export async function findById(id: number): Promise<Professor> {
	const professors = await getRepository(Professor).find();
	if (!professors?.length) {
		throw new ExamError(`There is no Professor with id = ${id}`, 'NOT_FOUND');
	}
	return getRepository(Professor).findOne(id);
}

export async function getExamsGroupedByProfessor(): Promise<Professor[]> {
	const exams = await getRepository(Professor).find({ relations: ['exams'] });
	if (!exams?.length) {
		throw new ExamError('There are no exams registered yet', 'NOT_FOUND');
	}
	return exams;
}

export async function getAllProfessors() {
	const professors = await getRepository(Professor).find();
	if (!professors?.length) {
		throw new ExamError('There are no professors registered yet', 'NOT_FOUND');
	}

	return professors;
}
