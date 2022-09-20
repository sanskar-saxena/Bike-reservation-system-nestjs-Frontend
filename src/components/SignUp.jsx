import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Row, Col, Button} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../functionalities/FormContainer";
import Loader from "../functionalities/Loader";
import Message from "../functionalities/Message";
import { signUp } from "../redux/actions/userActions";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer} from "react-toastify";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const userRegisterinfo = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegisterinfo;
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.usersList);

  const submitHandler = (e) => {
    e.preventDefault();
    if (name.trim().length <= 3) {
      toast.error("Full Name must have more than 3 characters");
      return;
    }

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
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    for (let i = 0; i < users?.length; i++) {
      if (users[i].email === email) {
        toast.error("Email Already Exists!");
        return;
      }
    }
    dispatch(signUp(email.trim().toLowerCase(), password, name.trim()));
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/login");
      window.location.reload(false);
    }
  }, [userInfo, navigate]);
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={submitHandler}>
       
        <Form.Group controlId="name" className="my-3">
          <Form.Label>Name :</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address :</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password :</Form.Label>
          <ToastContainer></ToastContainer>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="confirmPassword" className="my-3">
          <Form.Label>Confirm Password :</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button className="my-3" type="submit" variant="primary">
          Register
        </Button>
      </Form>
      <Row>
        <Col>
          Already have an account ? <Link to="/login">Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default SignUp;
