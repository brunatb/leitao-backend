import { getRepository } from 'typeorm';
import { Course } from '../entities/Course';
import ExamError from '../errors/ExamError';

export async function findById(id: number): Promise<Course> {
	const course = await getRepository(Course).findOne(id);
	if (!course) {
		throw new ExamError(`There is no course with id = ${id}`, 'NOT_FOUND');
	}

	return course;
}

export async function getExamsGroupedByCourse(): Promise<Course[]> {
	const exams = await getRepository(Course).find({ relations: ['exams'] });
	if (!exams?.length) {
		throw new ExamError('There are no exams registered yet', 'NOT_FOUND');
	}
	return exams;
}

export async function getAllCourses(): Promise<Course[]> {
	const courses = await getRepository(Course).find();
	if (!courses?.length) {
		throw new ExamError('There are no exams registered yet', 'NOT_FOUND');
	}
	return courses;
}
