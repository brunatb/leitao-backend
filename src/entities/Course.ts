import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Exam } from './Exam';

@Entity('courses')
export class Course {
	@PrimaryGeneratedColumn({ name: 'course_id' })
	id: number;

	@Column('text')
	name: string;

	@OneToMany(() => Exam, exam => exam.course)
	exams: Exam[];
}
