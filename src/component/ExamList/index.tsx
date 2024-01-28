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
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import EnrollExamController from "../../controllers/exam-enroll-controllor";
import { EnrollExamInterface } from "../../Classes/ExamEnroll";
import Loader from "../Loader";
import OverlayLoader from "../Loader/OverlayLoader";

const ExamList: React.FC<ExamFormProps> = ({
  selectExam,
  examEnrollments,
}) => {
  const [exams, setExams] = useState<ExamInterface[]>([]);
  const [examsLoading, setExamsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedExam, setSelectedExam] = useState<ExamInterface>();
  const [filteredExams, setFilteredExams] = useState<ExamInterface[]>([]);
  const examController = new ExamController();
  const enrollExamController = new EnrollExamController();
  const { user } = useAuth();

  const fetchExams = async () => {
    const allExams = await examController.getExams();
    if (user) {
      setExams([]);
      setFilteredExams([]);
      const enrollments =
        await enrollExamController.fetchSelectedExamEnrollments(
          user.id,
          "studentID"
        );
      const enrolledExamIds = enrollments.map(
        (enrollment) => enrollment.examID
      );
      const notEnrolledExams = allExams.filter(
        (exam) => !enrolledExamIds.includes(exam.id)
      );

      setExams(notEnrolledExams);
      setFilteredExams(notEnrolledExams);
    } else {
      setExams(allExams);
      setFilteredExams(allExams);
    }
    setExamsLoading(false);
  };

  useEffect(() => {
    fetchExams();
  }, [examEnrollments]);

  const searchExam = (event: React.ChangeEvent<HTMLInputElement>) => {
    let searchPhrase = event.target.value.toLowerCase();
    const filteredExams = exams.filter((exam) =>
      exam.name.toLowerCase().includes(searchPhrase)
    );
    setFilteredExams(filteredExams);
  };

  const deleteExam = async (examID: string, index: number) => {
    setLoading(true);
    await examController.deleteExam(examID);
    const examCopy = JSON.parse(JSON.stringify(filteredExams));
    examCopy.splice(index, 1);
    setFilteredExams(examCopy);
    setLoading(false);
  };

  const handleModal = (mode: string) => {
    setShowModal(true);
    setMode(mode);
  };

  return (
    <div className="">
      {user?.type === UserType.TEACHER && (
        <ModelBox
          mode={mode}
          show={showModal}
          setShow={setShowModal}
          selectedExam={selectedExam}
          setSelectedExam={setSelectedExam}
          setLoading={setLoading}
          fetchExams={fetchExams}
        />
      )}
      <Card className={styles.Card}>
        {loading && <OverlayLoader />}
        <Card.Header className={`position-relative ${styles.exam_header}`}>
          Exams
          <FaPlus
            className={styles.add_icon}
            size="24"
            onClick={() => handleModal("save")}
          />
        </Card.Header>
        <InputGroup className="pr-1">
          <FormControl
            placeholder="Search exams"
            aria-label="Search exams"
            aria-describedby="basic-addon2"
            onChange={searchExam}
            className={styles.search_input}
          />
          <InputGroup.Text id="basic-addon2" className={styles.search_icon}>
            <FaSearch className="ml-1" />
          </InputGroup.Text>
        </InputGroup>
        {examsLoading ? (
          <div className="p-4">
            <Loader />
          </div>
        ) : filteredExams.length ? (
          <ListGroup className={`pr-1 ${styles.list_group}`}>
            {filteredExams.map((exam, index) => (
              <ListGroup.Item
                className={styles.list_item}
                key={exam.id}
                action
                onClick={() => selectExam(exam)}
              >
                <h5 className={styles.exam_name}>{exam.name} </h5>
                {user?.type === UserType.STUDENT && (
                  <div onClick={() => selectExam(exam)}>Join Exam</div>
                )}
                <div>
                  {user?.type === UserType.TEACHER && (
                    <ModelDel
                      deleteExam={deleteExam}
                      examID={exam.id}
                      index={index}
                    />
                  )}
                  {user?.type === UserType.TEACHER && (
                    <MdOutlineEdit
                      onClick={() => {
                        handleModal("edit");
                        setSelectedExam(exam);
                      }}
                      size="24"
                      className={styles.edit_icon}
                    />
                  )}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <div className={`${styles.list_item} ${styles.list_empty_item}`}>
            <h5 className={styles.exam_name}>No Exams Available </h5>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ExamList;

interface ExamFormProps {
  selectExam: (exam: ExamInterface) => void;
  examEnrollments: EnrollExamInterface | undefined;
}

const ModelDel: React.FC<ModelBoxProps> = ({ deleteExam, examID, index }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <RiDeleteBin5Line size="24" className="ml-4" onClick={handleShow} />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="text-capitalize">
          <Modal.Title>Delete Exam</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this exam</Modal.Body>
        <Modal.Footer className="d-flex justify-content-start">
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleClose();
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
