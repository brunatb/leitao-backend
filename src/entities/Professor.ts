import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Course } from './Course';

@Entity('professors')
export class Professor {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('text')
	name: string;

	@OneToMany(() => Course, (course) => course.professor)
	courses: Course[];
}
