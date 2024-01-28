import { useState, useEffect } from "react";
import { StudentScoreType } from "../../Classes/ExamEnroll";
import styles from "./style.module.scss";
import { ExamInterface } from "../../Classes/Exams";
import "../AddStudent/style.css";
import { useTranslation } from "react-i18next";

const ExamForm: React.FC<ExamFormProps> = ({
  selectedExam,
  saveAnswer,
  answer,
  setAnswer,
}) => {
  const [selectedEnrollment, setSelectedEnrollment] =
    useState<EnrollExamInterface>();
  const { t } = useTranslation();


  useEffect(() => {
    setAnswer(selectedEnrollment?.studentAnswer || "");
  }, [selectedEnrollment]);

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  return (
    <div className={styles.exam__form}>
      {selectedExam ? (
        <>
          <div className="container mt-5 exam_form">
            <div className="d-flex justify-content-center row">
              <div className="col-md-10 col-lg-10">
            <form onSubmit={saveAnswer} >

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
                    <div className="ans ml-4">
                      <textarea
                        name="answer"
                        id="answer"
                        cols={30}
                        rows={10}
                        value={answer}
                        onChange={handleAnswerChange}
                      ></textarea>
                    </div>
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
          <h1 className={styles.select_exam}>{t('Select an exam from the list')}</h1>
        </div>
      )}
    </div>
  );
};

export default ExamForm;

interface ExamFormProps {
  selectedExam: ExamInterface | undefined;
  saveAnswer: (event: React.FormEvent<HTMLFormElement>) => void;
  clearData: () => void;
  answer: string;
  setAnswer: React.Dispatch<React.SetStateAction<string>>;
}

interface EnrollExamInterface {
  studentID: string;
  examID: string;
  studentScore: StudentScoreType;
  openaiReplay: string[];
  studentAnswer: string;
  id: string;
}
