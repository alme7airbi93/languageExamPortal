import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, deleteDoc, DocumentReference, DocumentData, getDoc, where, query } from 'firebase/firestore';
import { ExamEnrollment,EnrollExamInterface } from '../Classes/ExamEnroll';
import { database , app} from './firebase-config';

class EnrollExamRepository {
  private db: ReturnType<typeof getFirestore>;
  constructor() {
    // Initialize Firestore
    this.db = database(app);
  }
  // Create a new enrollment
  async addExamEnrollment(examEnrollment: EnrollExamInterface): Promise<EnrollExamInterface> {
    try {
      const docRef: DocumentReference<DocumentData> = await addDoc(
        collection(this.db, 'enrollments'),
        {
           studentID: examEnrollment.studentID,
           examID: examEnrollment.examID,
           studentScore: examEnrollment.studentScore,
           studentAnswer: examEnrollment.studentAnswer,
           openaiReplay: examEnrollment.openaiReplay
      
        }
      );
      const docSnapshot = await getDoc(docRef);
      const examEnrollmentData = docSnapshot.data() as Omit<EnrollExamInterface, 'id'>;
      const newExamEnrollment: ExamEnrollment = {
        id: docSnapshot.id,
        ...examEnrollmentData,
      };

      return newExamEnrollment;
    } catch (error) {
      console.error('Error adding exam enrollment: ', error);
      throw error; 
    }
  }

  // Read all exams enrollments
  async getExamEnrollments(): Promise<EnrollExamInterface[]> {
     try {
    const snapshot = await getDocs(collection(this.db, 'enrollments'));
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
         studentID: data.studentID,
         examID:data.examID,
         studentScore: data.studentScore,
         openaiReplay: data.openaiReplay,
          studentAnswer:data.studentAnswer
      } as EnrollExamInterface;
    });
  }
    catch (error) {
      console.error('Error getting exam enrollment: ', error);
       throw error; 
    }
  }

  // Update a exam enrollments
  async updateExamEnrollment(examEnrollmentId: string, examEnrollment: EnrollExamInterface): Promise<void> {
    
    try {
      await updateDoc(doc(this.db, 'enrollments', examEnrollmentId), {
          studentID: examEnrollment.studentID,
          examID: examEnrollment.examID,
          studentScore: examEnrollment.studentScore,
          openaiReplay: examEnrollment.openaiReplay
      
      });
    } catch (error) {
      console.error('Error updating exam enrollment: ', error);
        throw error; 
    }
  }

  // Delete a exam enrollment
  async deleteExamEnrollment(examEnrollmentId: string): Promise<void> {
    try {
      await deleteDoc(doc(this.db, 'enrollments', examEnrollmentId));
    } catch (error) {
      console.error('Error deleting exam enrollment: ', error);
        throw error; 
    }
  }

async getSelectedExamEnrollment(id: string, matchKey: string = "examID"): Promise<ExamEnrollment[]> {
  try {
    const q = query(collection(this.db, 'enrollments'), where(matchKey, '==', id));
    const querySnapshot = await getDocs(q);

    const enrollments: ExamEnrollment[] = [];

    if (!querySnapshot.empty) {
      querySnapshot.docs.forEach((doc) => {
        const examEnrollmentData = doc.data() as Omit<EnrollExamInterface, 'id'>;
        const selectedExamEnrollment: ExamEnrollment = {
          id: doc.id,
          ...examEnrollmentData,
        };
        enrollments.push(selectedExamEnrollment);
      });
    }

    return enrollments;
  } catch (error) {
    console.error('Error getting selected exam enrollments: ', error);
    throw error;
  }
}

}

export default EnrollExamRepository;




