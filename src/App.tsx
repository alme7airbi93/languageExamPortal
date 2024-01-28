import { Routes, Route } from "react-router-dom";
import StudentPage from "./pages/StudentPage";
import TeacherPage from "./pages/TeacherPage";
import Login from "./component/Login/index.tsx";
import PrivateRoute from "./component/PrivateRoute/PrivateRoute.tsx";
import AuthProvider from "./hooks/AuthProvider.tsx";
import Register from "./component/Register/index.tsx";

const App: React.FC = () => {
  return (
    <>
      {/* <div className="nav_container">
        <div className="nav">
          <div className="nav_item">
            <NavLink to="/">Home</NavLink>
          </div>
          <div className="nav_item">
            <NavLink to="/student">Student Page</NavLink>
          </div>
          <div className="nav_item">
            <NavLink to="/teacher">Teacher Page</NavLink>
          </div>
        </div>
      </div> */}
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/student" element={<StudentPage />} />
            <Route path="/teacher" element={<TeacherPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
