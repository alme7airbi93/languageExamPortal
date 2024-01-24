import { useState, useEffect } from "react";
import { StudentScoreType } from "../../Classes/ExamEnroll";
import "./style.css";
import ModelBox from "../ModelBox";
import { ExamInterface } from "../../Classes/Exams";
import EnrollExamController from "../../controllers/exam-enroll-controllor";
import Dropdown from "react-bootstrap/Dropdown";
import UserController from "../../controllers/userController";

const ExamForm: React.FC<ExamFormProps> = ({
  selectedExam,
  page,
  saveAnswer,
  clearData,
  examEnrollments,
}) => {
  const [enrollments, setEnrollments] = useState<any[]>();
  const [selectedEnrollment, setSelectedEnrollment] =
    useState<EnrollExamInterface>();
  const [answer, setAnswer] = useState("");
  const [studentScore, setStudentScore] = useState<StudentScoreType>();

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
    setAnswer("");
    clearData();
    getEnrollments();
  }, [selectedExam]);
  useEffect(() => {
    setAnswer(selectedEnrollment?.studentAnswer || "");
  }, [selectedEnrollment]);

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  return (
    <div className="exam__form">
      <section className="exam__question">
        <h1>{selectedExam?.name}</h1>
        <p>{selectedExam?.examQuestion}</p>
        <ModelBox page={page} mode="edit" selectedExam={selectedExam} />
      </section>
      <section className="flex">
        <form onSubmit={saveAnswer} className="exam__answer">
          <h1 className={`${page === "student" && "show-frame"}`}>
            {" "}
            {examEnrollments?.studentScore}
          </h1>
          :
          <div className={`${page === "student" && "hide-frame"}`}>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Add Score
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => setStudentScore(StudentScoreType.POOR)}
                >
                  {StudentScoreType.POOR}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => setStudentScore(StudentScoreType.GOOD)}
                >
                  {StudentScoreType.GOOD}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => setStudentScore(StudentScoreType.VERY_GOOD)}
                >
                  {StudentScoreType.VERY_GOOD}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => setStudentScore(StudentScoreType.EXCELLENT)}
                >
                  {StudentScoreType.EXCELLENT}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <textarea
            name="answer"
            id="answer"
            cols={30}
            rows={10}
            value={answer}
            onChange={handleAnswerChange}
          ></textarea>
          <div
            className={`${
              page === "student" ? "show-frame save-btn" : "hide-frame"
            }`}
          >
            <button className="button" type="submit">
              Save Answer
            </button>
          </div>
        </form>
        <div
          className={`${
            page === "student" ? "hide-frame" : "exam__extrollment_list"
          }`}
        >
          {enrollments?.map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => setSelectedEnrollment(item)}
                className="exam__extrollment"
              >
                <div>{item.name}</div>
                <div>{item.email}</div>
              </div>
            );
          })}
        </div>
      </section>
      <section className={`${page === "student" ? "hide-frame" : "flex"}`}>
        <div className="exam__bar-chart"> Bar Chart</div>
        <div className="exam__critaria">Critaria</div>
      </section>
    </div>
  );
};

export default ExamForm;

interface ExamFormProps {
  selectedExam: ExamInterface | undefined;
  examEnrollments: EnrollExamInterface | undefined;
  saveAnswer: (event: React.FormEvent<HTMLFormElement>) => void;
  clearData: () => void;
  page: string;
}

interface EnrollExamInterface {
  studentID: string;
  examID: string;
  studentScore: StudentScoreType;
  openaiReplay: string[];
  studentAnswer: string;
  id: string;
}
