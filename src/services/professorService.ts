import { getRepository } from 'typeorm';
import { Professor } from '../entities/Professor';

export async function find(id: number): Promise<Professor> {
	return getRepository(Professor).findOne(id);
}
