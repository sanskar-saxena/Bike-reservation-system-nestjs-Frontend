import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IMAGES } from "../Images";
import { createBike } from "../redux/actions/bikeActions";
import FormContainer from "../functionalities/FormContainer";
import DatePicker from "react-datepicker";

function AddBike() {
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [location, setLocation] = useState("");
  // const [avgRating, setAvgRating] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [image, setImage] = useState("default.webp");

  const { bikes } = useSelector((state) => state.bikeList);
  console.log(bikes);
  let avgRatingService = 0;
  for (let i = 0; i < bikes.length; i++) {
    avgRatingService += parseInt(bikes[i].avgRating);
  }

  avgRatingService = avgRatingService / bikes.length;
  console.log(avgRatingService);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
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
      return;
    }

    dispatch(
      createBike({
        model,
        color,
        location,
        avgRating: avgRatingService,
        isAvailable,
        startDate,
        endDate,
        image,
      })
    );
    toast.success("Bike created");
    navigate("/bike/page/1");
  };

  return (
    <FormContainer>
      <h1>ADD BIKE :</h1>
      <ToastContainer />
      <Form onSubmit={submitHandler}>
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
          {/* </Form.Group>
        <Form.Group controlId="color" className="my-3">
          <Form.Label>Average Rating :</Form.Label>
          <Form.Control
            type="number"
            value={avgRating}
            onChange={(e) => setAvgRating(e.target.value)}
          ></Form.Control> */}
        </Form.Group>
        <Form.Group controlId="rating">
          <Form.Label>Image :</Form.Label>
          <Form.Control
            as="select"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          >
            {IMAGES?.map((image, index) => {
              return (
                <option value={image} key={index}>
                  {image}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="isAvailable" className="my-3">
          <Form.Check
            type="radio"
            label="Make it Available"
            onChange={() => {
              setIsAvailable(true);
            }}
          ></Form.Check>
        </Form.Group>
        <Form.Group controlId="activeDate" className="my-3">
          <Form.Label> From :</Form.Label>
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

        <Form.Group controlId="activeDate" className="my-3">
          <Form.Label> To :</Form.Label>
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
        <Button className="my-3" type="submit" variant="primary">
          ADD BIKE
        </Button>
      </Form>
    </FormContainer>
  );
}

export default AddBike;
