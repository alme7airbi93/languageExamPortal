// Teacher page

import React, { useState } from 'react';
import { ExamInterface } from '../../Classes/Exams';
import { StudentScoreType } from '../../Classes/ExamEnroll';
import ExamForm from '../ExamForm';
import ExamList from '../ExamList';
import "./teacher.css"
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import CheckExam from '../CheckExam/checkExam';

const TeacherScreen: React.FC = () => {
  const [examEnrollments, setExamEnrollments] = useState<EnrollExamInterface>();
  
  const [selectedExam, setSelectedExam] = useState<ExamInterface>();

  const clearData = () => {
    console.log(examEnrollments);
    
  setExamEnrollments(undefined);
};

  return (
    <div className="teacher__container">
        <Row className="m-0">
          <Col xs={5} md={4} xl={3} className="p-0 m-0">
            <ExamList
              selectExam={(exam: ExamInterface) => setSelectedExam(exam)}
              examEnrollments={examEnrollments}
            />
          </Col>
          <Col xs={7} md={8} xl={9} className="p-0 m-0">
            <CheckExam
              selectedExam={selectedExam}
              examEnrollments={examEnrollments}
            />
          </Col>
        </Row>
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
  id: string;
}


