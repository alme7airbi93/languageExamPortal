import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
// Enum for User Type
enum UserType {
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
}

// User Class
class User {
  email: string;
  name: string;
  type: UserType;

  constructor(email: string, name: string, type?: UserType) {
    this.email = email;
    this.name = name;
    this.type = type || UserType.STUDENT;
  }
}

// Exam Class
class Exam {
  name: string;
  examQuestion: string;

  constructor(name: string, examQuestion: string) {
    this.name = name;
    this.examQuestion = examQuestion;
  }
}

// ExamEnrollment Class
class ExamEnrollment {
  studentID: string;
  examID: string;
  studentScore: string;
  openaiReplay: string[];

  constructor(
    studentID: string,
    examID: string,
    studentScore: string,
    openaiReplay?: string[]
  ) {
    this.studentID = studentID;
    this.examID = examID;
    this.studentScore = studentScore;
    this.openaiReplay = openaiReplay || [];
  }
}

// Example Usage
const userInstance = new User('example@email.com', 'Hamza khan', UserType.TEACHER);
const examInstance = new Exam('Math Exam', 'Solve the following problems...');
const enrollmentInstance = new ExamEnrollment('000000', '111111', '90', ['Replay 1', 'Replay 2']);

// Determine the types
console.log('User Instance Types:', {
  email: typeof userInstance.email,
  name: typeof userInstance.name,
  type: userInstance.type,
});

console.log('Exam Instance Types:', {
  name: typeof examInstance.name,
  examQuestion: typeof examInstance.examQuestion,
});

console.log('Enrollment Instance Types:', {
  studentID: typeof enrollmentInstance.studentID,
  examID: typeof enrollmentInstance.examID,
  studentScore: typeof enrollmentInstance.studentScore,
  openaiReplay: typeof enrollmentInstance.openaiReplay,
});
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
