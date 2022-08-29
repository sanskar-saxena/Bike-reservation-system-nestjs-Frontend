import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import {
  updateUser,
  userDetails,
  USER_DETAILS_UPDATE_RESET,
} from "../redux/actions/userActions";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import FormContainer from "../functionalities/FormContainer";
import Loader from "../functionalities/Loader";
import Message from "../functionalities/Message";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserEdit = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("REGULAR");
  const params = useParams();
  const dispatch = useDispatch();
  const detailsUser = useSelector((state) => state.userDetails);
  const { loading, error, user } = detailsUser;
  const userUpdateFunc = useSelector((state) => state.userDetailsUpdate);
  const {
    loading: loadingUpdateUser,
    error: errorUpdateUser,
    success: successUpdate,
  } = userUpdateFunc;

  const { users } = useSelector((state) => state.usersList);
 

  const navigate = useNavigate();
  const updateHandler = (e) => {
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

      for (let i = 0; i < users.length; i++) {
        if (users[i].email === email && users[i].id !== +params.userId) {
          toast("Email Already Exists!");
          return;
        } else {
          continue;
        }
      }
      dispatch(
        updateUser({ id: +params.userId, name: name, role: role, email: email })
      );
      navigate("/manage/users/1", { replace: true });
      
  };

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_DETAILS_UPDATE_RESET });
      toast.success("User Updated");
      navigate("/manage/users/1");
    } else {
      if (user && user.id === +params.userId) {
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
      } else {
        dispatch(userDetails(+params.userId));
      }
    }
  }, [user, params.userId]);
  return (
    <>
      <Link to="/manage/users/1">
        <BsFillArrowLeftCircleFill size={30} />
      </Link>
      <FormContainer>
        <h1>EDIT USER :</h1>
        {loadingUpdateUser && <Loader />}
        {errorUpdateUser && (
          <Message variant="danger">{errorUpdateUser}</Message>
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={updateHandler}>
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
            <Form.Group controlId="role" className="my-3">
              <ToastContainer></ToastContainer>
              <Form.Control
                as="select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="REGULAR">REGULAR</option>
                <option value="MANAGER">MANAGER</option>
              </Form.Control>
            </Form.Group>
            <Button className="my-3" type="submit" variant="primary">
              UPDATE
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEdit;
