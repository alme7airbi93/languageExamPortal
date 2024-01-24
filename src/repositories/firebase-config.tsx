import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Initialize Firebase with your configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTBRmWCEGsledh_VUzGi2qtaq0vBwYmH4",
  authDomain: "languageexam-2a747.firebaseapp.com",
  projectId: "languageexam-2a747",
  storageBucket: "languageexam-2a747.appspot.com",
  messagingSenderId: "23138668874",
  appId: "1:23138668874:web:c88cdd40d15672952871b3",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore;
