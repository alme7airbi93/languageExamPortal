import EnrollExamRepository from '../repositories/enroll-exam-repository'
import { EnrollExamInterface } from '../Classes/ExamEnroll';

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
      throw error;
    }
  }
  async addExamEnrollment(examEnrollmentData: EnrollExamInterface): Promise<EnrollExamInterface> {
  try {
    const enrollment = await this.enrollExamRepository.addExamEnrollment(examEnrollmentData);
    return enrollment;
  } catch (error) {
    console.error('Error adding exam enrollment: ', error);
    throw error;
  }
}

  async updateExamEnrollment(examEnrollmentID:string, examEnrollmentData: EnrollExamInterface): Promise<void> {
    try {
      await this.enrollExamRepository.updateExamEnrollment(examEnrollmentID,examEnrollmentData);
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

   async fetchSelectedExamEnrollments(examID:string): 
   Promise<EnrollExamInterface[]> {
    try {
      const enrollments = await this.enrollExamRepository.getSelectedExamEnrollment(examID);
      
      return enrollments
    } catch (error) {
      console.error('Error fetching exam enrollments: ', error);
      throw error;
    }
  }

}

export default EnrollExamController;
