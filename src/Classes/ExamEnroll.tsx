export enum StudentScoreType {
  PENDING = "PENDING",
  POOR = "ضعيف",
  GOOD = "جيد",
  VERY_GOOD = "جيد جدا",
  EXCELLENT = "ممتاز",
}

// // ExamEnrollment Class
// export class ExamEnrollment {
//   studentID: string;
//   examID: string;
//   studentScore: StudentScoreType;
//   openaiReplay: string[];
//   studentAnswer:string;
//   id!:string;

//   constructor(
//     studentID: string,
//     examID: string,
//     studentScore: StudentScoreType,
//      studentAnswer:string,
//      openaiReplay: string[]

//   ) {
//     this.id;
//     this.studentID = studentID;
//     this.examID = examID;
//     this.studentAnswer = studentAnswer;
//     this.studentScore = studentScore ||StudentScoreType.GOOD;
//     this.openaiReplay = openaiReplay || [];
//      // Prevent extensions after initializing properties
//     Object.preventExtensions(this);
//   }
// }


export interface EnrollExamInterface {
  studentID: string;
  examID: string;
  studentScore: StudentScoreType;
  openaiReplay: MessageInterface[];
  studentAnswer:string;
  id : string;

}

export interface MessageInterface {
  role: "system" | "user" | "assistant";
  content: string;
}

export class ExamEnrollment {
  studentID: string;
  examID: string;
  studentScore: StudentScoreType;
  openaiReplay: MessageInterface[]; 
  studentAnswer:string;
  id!:string;

  constructor(
    studentID: string,
    examID: string,
    studentScore: StudentScoreType,
     studentAnswer:string,
     openaiReplay: MessageInterface[] 
  ) {
    this.id;
    this.studentID = studentID;
    this.examID = examID;
    this.studentAnswer = studentAnswer;
    this.studentScore = studentScore ||StudentScoreType.GOOD;
    this.openaiReplay = openaiReplay || []; 
    Object.preventExtensions(this);
  }
}