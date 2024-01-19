import React, { useState } from 'react';
import EnrollExamController from '../../controllers/exam-enroll-controllor';
import './style.css';
import { ExamInterface } from '../../Classes/Exams';
import { StudentScoreType } from '../../Classes/ExamEnroll';
import ExamForm from '../ExamForm';
import ExamList from '../ExamList';
import { ExamEnrollment } from '../../Classes/ExamEnroll';

const AddStudent: React.FC = () => {
  const [examEnrollments, setExamEnrollments] = useState<EnrollExamInterface>();
  const [selectedExam, setSelectedExam] = useState<ExamInterface>();

  const enrollExamController = new EnrollExamController

  // const saveAnswer: React.FormEventHandler<HTMLFormElement> = async (event)=>{
   
  //   event.preventDefault();
  //   const answerValue = (event.currentTarget.elements.namedItem('answer') as HTMLTextAreaElement)?.value;
  //   // const examEnrollmentData: Omit<EnrollExamInterface, 'id'> = {
  //   //   studentID : "0123456789",
  //   //   examID:selectedExam!.id,
  //   //   studentScore: StudentScoreType.GOOD,
  //   //   openaiReplay: [],
  //   //   studentAnswer:answerValue,
  //   // }
  //     let studentID = "0123456789"
  //     let   examID =selectedExam!.id
  //     let  studentScore = StudentScoreType.GOOD
  //     const openaiReplay: string[] = [];
  //     let  studentAnswer =answerValue

  //   const examEnrollmentData = new ExamEnrollment( studentID ,examID,studentScore,openaiReplay,studentAnswer)
  //   if (selectedExam?.id) {
  //     const result = await enrollExamController.addExamEnrollment(examEnrollmentData);
  //         setExamEnrollments(result);
  //   } 
  // }
  const saveAnswer: React.FormEventHandler<HTMLFormElement> = async (event) => {
  event.preventDefault();
  const answerValue = (event.currentTarget.elements.namedItem('answer') as HTMLTextAreaElement)?.value;

  const studentID = "0123456789";
  const examID = selectedExam!.id;
  const studentScore = StudentScoreType.GOOD;
  const studentAnswer = answerValue;

  const openaiReplay = ["response1", "response2"]; 
const examEnrollmentData = new ExamEnrollment(studentID, examID, studentScore, studentAnswer, openaiReplay); 


  if (selectedExam?.id) {
    const result = await enrollExamController.addExamEnrollment(examEnrollmentData);
    setExamEnrollments(result);
  }
};


  const clearData = () => {
    setExamEnrollments(undefined);
  };

  return (
      <div className='student__container'>
        <ExamForm 
          page ='student'
          selectedExam={selectedExam} 
          saveAnswer={saveAnswer} 
          clearData={clearData} 
          examEnrollments={examEnrollments}
          />

        <ExamList page='student' selectExam={(exam:ExamInterface)=>setSelectedExam(exam)} />

      </div>
  );
};
interface EnrollExamInterface{
  studentID: string;
  examID: string;
  studentScore: StudentScoreType;
  openaiReplay: string[];
  studentAnswer:string;
  id:string
}

export default AddStudent;







