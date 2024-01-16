// Exam Class
export class Exam {
  name: string;
  examQuestion: string;
  id!:string

  constructor(name: string, examQuestion: string) {
    this.id
    this.name = name;
    this.examQuestion = examQuestion;
     // Prevent extensions after initializing properties
    Object.preventExtensions(this);
  }
}

export interface ExamInterface {
  name: string;
  examQuestion: string;
  id : string;
}