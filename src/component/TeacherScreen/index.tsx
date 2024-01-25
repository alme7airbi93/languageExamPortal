// Teacher page

import React, { useState } from 'react';
import { ExamInterface } from '../../Classes/Exams';
import { StudentScoreType } from '../../Classes/ExamEnroll';
import ExamForm from '../ExamForm';
import ExamList from '../ExamList';
import "./teacher.css"
import { Container, Row, Col, Button, Modal } from "react-bootstrap";

const TeacherScreen: React.FC = () => {
  const [examEnrollments, setExamEnrollments] = useState<EnrollExamInterface>();
  
  const [selectedExam, setSelectedExam] = useState<ExamInterface>();

  const clearData = () => {
    console.log(examEnrollments);
    
  setExamEnrollments(undefined);
};

  return (
      <div className='teacher__container'>
        <Container>
        <Row className="">
          <Col xs={5} md={4} xl={3} className="p-0 m-0">
            <ExamList
              selectExam={(exam: ExamInterface) => setSelectedExam(exam)}
              examEnrollments={examEnrollments}
            />
          </Col>
          <Col xs={7} md={8} xl={9} className="p-0 m-0">
           {/*  {loading && <Loader />}
            <ExamForm
              page="student"
              selectedExam={selectedExam}
              saveAnswer={saveAnswer}
              clearData={clearData}
              examEnrollments={examEnrollments}
              answer={answer}
              setAnswer={setAnswer}
            />
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton dir="ltr">
                <Modal.Title>Exam Submission</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Your answer is submitted. Select the next exam from exam list
              </Modal.Body>
              <Modal.Footer className="d-flex justify-content-start">
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>*/}
          </Col> 
        </Row>
      </Container>
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


