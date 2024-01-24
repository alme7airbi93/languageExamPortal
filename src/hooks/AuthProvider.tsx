import { useContext, createContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../repositories/firebase-config";
import UserController from "../controllers/userController";
import { UserType } from "../Classes/Users";

interface User {
  // Define the shape of your user object here
  id: string;
  email: string | null;
  uid: string;
  name: string;
  type: UserType;
}

interface LoginData {
  email: string;
  password: string;
  name: string;
}

interface AuthContextProps {
  token: string;
  user: User | null;
  loginAction: (data: any) => Promise<void>;
  registerAction: (data: any) => Promise<void>;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>(
    localStorage.getItem("site") || ""
  );
  const navigate = useNavigate();
  const userController = new UserController();

  const registerAction = async (data: LoginData) => {
    try {
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(async (userCredential) => {
          // Signed up
          const userData = userCredential.user;
          console.log("userData", userData);

          setUser({
            id: userData.uid,
            email: userData.email,
            uid: userData.uid,
            name: data.name,
            type: UserType.STUDENT,
          });

          const newUser = await userController.addUser({
            email: userData.email,
            name: data.name,
            type: UserType.STUDENT,
            id: userData.uid,
          });

          console.log("newUser", newUser);

          setToken(userData.refreshToken);
          localStorage.setItem("site", userData.refreshToken);
          navigate("/student");
          return;

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    } catch (err) {
      console.error(err);
    }
  };

  const loginAction = async (data: LoginData) => {
    try {
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(async (userCredential) => {
          // Signed up
          const userData = userCredential.user;
          console.log("userData", userData);

          setUser({
            id: userData.uid,
            email: userData.email,
            uid: userData.uid,
            name: data.name,
            type: UserType.STUDENT,
          });

          const newUser = await userController.addUser({
            email: userData.email,
            name: data.name,
            type: UserType.STUDENT,
            id: userData.uid,
          });

          console.log("newUser", newUser);

          setToken(userData.refreshToken);
          localStorage.setItem("site", userData.refreshToken);
          navigate("/student");
          return;

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ token, user, loginAction, registerAction, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
