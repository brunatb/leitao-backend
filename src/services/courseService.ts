import { getRepository } from 'typeorm';
import { Course } from '../entities/Course';
import ExamError from '../errors/ExamError';

export async function findById(id: number): Promise<Course> {
	return getRepository(Course).findOne(id);
}

export async function getExamsGroupedByCourse(): Promise<Course[]> {
	const exams = await getRepository(Course).find({ relations: ['exams'] });
	if (!exams?.length) {
		throw new ExamError('There are no exams registered yet', 'NOT_FOUND');
	}
	return exams;
}
