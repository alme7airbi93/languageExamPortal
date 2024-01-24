import { useState, useEffect } from "react";
import { ExamInterface } from "../../Classes/Exams";
import ExamController from "../../controllers/examController";
import styles from "./examlist.module.scss";
import ModelBox from "../ModelBox";
import {
  Button,
  Modal,
  ListGroup,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { useAuth } from "../../hooks/AuthProvider";
import { UserType } from "../../Classes/Users";
import Card from "react-bootstrap/Card";
import { FaSearch } from "react-icons/fa";

const ExamList: React.FC<ExamFormProps> = ({ page, selectExam }) => {
  const [exams, setExams] = useState<ExamInterface[]>([]);
  const [filteredExams, setFilteredExams] = useState<ExamInterface[]>([]);
  const examController = new ExamController();

  const { user } = useAuth();
  console.log("user", user);

  useEffect(() => {
    examController
      .getExams()
      .then((result) => {
        setExams(result);
        setFilteredExams(result);
      })
      .catch((error) => {
        console.error("Async operation failed:", error);
      });
  }, []);

  const searchExam = (event: React.ChangeEvent<HTMLInputElement>) => {
    let searchPhrase = event.target.value.toLowerCase();
    const filteredExams = exams.filter((exam) =>
      exam.name.toLowerCase().includes(searchPhrase)
    );
    setFilteredExams(filteredExams);
  };

  const deleteExam = async (examID: string, index: number) => {
    await examController.deleteExam(examID);
    const examCopy = JSON.parse(JSON.stringify(filteredExams));
    examCopy.splice(index, 1);
    setFilteredExams(examCopy);
  };
  return (
    <div className="">
      {/* <h1>Exam List</h1>
      <input
        type="text"
        placeholder="Search Exam"
        // onChange={(e) => searchExam(e)}
      />

      {page === "teacher" && (
        <ModelBox mode="save" page="teacher" selectedExam={undefined} />
      )} */}

      <Card className={styles.Card}>
        <Card.Header className={styles.exam_header}>Exams</Card.Header>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search exams"
            aria-label="Search exams"
            aria-describedby="basic-addon2"
            onChange={searchExam}
            className={styles.search_input}
          />
          <InputGroup.Text id="basic-addon2">
            <FaSearch />
          </InputGroup.Text>
        </InputGroup>
        <ListGroup className={styles.list_group}>
          {filteredExams.map((exam) => (
            <ListGroup.Item
              className={styles.list_item}
              key={exam.id}
              action
              onClick={() => selectExam(exam)}
            >
              <h5 className={styles.exam_name}>{exam.name}</h5>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>

      {/* <section>
        {filteredExams.map((exam, index) => (
          <section className="exam__info" key={exam.id}>
            <h1 className="exam__name" onClick={() => selectExam(exam)}>
              {exam.name}
            </h1>
            {user?.type === UserType.TEACHER && (
              <ModelDel
                deleteExam={deleteExam}
                examID={exam.id}
                index={index}
              />
            )}

            {user?.type === UserType.STUDENT && (
              <Button variant="warning" onClick={() => selectExam(exam)}>
                Join Exam
              </Button>
            )}
          </section>
        ))}
      </section> */}
    </div>
  );
};

export default ExamList;

interface ExamFormProps {
  page: string;
  selectExam: (exam: ExamInterface) => void;
}

const ModelDel: React.FC<ModelBoxProps> = ({ deleteExam, examID, index }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete Exam
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Model</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this model</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              deleteExam(examID, index);
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

interface ModelBoxProps {
  deleteExam: (examID: string, index: number) => void;
  examID: string;
  index: number;
}
