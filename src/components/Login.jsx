import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../redux/actions/userActions";
import Message from "../functionalities/Message";
import Loader from "../functionalities/Loader";
import FormContainer from "../functionalities/FormContainer";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [page, setPage] = useState(1);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const handleSubmit = (e) => { 
    e.preventDefault();

    if (email.trim().length === 0) {
      toast.error("Email cannot be empty");
      return;
    } 
    
    if(email.trim().length>0) {
      const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (
        regex.test(email) === false
      ) {
        toast.error("Invalid Email Format");
        return;
      }
    }

    if (password.length <= 5) {
      toast.error("Password must have more than 5 characters");
      return;
    }
    e.preventDefault();
    dispatch(logIn(email.trim().toLowerCase(), password));
    
  };

  useEffect(() => {
    if (userInfo && userInfo.user) {
      navigate(`/bike/page/${page}`, { replace: true });
    }
  }, [userInfo, navigate, page]);

  return (
    <FormContainer>
      <h1>Login</h1>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email" className="py-3">
          
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password" className="py-3">
          <Form.Label>Password</Form.Label>
          <ToastContainer></ToastContainer>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
          <Button className="my-3" type="submit" variant="primary">
            Sign In
          </Button>
        </Form.Group>
      </Form>
      <Row className="py-3">
        <Col>
          Don't have an account yet? <Link to="/signup">Sign Up</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Login;
