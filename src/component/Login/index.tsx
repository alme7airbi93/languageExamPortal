import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "./login.module.scss";
import { useAuth } from "../../hooks/AuthProvider";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UserType } from "../../Classes/Users";

const Login: React.FC<LoginProps> = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    name: "",
  });

  const user = useAuth();
  const navigation = useNavigate();
  const [query] = useSearchParams();

  useEffect(() => {
    if (user?.token) {
      const redirect =
        user?.user?.type === UserType.TEACHER ? "/teacher" : "/student";
      navigation(redirect);
    }
  }, [user, navigation]);

  const auth = useAuth();
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("input", input);

    if (input.email !== "" && input.password !== "") {
      auth.loginAction(input);
      return;
    }

    alert("pleae provide a valid input");
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("input", input);

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className={`${styles.login_container}`}>
        <Form className="m-auto w-25">
          <Form.Group className="mb-3" controlId="user-email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="name@example.com"
              autoFocus
              onChange={handleInput}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="*******"
              name="password"
              onChange={handleInput}
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" onClick={handleLogin}>
              Login
            </Button>
          </div>
          <Form.Text className="text-muted">
            Don't have an account?{" "}
            <a href="#" onClick={() => {}}>
              Signup here
            </a>
          </Form.Text>
        </Form>
      </div>
    </>
  );
};

export default Login;

interface LoginProps {}
