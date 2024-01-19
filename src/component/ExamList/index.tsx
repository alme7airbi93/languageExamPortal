import { useState, useEffect } from "react";
import { ExamInterface } from "../../Classes/Exams";
import ExamController from "../../controllers/examController";
import "./examlist.css"
import ModelBox from "../ModelBox";
import { Button, Modal } from "react-bootstrap";


const ExamList: React.FC<ExamFormProps>= ({page,selectExam}) => {
  const [exams, setExams] = useState<ExamInterface[]>([]);
  const [filteredExams, setFilteredExams] = useState<ExamInterface[]>([]);
  const examController = new ExamController();

    useEffect(() => {
    examController.getExams()
      .then((result) => {
        setExams(result);
        setFilteredExams(result); 
      })
      .catch((error) => {
        console.error('Async operation failed:', error);
      });
  }, []);

  const searchExam = (event: React.ChangeEvent<HTMLInputElement>) => {
    let searchPhrase = event.target.value.toLowerCase();
    const filteredExams = exams.filter((exam) => exam.name.toLowerCase().includes(searchPhrase));
        setFilteredExams(filteredExams);
    };
 
      const deleteExam = async(examID:string,index:number)=>{

     await examController.deleteExam(examID)
     const examCopy = JSON.parse(JSON.stringify(filteredExams))
     examCopy.splice(index, 1);
     setFilteredExams(examCopy)
  }
  return <div className='exam__list'>
          <h1>Exam List</h1>
          <input type='text' placeholder='Search Exam' onChange={(e) => searchExam(e)} />
       
          {page === 'teacher'&& <ModelBox mode='save' page='teacher' selectedExam={undefined} />}
          <section>
            {filteredExams.map((exam , index )  => (
              <section className='exam__info' key={exam.id}>
                <h1 className='exam__name' onClick={()=> selectExam(exam)}>{exam.name}</h1>
                {page === "teacher" && <ModelDel  deleteExam={ deleteExam} examID={exam.id} index={index} />
                }
              
                {page === "student" &&   <Button variant="warning" onClick={()=> selectExam(exam)}>Join Exam
                  </Button>
                }   
              </section>
            ))}
          </section>
        </div>
   
}


export default ExamList;


interface ExamFormProps {
  page : string
  selectExam: (exam :ExamInterface) => void
}

const ModelDel: React.FC<ModelBoxProps>= ({deleteExam, examID,index}) => {
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
        <Modal.Body>
          Are you sure you want to delete this model
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="danger" onClick={()=>{deleteExam(examID,index)}}>Yes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

interface ModelBoxProps {
  deleteExam: (examID :string , index:number) => void
  examID :string 
  index:number
}