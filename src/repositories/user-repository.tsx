import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, deleteDoc, DocumentReference, DocumentData, getDoc } from 'firebase/firestore';
// import { User,UserInterface } from '../classes/Users';
import { User,UserInterface } from '../Classes/Users';
import { database , app} from './firebase-config';

class UserRepository {
  private db: ReturnType<typeof getFirestore>;
  constructor() {
    // Initialize Firestore
    this.db = database(app);
  }
  
  // Create a new user
  async addUser(user: UserInterface): Promise<UserInterface> {
    try {
      const docRef: DocumentReference<DocumentData> = await addDoc(
        collection(this.db, 'users'),
        {
          email: user.email,
          name: user.name,
          type: user.type,
          uid: user.id,
        }
      );

      // Use getDoc to fetch the added document
      const docSnapshot = await getDoc(docRef);

      // Extract the user data from the document snapshot
      const userData = docSnapshot.data() as Omit<UserInterface, 'id'>; // Exclude 'id' from data

      // Create a new User instance with the 'id' and other data
      const newUser: User = {
        id: docSnapshot.id,
        ...userData,
      };

      return newUser;
    } catch (error) {
      console.error('Error adding user: ', error);
      throw error; 
    }
  }

  // Read all users
  async getUsers(): Promise<UserInterface[]> {
     try {
    const snapshot = await getDocs(collection(this.db, 'users'));
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        email: data.email,
        name: data.name,
        type: data.type,
      } as UserInterface;
    });
  }
    catch (error) {
      console.error('Error getting users: ', error);
       throw error; 
    }
  }

  // Update a user
  async updateUser(user: UserInterface): Promise<void> {
    try {
      await updateDoc(doc(this.db, 'users', user.id), {
        email: user.email,
        name: user.name,
        type: user.type,
      });
    } catch (error) {
      console.error('Error updating user: ', error);
        throw error; 
    }
  }

  // Delete a user
  async deleteUser(userId: string): Promise<void> {
    try {
      await deleteDoc(doc(this.db, 'users', userId));
    } catch (error) {
      console.error('Error deleting user: ', error);
        throw error; 
    }
  }
}

export default UserRepository;
