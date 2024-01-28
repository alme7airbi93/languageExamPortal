import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ExamController from "../../controllers/examController";
import "./modelbox.css";
import { Exam, ExamInterface } from "../../Classes/Exams";
import { useTranslation } from "react-i18next";

const ModelBox: React.FC<ModelBoxProps> = ({
  mode,
  selectedExam,
  setSelectedExam,
  show,
  setShow,
  setLoading,
  fetchExams,
  selectExam,
}) => {
  const [name, setName] = useState("");
  const [examQuestion, setExamQuestion] = useState("");
  const { t } = useTranslation();

  const handleClose = () => {
    setShow(false);
    setName("");
    setExamQuestion("");
    setSelectedExam(undefined);
  };

  const examController = new ExamController();

  const saveExam: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();

    const exam = new Exam(name!, examQuestion!);
    if(!exam.name || !exam.examQuestion) return;

    setLoading(true);
    if (mode === "save" && exam) {
      handleClose();
      await examController.addExam(exam);
    } else if (mode === "edit" && selectedExam?.id) {
      handleClose();
      exam.id = selectedExam.id;
      await examController.updateExam(exam);
      selectExam(exam);
    }
    await fetchExams();
    setLoading(false);
  };

  useEffect(() => {
    if (selectedExam) {
      setName(selectedExam?.name);
      setExamQuestion(selectedExam?.examQuestion);
    }
  }, [selectedExam]);

  const modelMode = () => {
    if (mode === "save") {
      return `${t("Create")}`;
    } else if (mode === "edit") {
      return `${t("Edit")}`;
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="text-capitalize">
          <Modal.Title>
            {modelMode()} {t("Exam")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> {t("Exam Name")}</Form.Label>
              <Form.Control
                type="name"
                placeholder="name"
                autoFocus
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label> {t("Exam Question")}</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => setExamQuestion(e.target.value)}
                value={examQuestion}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-start">
          <Button variant="secondary" onClick={handleClose}>
            {t("Close")}
          </Button>
          <Button
            variant="primary"
            onClick={saveExam}
            className="text-capitalize"
          >
            {modelMode()} {t("Exam")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModelBox;

interface ModelBoxProps {
  mode: string;
  selectedExam: ExamInterface | undefined;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedExam: React.Dispatch<
    React.SetStateAction<ExamInterface | undefined>
  >;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  fetchExams: () => void;
  selectExam: (exam: ExamInterface) => void;
}
