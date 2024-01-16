import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, deleteDoc, DocumentReference, DocumentData, getDoc } from 'firebase/firestore';
import { ExamEnrollment,EnrollExamInterface } from '../classes/ExamEnroll';
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

      // Use getDoc to fetch the added document
      const docSnapshot = await getDoc(docRef);

      // Extract the enrollment data from the document snapshot
      const examEnrollmentData = docSnapshot.data() as Omit<EnrollExamInterface, 'id'>; // Exclude 'id' from data

      // Create a new enrollment instance with the 'id' and other data
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
         openaiReplay: data.openaiReplay
      } as EnrollExamInterface;
    });
  }
    catch (error) {
      console.error('Error getting exam enrollment: ', error);
      return [];
    }
  }

  // Update a exam enrollments
  async updateExamEnrollment(examEnrollment: EnrollExamInterface): Promise<void> {
    
    try {
      await updateDoc(doc(this.db, 'enrollments', examEnrollment.id), {
          studentID: examEnrollment.studentID,
          examID: examEnrollment.examID,
          studentScore: examEnrollment.studentScore,
          openaiReplay: examEnrollment.openaiReplay
      
      });
    } catch (error) {
      console.error('Error updating exam enrollment: ', error);
    }
  }

  // Delete a exam enrollment
  async deleteExamEnrollment(examEnrollmentId: string): Promise<void> {
    try {
      await deleteDoc(doc(this.db, 'enrollments', examEnrollmentId));
    } catch (error) {
      console.error('Error deleting exam enrollment: ', error);
    }
  }
}

export default EnrollExamRepository;




