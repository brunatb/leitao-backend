import { getRepository } from 'typeorm';

import { Exam } from '../../src/entities/Exam';
import { Professor } from '../../src/entities/Professor';
import { Course } from '../../src/entities/Course';

export async function clearDatabase() {
	await getRepository(Exam).delete({});
	await getRepository(Course).delete({});
	await getRepository(Professor).delete({});
}
