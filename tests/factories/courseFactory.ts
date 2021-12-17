import { getRepository } from 'typeorm';
import faker from 'faker';

import { Course } from '../../src/entities/Course';

export async function createCourse(name?: string) {
	const course = getRepository(Course).create({
		name: name || faker.name.jobArea(),
	});

	await getRepository(Course).save(course);

	return course;
}
