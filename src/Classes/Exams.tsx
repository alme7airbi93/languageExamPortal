// Exam Class
export class Exam {
  name: string;
  examQuestion: string;

  constructor(name: string, examQuestion: string) {
    this.name = name;
    this.examQuestion = examQuestion;
     // Prevent extensions after initializing properties
    Object.preventExtensions(this);
  }

}