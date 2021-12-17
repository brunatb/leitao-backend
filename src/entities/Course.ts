import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('courses')
export class Course {
	@PrimaryGeneratedColumn({ name: 'course_id' })
	id: number;

	@Column('text')
	name: string;

	// @ManyToOne(() => Professor, (professor) => professor.courses)
	// @JoinColumn({ name: 'professor_id' }) //TO-DO ver se precisa disso msm
	// professor: Professor;
}
