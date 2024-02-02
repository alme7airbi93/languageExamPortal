import { useState, useEffect } from "react";
import {
  EnrollExamInterface,
  StudentScoreType,
} from "../../Classes/ExamEnroll";
import styles from "../ExamForm/style.module.scss";
import { ExamInterface } from "../../Classes/Exams";
import EnrollExamController from "../../controllers/exam-enroll-controllor";
import UserController from "../../controllers/userController";
import { useAuth } from "../../hooks/AuthProvider";
import { UserType } from "../../Classes/Users";
import "../AddStudent/style.css";
import { Col, Row, ListGroup, Tabs, Tab, Button, Modal } from "react-bootstrap";
import styles2 from "../ExamList/examlist.module.scss";
import openai from "../../api/openai";
import { TbMessageChatbot } from "react-icons/tb";
import { CiUser } from "react-icons/ci";
import { MessageInterface } from "../../Classes/ExamEnroll";
import Form from "react-bootstrap/Form";
import OverlayLoader from "../Loader/OverlayLoader";
import { LuExpand } from "react-icons/lu";
import { LuShrink } from "react-icons/lu";
import { useTranslation } from "react-i18next";

const CheckExam: React.FC<CheckExamProps> = ({
  selectedExam,
  handleFullScreen,
  showFullscreen,
  enrollments,
  setEnrollments,
  selectedAnswer,
  setSelectedAnswer,
  selectedEnrollment,
  setSelectedEnrollment,
  messages,
  setMessages,
  activeTab,
  setActiveTab,
  score,
  setScore,
}) => {
  const [show, setShow] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const { user: authUser } = useAuth();

  const enrollExamController = new EnrollExamController();
  const user = new UserController();

  const handleClose = async () => {
    if (selectedEnrollment) {
      const enrollment = { ...selectedEnrollment };
      enrollment.openaiReplay = messages;
      await enrollExamController.updateExamEnrollment(
        enrollment?.id,
        enrollment
      );
    }
    setShow(false);
    await getEnrollments();
  };

  const handleShow = () => setShow(true);

  const handleSelect = (key: string | null = "answer") => {
    if (key) setActiveTab(key);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedScore = event.target.value as StudentScoreType;
    setScore(selectedScore);
    if (selectedScore === StudentScoreType.PENDING) {
      return;
    }
    giveStudentScore(selectedScore);
  };

  const giveStudentScore = async (score: StudentScoreType) => {
    if (selectedEnrollment) {
      const enrollment = { ...selectedEnrollment };
      enrollment.studentScore = score;
      setLoading(true);
      await enrollExamController.updateExamEnrollment(
        enrollment?.id,
        enrollment
      );
      await getEnrollments();
      setLoading(false);
    }
  };

  const getEnrollments = async () => {
    if (selectedExam?.id) {
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
    if (input === "") return;
    let prompt: MessageInterface = {
      role: "user",
      content: input + " سؤال الاختبار :  " + selectedExam?.examQuestion + " جواب الطالب : " + selectedAnswer,
    };
    if (messages.length > 2) {
      prompt = {
        role: "user",
        content: input + " سؤال الاختبار :  " + selectedExam?.examQuestion + " جواب الطالب : " + selectedAnswer,
      };
    }
    setMessages([...messages, prompt]);
    const completion = await openai.chat.completions.create({
      messages: [...messages, prompt],
      model: "gpt-3.5-turbo-1106",
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
      setInput("");
    }
  }

  useEffect(() => {
    if (!showFullscreen) {
      setMessages([]);
      setSelectedAnswer("");
      setActiveTab("answer");
    }
    getEnrollments();
  }, [selectedExam]);


  return (
    <div className={styles.exam__form}>
      {!!(selectedExam && Object.keys(selectedExam).length) ? (
        <>
          <div className="mt-5 exam_form">
            <div className="d-flex justify-content-center row m-0">
              <div className="col-md-12 col-lg-12">
                <form onSubmit={() => {}}>
                  <div className="border position-relative">
                    {loading && <OverlayLoader />}
                    <div className="question bg-white p-3 border-bottom">
                      <div className="d-flex flex-row justify-content-between align-items-center mcq">
                        <h4>{selectedExam?.name}</h4>
                        {showFullscreen ? (
                          <LuShrink
                            size="24"
                            onClick={() => handleFullScreen(false)}
                            cursor={"pointer"}
                          />
                        ) : (
                          <LuExpand
                            size="24"
                            onClick={() => handleFullScreen(true)}
                            cursor={"pointer"}
                          />
                        )}
                      </div>
                    </div>
                    <div className="question bg-white p-3 border-bottom">
                      <div className="d-flex flex-row align-items-center question-title">
                        <h3 className="text-danger">{t("Question.")}</h3>
                        <h5 className="mt-1 mr-4">
                          {selectedExam?.examQuestion}
                        </h5>
                      </div>
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
                              {t("Students Enrolled")}
                            </h5>
                            {enrollments?.map(
                              // @ts-ignore
                              ([studentID, { enrollment, user }]) => {
                                return (
                                  <ListGroup.Item
                                    className={`${styles2.list_item} flex-column ${enrollment.id === selectedEnrollment?.id && styles2.current_exam}`}
                                    key={studentID + enrollment.examID}
                                    onClick={() => {
                                      setMessages(enrollment.openaiReplay);
                                      setSelectedAnswer(
                                        enrollment?.studentAnswer
                                      );
                                      setSelectedEnrollment(enrollment);
                                      setActiveTab("answer");

                                      setScore(enrollment?.studentScore);
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
                          <div className="d-flex gap-4 mb-3 align-items-center ">
                            {!!selectedAnswer.length && (
                              <>
                                <h5 className="mt-1">{t("Score: ")}</h5>
                                <Form.Select
                                  aria-label="score"
                                  id="score"
                                  onChange={handleChange}
                                  value={score}
                                  className={styles.score}
                                >
                                  <option value={StudentScoreType.PENDING}>
                                  {t("ADD STUDENT SCORE")}
                                  </option>
                                  <option value={StudentScoreType.POOR}>
                                    {StudentScoreType.POOR}
                                  </option>
                                  <option value={StudentScoreType.GOOD}>
                                    {StudentScoreType.GOOD}
                                  </option>
                                  <option value={StudentScoreType.VERY_GOOD}>
                                    {StudentScoreType.VERY_GOOD}
                                  </option>
                                  <option value={StudentScoreType.EXCELLENT}>
                                    {StudentScoreType.EXCELLENT}
                                  </option>
                                </Form.Select>
                                <Button onClick={handleShow}>{t("Ask AI")}</Button>{" "}
                              </>
                            )}
                          </div>
                          <Modal show={show} onHide={handleClose}>
                            <Modal.Header>
                              <Modal.Title>{t("Ask AI")}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <div className={styles.message_container}>
                                {messages.map(
                                  ({ role, content }, i) =>
                                    role !== "system" && (
                                      <div
                                        className={styles.message_wrapper}
                                        key={i}
                                      >
                                        <div>
                                          {role === "assistant" ? (
                                            <TbMessageChatbot
                                              className={styles.avatar}
                                              color="white"
                                            />
                                          ) : (
                                            <CiUser
                                              className={styles.avatar}
                                              color="white"
                                            />
                                          )}
                                        </div>
                                        <div>
                                          <p className="text-white">
                                            {
                                              content.split(
                                                " Student Question: "
                                              )[0]
                                            }
                                          </p>
                                        </div>
                                      </div>
                                    )
                                )}
                              </div>
                              <div className={styles.wrapper}>
                                <input
                                  className={styles.text}
                                  placeholder={t("Your prompt here...")}
                                  value={input}
                                  onChange={(e) => setInput(e.target.value)}
                                />
                                <button
                                  className={styles.btn}
                                  onClick={handleSubmit}
                                >
                                  {t("Ask")}
                                </button>
                              </div>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                              {t("Close")}
                              </Button>
                            </Modal.Footer>
                          </Modal>
                          <Tabs
                            activeKey={activeTab}
                            onSelect={handleSelect}
                            transition={false}
                            id="noanim-tab-example"
                            className="mb-3"
                          >
                            <Tab eventKey="answer" title={`${t("Answer")}`}>
                              {!!selectedAnswer.length ? (
                                <div>{selectedAnswer}</div>
                              ) : (
                                <div>
                                  <p className="fw-bold fs-5">
                                  {t("Click on any student to see his/her answer")}
                                  </p>
                                </div>
                              )}
                            </Tab>
                            {messages.length > 1 && (
                              <Tab eventKey="response" title={`${t("AI Response")}`}>
                                <div className={styles.ai_response_container}>
                                  {messages.map(
                                    ({ role, content }, i) =>
                                      role !== "system" && (
                                        <div
                                          className={styles.message_wrapper}
                                          key={i}
                                        >
                                          <div>
                                            {role === "assistant" ? (
                                              <TbMessageChatbot
                                                className={styles.avatar}
                                                color="white"
                                              />
                                            ) : (
                                              <CiUser
                                                className={styles.avatar}
                                                color="white"
                                              />
                                            )}
                                          </div>
                                          <div>
                                            <p className="text-white">
                                              {
                                                content.split(
                                                  " Student Question: "
                                                )[0]
                                              }
                                            </p>
                                          </div>
                                        </div>
                                      )
                                  )}
                                </div>
                              </Tab>
                            )}
                          </Tabs>
                        </Col>
                      </Row>
                    </section>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
          <h1 className={styles.select_exam}>{t('Select an exam from the list')}</h1>
        </div>
      )}
    </div>
  );
};

export default CheckExam;

interface CheckExamProps {
  selectedExam: ExamInterface | undefined;
  handleFullScreen: (isShowFullScreen: boolean) => void;
  showFullscreen: boolean;
  enrollments: any;
  setEnrollments: any;
  selectedAnswer: string;
  setSelectedAnswer: React.Dispatch<React.SetStateAction<string>>;
  selectedEnrollment: EnrollExamInterface | undefined;
  setSelectedEnrollment: React.Dispatch<React.SetStateAction<EnrollExamInterface | undefined>>;
  messages: MessageInterface[];
  setMessages: React.Dispatch<React.SetStateAction<MessageInterface[]>>;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  score: StudentScoreType;
  setScore: React.Dispatch<React.SetStateAction<StudentScoreType>>;
}
