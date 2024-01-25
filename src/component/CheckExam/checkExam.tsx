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

const CheckExam: React.FC<CheckExamProps> = ({
  selectedExam,
  examEnrollments,
}) => {
  const [enrollments, setEnrollments] = useState<any[]>();
  const [selectedEnrollment, setSelectedEnrollment] =
    useState<EnrollExamInterface>();
  const [studentScore, setStudentScore] = useState<StudentScoreType>();
  const { user: authUser } = useAuth();

  const enrollExamController = new EnrollExamController();
  const user = new UserController();

  const getEnrollments = async () => {
    if (selectedExam?.id) {
      console.log(studentScore);

      const enrollments =
        await enrollExamController.fetchSelectedExamEnrollments(
          selectedExam?.id
        );
      const users = await user.getUsers();
      const dictionary = new Map(
        enrollments.map((item) => [item.studentID, item])
      );
      const joinedArray = users.map((item) => ({
        ...item,
        ...dictionary.get(item.id),
      }));
      setEnrollments(joinedArray);
    }
  };

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
          <div className="container mt-5 exam_form">
            <div className="d-flex justify-content-center row">
              <div className="col-md-10 col-lg-10">
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
                    <div className="question bg-white p-3 border-bottom">
                      <div
                        className={`${
                          authUser?.type === UserType.STUDENT
                            ? styles.hide_frame
                            : styles.exam__extrollment_list
                        }`}
                      >
                        {enrollments?.map((item) => {
                          return (
                            <div
                              key={item.id}
                              onClick={() => setSelectedEnrollment(item)}
                              className={styles.exam__extrollment}
                            >
                              <div>{item.name}</div>
                              <div>{item.email}</div>
                            </div>
                          );
                        })}
                      </div>
                      <h1
                        className={`${
                          authUser?.type === UserType.STUDENT &&
                          styles.show_frame
                        }`}
                      >
                        {" "}
                        {examEnrollments?.studentScore}
                      </h1>
                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
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
                    </div>

                    <div className="d-flex flex-row justify-content-center align-items-center p-3 bg-white">
                      <button
                        className="btn btn-primary border-success align-items-center btn-success"
                        type="submit"
                      >
                        Submit Answer
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
