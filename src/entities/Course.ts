import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('courses')
export class Course {
	@PrimaryGeneratedColumn({ name: 'course_id' })
	id: number;

	@Column('text')
	name: string;
}
