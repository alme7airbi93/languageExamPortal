import { Routes,Route ,NavLink} from 'react-router-dom';
import StudentPage from './pages/StudentPage';
import TeacherPage from './pages/TeacherPage';
import HomePage from './pages/HomePage';
import Login from './component/Login.tsx';

const App : React.FC = () => {
  return (
    <>
     <div className='nav_container'>
       <div className='nav'>
        <div className='nav_item'><NavLink to="/">Home</NavLink></div>
        <div className='nav_item' ><NavLink to="/student">Student Page</NavLink></div>
        <div className='nav_item' ><NavLink to="/teacher">Teacher Page</NavLink></div>
        
      </div>
      <div><Login/></div>
     </div>
                   
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/student' element={<StudentPage />}/>
      <Route path='/teacher' element={<TeacherPage />}/>
    
    </Routes>
    </>
  );
};


export default App
