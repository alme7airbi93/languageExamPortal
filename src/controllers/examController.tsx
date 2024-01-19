import ExamRepository from '../repositories/exam-repository';
import { ExamInterface } from '../Classes/Exams';

class ExamController {
  private examRepository: ExamRepository;

  constructor() {
    this.examRepository = new ExamRepository();
  }

  async addExam(exam: ExamInterface): Promise<ExamInterface> {
    try {
      const newExam = await this.examRepository.addExam(exam);
      return newExam;
    } catch (error) {
      console.error('Error adding exam: ', error);
      throw error;
    }
  }

  async getExams(): Promise<ExamInterface[]> {
    try {
      const exams = await this.examRepository.getExams();
      return exams;
    } catch (error) {
      console.error('Error getting exams: ', error);
      return [];
    }
  }

  async updateExam(exam: ExamInterface): Promise<void> {
    
    try {
      await this.examRepository.updateExam(exam);
    } catch (error) {
      console.error('Error updating exam: ', error);
      throw error;
    }
  }

  async deleteExam(examId: string): Promise<void> {
    try {
      await this.examRepository.deleteExam(examId);
    } catch (error) {
      console.error('Error deleting exam: ', error);
      throw error;
    }
  }
}

export default ExamController;
