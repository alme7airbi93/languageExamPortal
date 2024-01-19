import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ExamController from '../../controllers/examController';
import './modelbox.css'
import { Exam, ExamInterface } from '../../Classes/Exams';

const ModelBox: React.FC<ModelBoxProps>= ({mode , selectedExam,page}) => {
  
  const [show, setShow] = useState(false);
  const [name, setName] = useState<string>(); 
  const [examQuestion ,setExamQuestion] = useState<string>()
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const examController = new ExamController()

  const saveExam: React.MouseEventHandler<HTMLButtonElement> = async (event)=>{
    event.preventDefault();
    
    const exam = new Exam(name!, examQuestion!)
    if (mode ==='save' && exam && examQuestion) {
      await examController.addExam(exam);
       handleClose()
    }else if(mode ==='edit' && selectedExam?.id){
      exam.id = selectedExam.id
        await examController.updateExam(exam);
       handleClose()
    }
  }


    useEffect(()=>{
    if (selectedExam && selectedExam?.name) {
      setName(selectedExam?.name)
      setExamQuestion(selectedExam?.examQuestion) 
    }
    
  },[selectedExam])

  const modelMode = ()=>{
    if (mode === 'save') {
      return "Create "
    } else if(mode === 'edit') {
       return "Edit "
    }
  }

  return (
    <>
      {(mode ==="edit" &&  selectedExam?.id) && page !== 'student'&& <Button variant="primary" onClick={handleShow}>
        {modelMode()} Exam
      </Button>}
     {(mode ==="save") && <Button variant="primary" onClick={handleShow}>
        {modelMode()} Exam
      </Button>}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modelMode()} Exam</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Exam Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="name"
                autoFocus
                onChange={(e)=>setName(e.target.value)}
                value={name}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Exam Question</Form.Label>
              <Form.Control as="textarea" rows={3} onChange={(e)=> setExamQuestion(e.target.value)} 
              value={examQuestion}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveExam}>
          {modelMode()} Exam
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default ModelBox


interface ModelBoxProps{
  mode : string;
  page : string
  selectedExam: ExamInterface | undefined
}