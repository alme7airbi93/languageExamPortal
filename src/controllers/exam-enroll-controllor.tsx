import EnrollExamRepository from '../repositories/enroll-exam-repository'
import { EnrollExamInterface } from '../classes/ExamEnroll';

class EnrollExamController {
  private enrollExamRepository: EnrollExamRepository;

  constructor() {
    this.enrollExamRepository = new EnrollExamRepository();
  }

  async fetchExamEnrollments(): Promise<EnrollExamInterface[]> {
    try {
      const enrollments = await this.enrollExamRepository.getExamEnrollments();
      return enrollments;
    } catch (error) {
      console.error('Error fetching exam enrollments: ', error);
      return [];
    }
  }

  async addExamEnrollment(examEnrollmentData: EnrollExamInterface): Promise<void> {
    try {
      await this.enrollExamRepository.addExamEnrollment(examEnrollmentData);
    } catch (error) {
      console.error('Error adding exam enrollment: ', error);
    }
  }

  async updateExamEnrollment(examEnrollmentData: EnrollExamInterface): Promise<void> {
    try {
      await this.enrollExamRepository.updateExamEnrollment(examEnrollmentData);
    } catch (error) {
      console.error('Error updating exam enrollment: ', error);
    }
  }

  async deleteExamEnrollment(examEnrollmentId: string): Promise<void> {
    try {
      await this.enrollExamRepository.deleteExamEnrollment(examEnrollmentId);
    } catch (error) {
      console.error('Error deleting exam enrollment: ', error);
    }
  }
}

export default EnrollExamController;
