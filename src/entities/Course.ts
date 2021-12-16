import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Professor } from './Professor';

@Entity('courses')
export class Course {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('text')
	name: string;

	@ManyToOne(() => Professor, (professor) => professor.courses)
	@JoinColumn({ name: 'professor_id' }) //TO-DO ver se precisa disso msm
	professor: Professor;
}
