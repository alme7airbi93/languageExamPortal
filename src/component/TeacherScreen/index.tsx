// Teacher page

import React, { useState } from 'react';
import { ExamInterface } from '../../Classes/Exams';
import { StudentScoreType } from '../../Classes/ExamEnroll';
import ExamForm from '../ExamForm';
import ExamList from '../ExamList';
import "./teacher.css"


const TeacherScreen: React.FC = () => {
  const [examEnrollments, setExamEnrollments] = useState<EnrollExamInterface>();
  
  const [selectedExam, setSelectedExam] = useState<ExamInterface>();

  const clearData = () => {
    console.log(examEnrollments);
    
  setExamEnrollments(undefined);
};

  return (
      <div className='teacher__container'>
        <ExamForm 
          page='teacher' 
          selectedExam={selectedExam} 
          examEnrollments={undefined} 
          saveAnswer={()=> {return}} 
          clearData={clearData} />
        <ExamList 
          page="teacher"  
          selectExam={(exam:ExamInterface)=>setSelectedExam(exam)}
        />
       
      </div>
  );
};

export default TeacherScreen;


interface EnrollExamInterface {
  studentID: string;
  examID: string;
  studentScore: StudentScoreType;
  openaiReplay: string[];
  studentAnswer: string;
}


