// Teacher page

import React, { useState } from "react";
import { ExamInterface } from "../../Classes/Exams";
import { EnrollExamInterface, MessageInterface, StudentScoreType } from "../../Classes/ExamEnroll";
import ExamList from "../ExamList";
import "./teacher.css";
import { Row, Col, Button, Modal } from "react-bootstrap";
import CheckExam from "../CheckExam/checkExam";
import { useAuth } from "../../hooks/AuthProvider";
import { useTranslation } from "react-i18next";

const TeacherScreen: React.FC = () => {
  const [examEnrollments, setExamEnrollments] = useState<EnrollExamInterface>();
  const [selectedExam, setSelectedExam] = useState<ExamInterface>();
  const [fullscreen, setFullscreen] = useState<string | true | undefined>(true);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [enrollments, setEnrollments] = useState<any[]>();
  const [selectedEnrollment, setSelectedEnrollment] =
    useState<EnrollExamInterface>();
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const [activeTab, setActiveTab] = useState("answer");
  const [score, setScore] = useState<StudentScoreType>(
    StudentScoreType.PENDING
  );
  const { t } = useTranslation();

  const user = useAuth();
  function handleFullScreen(isShowFullScreen: boolean) {
    if (isShowFullScreen) {
      setFullscreen(true);
      setShowFullscreen(true);
    } else {
      setShowFullscreen(false);
    }
  }

  return (
    <div className="teacher__container position-relative">
      <Row className="m-0">
        <Col xs={5} md={4} xl={3} className="p-0 m-0">
          <ExamList
            selectExam={(exam: ExamInterface) => setSelectedExam(exam)}
            examEnrollments={examEnrollments}
            currentExam={selectedExam}
          />
        </Col>
        <Col xs={7} md={8} xl={9} className="p-0 m-0">
          <CheckExam
            selectedExam={selectedExam}
            handleFullScreen={handleFullScreen}
            showFullscreen={showFullscreen}
            enrollments={enrollments}
            setEnrollments={setEnrollments}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            selectedEnrollment={selectedEnrollment}
            setSelectedEnrollment={setSelectedEnrollment}
            messages={messages}
            setMessages={setMessages}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            score={score}
            setScore={setScore}
          />
        </Col>
      </Row>
      <Modal
        show={showFullscreen}
        fullscreen={fullscreen}
        onHide={() => setShowFullscreen(false)}
      >
        <CheckExam
          selectedExam={selectedExam}
          handleFullScreen={handleFullScreen}
          showFullscreen={showFullscreen}
          enrollments={enrollments}
          setEnrollments={setEnrollments}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
          selectedEnrollment={selectedEnrollment}
          setSelectedEnrollment={setSelectedEnrollment}
          messages={messages}
          setMessages={setMessages}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          score={score}
          setScore={setScore}
        />
      </Modal>
      <Button variant="secondary" onClick={user.logOut} className="logout">
      {t("Logout")}
      </Button>
    </div>
  );
};

export default TeacherScreen;
