import { getRepository } from 'typeorm';
import { Course } from '../entities/Course';

export async function findById(id: number): Promise<Course> {
	return getRepository(Course).findOne(id);
}
