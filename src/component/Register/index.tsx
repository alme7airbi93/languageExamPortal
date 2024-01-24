import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "../Login/login.module.scss";
import { useAuth } from "../../hooks/AuthProvider";
import { Link } from "react-router-dom";

const Register: React.FC<RegisterProps> = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    name: "",
  });

  const auth = useAuth();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.email !== "" && input.password !== "") {
      auth.registerAction(input);
      return;
    }
    alert("pleae provide a valid input");
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className={`${styles.login_container}`}>
        <Form className="m-auto w-25">
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="name"
              name="name"
              autoFocus
              onChange={handleInput}
            />
          </Form.Group>
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
              name="password"
              onChange={handleInput}
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" onClick={handleRegister}>
              Register
            </Button>
          </div>
          <Form.Text className="text-muted">
            Already have an account?{" "}
            <Link to={"/login"}>
              Login here
            </Link>
          </Form.Text>
        </Form>
      </div>
    </>
  );
};

export default Register;

interface RegisterProps {}
