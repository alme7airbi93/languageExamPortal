import { useState, useEffect } from "react";
import { StudentScoreType } from "../../Classes/ExamEnroll";
import styles from "../ExamForm/style.module.scss";
import { ExamInterface } from "../../Classes/Exams";
import EnrollExamController from "../../controllers/exam-enroll-controllor";
import Dropdown from "react-bootstrap/Dropdown";
import UserController from "../../controllers/userController";
import { useAuth } from "../../hooks/AuthProvider";
import { UserType } from "../../Classes/Users";
import "../AddStudent/style.css";
import { Col, Row, ListGroup, Tabs, Tab, Button, Modal } from "react-bootstrap";
import styles2 from "../ExamList/examlist.module.scss";
import openai from "../../api/openai";

const CheckExam: React.FC<CheckExamProps> = ({
  selectedExam,
  examEnrollments,
}) => {
  const [enrollments, setEnrollments] = useState<any[]>();
  const [selectedEnrollment, setSelectedEnrollment] =
    useState<EnrollExamInterface>();
  const [studentScore, setStudentScore] = useState<StudentScoreType>();
  const [showAiResponses, setShowAiResponses] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [show, setShow] = useState(false);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [messages, setMessages] = useState<MessageInterface[]>([
    {
      role: "assistant",
      content: "You are a helpful assistant designed to output JSON.",
    },
  ]);


  const { user: authUser } = useAuth();

  const enrollExamController = new EnrollExamController();
  const user = new UserController();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getEnrollments = async () => {
    if (selectedExam?.id) {
      console.log(studentScore);

      const enrollments =
        await enrollExamController.fetchSelectedExamEnrollments(
          selectedExam?.id
        );
      const studentIDs = enrollments.map((item) => item.studentID);
      const users = await user.getUsersByStudentIDs(studentIDs);
      const enrollmentMap = new Map(
        enrollments.map((enrollment) => {
          const user = users.find((user) => user.id === enrollment.studentID);
          return [enrollment.studentID, { enrollment, user }];
        })
      );

      const joinedArray = Array.from(enrollmentMap);
      setEnrollments(joinedArray);
    }
  };

  async function handleSubmit() {
    const prompt: MessageInterface = {
      role: "user",
      content: input + " Answer:" + selectedAnswer,
    };

    setMessages([...messages, prompt]);
    const completion = await openai.chat.completions.create({
      messages: [...messages, prompt],
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "json_object" },
    });

    const res = completion.choices[0].message.content;
    if (res) {
      setMessages((messages) => [
        ...messages,
        {
          role: "assistant",
          content: res,
        },
      ]);
    }
  }

  useEffect(() => {
    // clearData();
    getEnrollments();
  }, [selectedExam]);

  useEffect(() => {
    // setAnswer(selectedEnrollment?.studentAnswer || "");
  }, [selectedEnrollment]);

  // const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setAnswer(e.target.value);
  // };

  return (
    <div className={styles.exam__form}>
      {selectedExam ? (
        <>
          <div className="mt-5 exam_form">
            <div className="d-flex justify-content-center row m-0">
              <div className="col-md-12 col-lg-12">
                <form onSubmit={() => {}}>
                  <div className="border">
                    <div className="question bg-white p-3 border-bottom">
                      <div className="d-flex flex-row justify-content-between align-items-center mcq">
                        <h4>{selectedExam?.name}</h4>
                      </div>
                    </div>
                    <div className="question bg-white p-3 border-bottom">
                      <div className="d-flex flex-row align-items-center question-title">
                        <h3 className="text-danger">Q. </h3>
                        <h5 className="mt-1 mr-4">
                          {selectedExam?.examQuestion}
                        </h5>
                      </div>
                      {/* <div className="ans ml-4">
                        <textarea
                          name="answer"
                          id="answer"
                          cols={30}
                          rows={10}
                          value={answer}
                          onChange={handleAnswerChange}
                        ></textarea>
                      </div> */}
                    </div>
                    <section className="section bg-white p-3 border-bottom">
                      <Row className="vh-50">
                        <Col
                          xs={5}
                          md={5}
                          xl={5}
                          className={`${styles.exam__extrollment_list} border border-left border-right vh-50 mt-10`}
                        >
                          <ListGroup
                            className={`pr-1 ${styles2.list_group} h-100`}
                          >
                            <h5
                              className={`text-center fw-bold mb-3 text-capitalize`}
                            >
                              Students Enrolled
                            </h5>
                            {enrollments?.map(
                              ([studentID, { enrollment, user }]) => {
                                return (
                                  <ListGroup.Item
                                    className={`${styles2.list_item} flex-column`}
                                    key={studentID + enrollment.examID}
                                    onClick={() => {
                                      setSelectedAnswer(
                                        enrollment?.studentAnswer
                                      );
                                    }}
                                  >
                                    <h5 className={`${styles2.exam_name}`}>
                                      {user.name}{" "}
                                    </h5>
                                    <div className={"text-break"}>
                                      {user.email}
                                    </div>
                                  </ListGroup.Item>
                                );
                              }
                            )}
                          </ListGroup>
                        </Col>
                        <Col
                          className={`${
                            authUser?.type === UserType.STUDENT &&
                            styles.show_frame
                          }`}
                          xs={7}
                          md={7}
                          xl={7}
                        >
                          <div className="d-flex gap-4 mb-3">
                            <Dropdown>
                              <Dropdown.Toggle
                                variant="success"
                                id="dropdown-basic"
                              >
                                Add Score
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item
                                  onClick={() =>
                                    setStudentScore(StudentScoreType.POOR)
                                  }
                                >
                                  {StudentScoreType.POOR}
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() =>
                                    setStudentScore(StudentScoreType.GOOD)
                                  }
                                >
                                  {StudentScoreType.GOOD}
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() =>
                                    setStudentScore(StudentScoreType.VERY_GOOD)
                                  }
                                >
                                  {StudentScoreType.VERY_GOOD}
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() =>
                                    setStudentScore(StudentScoreType.EXCELLENT)
                                  }
                                >
                                  {StudentScoreType.EXCELLENT}
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                            <Button onClick={handleShow}>Ask AI</Button>{" "}
                            {examEnrollments?.studentScore}
                          </div>
                          <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>Chat Modal</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                              />
                              <Button variant="primary" onClick={handleSubmit}>
                                Send
                              </Button>
                              <p>{response}</p>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                Close
                              </Button>
                            </Modal.Footer>
                          </Modal>
                          <Tabs
                            defaultActiveKey="answer"
                            transition={false}
                            id="noanim-tab-example"
                            className="mb-3"
                          >
                            <Tab eventKey="answer" title="Answer">
                              {selectedAnswer}
                            </Tab>
                            {showAiResponses && (
                              <Tab eventKey="profile" title="Profile">
                                Tab content for Profile
                              </Tab>
                            )}
                          </Tabs>
                        </Col>
                      </Row>
                    </section>

                    <div className="d-flex flex-row justify-content-center align-items-center p-3 bg-white">
                      <button
                        className="btn btn-primary border-success align-items-center btn-success"
                        type="submit"
                      >
                        Submit Score
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
          <h1 className={styles.select_exam}>Select an exam from the list</h1>
        </div>
      )}
    </div>
  );
};

export default CheckExam;

interface CheckExamProps {
  selectedExam: ExamInterface | undefined;
  examEnrollments: EnrollExamInterface | undefined;
}

interface EnrollExamInterface {
  studentID: string;
  examID: string;
  studentScore: StudentScoreType;
  openaiReplay: string[];
  studentAnswer: string;
  id: string;
}

interface MessageInterface {
  role: "assistant" | "user";
  content: string;
}