import { getRepository } from 'typeorm';
import faker from 'faker';

import { Professor } from '../../src/entities/Professor';
import { Course } from '../../src/entities/Course';
import { createCourse } from './courseFactory';

export async function createProfessor(courses?: Course[], name?: string): Promise<Professor> {
	const professor = getRepository(Professor).create({
		name: name || faker.name.prefix() + ' ' + faker.name.findName(),
		courses: courses || [await createCourse()],
	});

	await getRepository(Professor).save(professor);

	return professor;
}
