import { getRepository } from 'typeorm';
import { Professor } from '../entities/Professor';

export async function findById(id: number): Promise<Professor> {
	return getRepository(Professor).findOne(id);
}

export async function getExamsGroupedByProfessor(): Promise<Professor[]> {
	const query = await getRepository(Professor).find({ relations: ['exams'] });
	return query;
}
