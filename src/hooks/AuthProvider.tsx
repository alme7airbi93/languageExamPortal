import {
  useContext,
  createContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../repositories/firebase-config";
import UserController from "../controllers/userController";
import { UserType } from "../Classes/Users";
import Loader from "../component/Loader";

interface User {
  // Define the shape of your user object here
  id: string;
  email: string | null;
  name: string;
  type: UserType;
}

interface LoginData {
  email: string;
  password: string;
  name: string;
}

interface AuthContextProps {
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
  const [isInitialized, setIsInitialized] = useState(false);

  const navigate = useNavigate();
  const userController = new UserController();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userData) => {
      if (userData) {
        const user = await userController.getSingleUser(userData.uid);
        if (user !== null) {
          setUser({
            id: user.id,
            email: user.email,
            name: user.name,
            type: user.type,
          });
          console.log("user", user);
          navigate(user.type.toLowerCase());
        }
        setIsInitialized(true);
        return;
      } else {
        setUser(null);
        setIsInitialized(true);
      }
    });
    return unsubscribe;
  }, []);

  const registerAction = async (data: LoginData) => {
    try {
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(async (userCredential) => {
          const userData = userCredential.user;

          setUser({
            id: userData.uid,
            email: userData.email,
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

          navigate(newUser.type.toLowerCase());
          return;
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const loginAction = async (data: LoginData) => {
    try {
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then(async (userCredential) => {
          const userData = userCredential.user;
          const user = await userController.getSingleUser(userData.uid);
          if (user !== null) {
            setUser({
              id: user.id,
              email: user.email,
              name: user.name,
              type: user.type,
            });
            console.log("Logged in User", user);

            navigate(user.type.toLowerCase());
            return;
          }
          throw new Error("User not found");
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    navigate("/login");
  };

  if (isInitialized === false) {
    return (
      <div className="vh-100">
        <Loader />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loginAction, registerAction, logOut }}>
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
