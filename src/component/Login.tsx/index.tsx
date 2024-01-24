import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "./login.module.scss";

const Login: React.FC<LoginProps> = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className={`${styles.login_container}`}>
        <Form className="m-auto w-25">
          <Form.Group className="mb-3" controlId="loginForm.email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="loginForm.password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="*******" />
          </Form.Group>
          <div className="d-flex justify-content-between">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Login
            </Button>
          </div>
          <Form.Text className="text-muted">
            Don't have an account?{" "}
            <a href="#" onClick={() => setShow(true)}>
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
