import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, deleteDoc, DocumentReference, DocumentData, getDoc } from 'firebase/firestore';
import { Exam,ExamInterface } from '../classes/Exams';
import { database , app} from './firebase-config';

class ExamRepository {
  private db: ReturnType<typeof getFirestore>;
  constructor() {
    // Initialize Firestore
    this.db = database(app);
  }
  // Create a new exam
  async addExam(exam: ExamInterface): Promise<ExamInterface> {
    try {
      const docRef: DocumentReference<DocumentData> = await addDoc(
        collection(this.db, 'exams'),
        {
          name: exam.name,
          examQuestion: exam.examQuestion,  
        }
      );

      // Use getDoc to fetch the added document
      const docSnapshot = await getDoc(docRef);

      // Extract the exam data from the document snapshot
      const examData = docSnapshot.data() as Omit<ExamInterface, 'id'>; // Exclude 'id' from data

      // Create a new exam instance with the 'id' and other data
      const newExam: Exam = {
        id: docSnapshot.id,
        ...examData,
      };

      return newExam;
    } catch (error) {
      console.error('Error adding exam: ', error);
      throw error; 
    }
  }

  // Read all exams
  async getExams(): Promise<ExamInterface[]> {
     try {
    const snapshot = await getDocs(collection(this.db, 'exams'));
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        examQuestion: data.examQuestion,
      } as ExamInterface;
    });
  }
    catch (error) {
      console.error('Error getting exams: ', error);
      return [];
    }
  }

  // Update a exam
  async updateExam(exam: ExamInterface): Promise<void> {
    console.log("exam is in repo:", exam);
    
    try {
      await updateDoc(doc(this.db, 'exams', exam.id), {
        name: exam.name,
        examQuestion: exam.examQuestion,
      });
    } catch (error) {
      console.error('Error updating exams: ', error);
    }
  }

  // Delete a exam
  async deleteExam(examId: string): Promise<void> {
    try {
      await deleteDoc(doc(this.db, 'exams', examId));
    } catch (error) {
      console.error('Error deleting exams: ', error);
    }
  }
}

export default ExamRepository;
