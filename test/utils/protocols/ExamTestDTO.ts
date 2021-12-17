import Category from '../../../src/enum/Category.enum';

interface ExamTestDTO {
	name?: string;
	pdfLink?: string;
	category?: Category;
	courseId?: number;
	professorId?: number;
}
export default ExamTestDTO;
