import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  bikeDetails,
  BIKE_UPDATE_RESET,
  updateBike,
} from "../redux/actions/bikeActions";
import { Form, Button, Col, Row } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormContainer from "../functionalities/FormContainer";
import Loader from "../functionalities/Loader";
import Message from "../functionalities/Message";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import DatePicker from "react-datepicker";

function BikeEdit() {
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [location, setLocation] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const detailsBike = useSelector((state) => state.bikeDetails);
  const { loading, error, bike } = detailsBike;

  const bikeUpdateFunc = useSelector((state) => state.bikeUpdate);
  const {
    loading: loadingUpdateBike,
    error: errorUpdateBike,
    success: successUpdate,
  } = bikeUpdateFunc;

  const updateHandler = (e) => {
    e.preventDefault();
    if (model.trim().length === 0) {
      toast.error("Model cannot be empty");
      return;
    }

    if (color.trim().length === 0) {
      toast.error("Color cannot be empty");
      return;
    }

    if (location.trim().length === 0) {
      toast.error("Location cannot be empty");
      return;
    }
    if (startDate === "" || endDate === "" || startDate > endDate) {
      toast.error("Enter Valid Dates");
    }

    dispatch(
      updateBike({
        id: bike.id,
        model,
        color,
        location,
        isAvailable,
        startDate,
        endDate,
      })
    );
  };

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: BIKE_UPDATE_RESET });
      toast.success("Bike Updated");
      navigate("/manage/bikes/1");
    } else {
      if (bike && bike.id === +params.bikeId) {
        setModel(bike.model);
        setLocation(bike.location);
        setColor(bike.color);
      } else {
        dispatch(bikeDetails(+params.bikeId));
      }
    }
  }, [bike, params.bikeId]);
  return (
    <>
      <Link to="/manage/bikes/1">
        <BsFillArrowLeftCircleFill size={30} />
      </Link>
      <FormContainer>
        <h1>EDIT BIKE :</h1>
        {loadingUpdateBike && <Loader />}
        {errorUpdateBike && (
          <Message variant="danger">{errorUpdateBike}</Message>
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={updateHandler}>
            <ToastContainer></ToastContainer>
            <Form.Group controlId="model" className="my-3">
              <Form.Label>Model :</Form.Label>
              <Form.Control
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="color" className="my-3">
              <Form.Label>Color :</Form.Label>
              <Form.Control
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="location" className="my-3">
              <Form.Label>Location :</Form.Label>
              <Form.Control
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="isAvailable" className="my-3">
              <Form.Check
                name="Availability"
                type="radio"
                label="Available"
                onChange={() => {
                  setIsAvailable(true);
                }}
              ></Form.Check>

              <Form.Check
                name="Availability"
                type="radio"
                label="Unavailable"
                onChange={() => {
                  setIsAvailable(false);
                }}
              ></Form.Check>
            </Form.Group>
            <Col>
              <Form.Group controlId="activeDate" className="my-3">
                <Form.Label> Edit start date :</Form.Label>
                <DatePicker
                  className="p-2"
                  selected={startDate}
                  onChange={(date) => setStartDate(date.getTime())}
                  minDate={new Date()}
                  dateFormat="yyyy/MM/dd"
                  onKeyDown={(e) => {
                    e.preventDefault();
                  }}
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="activeDate" className="my-3">
                <Form.Label> Edit end date :</Form.Label>
                <DatePicker
                  className="p-2"
                  selected={endDate}
                  onChange={(date) => setEndDate(date.getTime())}
                  minDate={new Date()}
                  dateFormat="yyyy/MM/dd"
                  onKeyDown={(e) => {
                    e.preventDefault();
                  }}
                />
              </Form.Group>
            </Col>
            <Button className="my-3" type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
}

export default BikeEdit;
