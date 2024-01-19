
import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';
  // Initialize Firebase with your configuration
    const firebaseConfig = {
  
  apiKey: "",
  projectId: "",
  appId:""
    };

  export const app = initializeApp(firebaseConfig);
  export const database = getFirestore;