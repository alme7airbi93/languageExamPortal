// ExamEnrollment Class
export class ExamEnrollment {
  studentID: string;
  examID: string;
  studentScore: string;
  openaiReplay: string[];

  constructor(
    studentID: string,
    examID: string,
    studentScore: string,
    openaiReplay?: string[]
  ) {
    this.studentID = studentID;
    this.examID = examID;
    this.studentScore = studentScore;
    this.openaiReplay = openaiReplay || [];
     // Prevent extensions after initializing properties
    Object.preventExtensions(this);
  }
}
