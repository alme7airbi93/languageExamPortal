export enum StudentScoreType {

  POOR = 'POOR',
  GOOD = 'GOOD',
  VERY_GOOD = 'VERY GOOD',
  EXCELLENT = 'EXCELLENT'
}

// ExamEnrollment Class
export class ExamEnrollment {
  studentID: string;
  examID: string;
  studentScore: StudentScoreType;
  openaiReplay: string[];
  studentAnswer:string;
  id!:string;

  constructor(
    studentID: string,
    examID: string,
    studentScore: StudentScoreType,
     studentAnswer:string,
    openaiReplay?: string[]

  ) {
    this.id;
    this.studentID = studentID;
    this.examID = examID;
    this.studentAnswer = studentAnswer;
    this.studentScore = studentScore;
    this.openaiReplay = openaiReplay || [];
     // Prevent extensions after initializing properties
    Object.preventExtensions(this);
  }
}


export interface EnrollExamInterface {
  studentID: string;
  examID: string;
  studentScore: StudentScoreType;
  openaiReplay: string[];
  studentAnswer:string;
  id:string
}