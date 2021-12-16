import { getRepository } from 'typeorm';
import { Professor } from '../entities/Professor';

export async function findById(id: number): Promise<Professor> {
	return getRepository(Professor).findOne(id);
}
