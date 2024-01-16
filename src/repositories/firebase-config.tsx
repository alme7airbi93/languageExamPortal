
import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';
  // Initialize Firebase with your configuration
    const firebaseConfig = {
   

  apiKey: process.env.REACT_APP_API_KEY,
  projectId: process.env.REACT_APP_PROJECT_ID,
  appId: process.env.REACT_APP_ID
    };

  export const app = initializeApp(firebaseConfig);
  export const database = getFirestore;