import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { User } from './Users'
import { Exam } from './Exams'
import { ExamEnrollment } from './ExamEnroll'

function App() {
  const [count, setCount] = useState(0)
  enum UserType {
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
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
    </>
  )
}

export default App
