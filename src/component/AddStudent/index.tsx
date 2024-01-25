import React, { useState } from "react";
import EnrollExamController from "../../controllers/exam-enroll-controllor";
import "./style.css";
import { ExamInterface } from "../../Classes/Exams";
import { StudentScoreType } from "../../Classes/ExamEnroll";
import ExamForm from "../ExamForm";
import ExamList from "../ExamList";
import { ExamEnrollment } from "../../Classes/ExamEnroll";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { useAuth } from "../../hooks/AuthProvider";
import Loader from "../Loader";

const AddStudent: React.FC = () => {
  const [examEnrollments, setExamEnrollments] = useState<EnrollExamInterface>();
  const [selectedExam, setSelectedExam] = useState<ExamInterface>();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const { user: authUser } = useAuth();
  const enrollExamController = new EnrollExamController();
  const [answer, setAnswer] = useState("");

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
    

    if (authUser && selectedExam?.id && answer) {

      const answerValue = answer;
      const studentID = authUser.id;
      const examID = selectedExam!.id;
      const studentScore = StudentScoreType.PENDING;
      const studentAnswer = answerValue;

      const openaiReplay = [""];
      const examEnrollmentData = new ExamEnrollment(
        studentID,
        examID,
        studentScore,
        studentAnswer,
        openaiReplay
      );
      setLoading(true);
      const result = await enrollExamController.addExamEnrollment(
        examEnrollmentData
      );
      setLoading(false);
      setExamEnrollments(result);
      setShow(true);
      setAnswer('')
      setSelectedExam(undefined);
    }
  };

  const clearData = () => {
    setExamEnrollments(undefined);
  };

  const handleClose = () => setShow(false);

  return (
    <div className="student__container">
      <Container>
        <Row className="">
          <Col xs={5} md={4} xl={3} className="p-0 m-0">
            <ExamList
              page="student"
              selectExam={(exam: ExamInterface) => setSelectedExam(exam)}
              examEnrollments={examEnrollments}
            />
          </Col>
          <Col xs={7} md={8} xl={9} className="p-0 m-0">
            {loading && <Loader />}
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
            </Modal>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

interface EnrollExamInterface {
  studentID: string;
  examID: string;
  studentScore: StudentScoreType;
  openaiReplay: string[];
  studentAnswer: string;
  id: string;
}

export default AddStudent;
