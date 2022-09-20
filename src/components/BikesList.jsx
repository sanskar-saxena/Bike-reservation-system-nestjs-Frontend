import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import BikeCard from "../functionalities/BikeCard";
import Message from "../functionalities/Message";
import Loader from "../functionalities/Loader";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import NoDataFound from "./NoDataFound";
import Paginate from "../functionalities/Paginate";
import { bikeList } from "../redux/actions/bikeActions";
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function BikesList() {
  const [page, setPage] = useState(1);
  const [model, setModel] = useState("");
  const [location, setLocation] = useState("");
  const [avgRating, setAvgRating] = useState("");
  const [isAvailable, setIsAvailable] = useState("");
  const [color, setColor] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const locations = [
    "Noida",
    "Bengaluru",
    "Chennai",
    "Guwahati",
    "Delhi",
    "Mumbai",
    "Gwalior",
    "Gujarat",
    "Kerala",
    "Jammu",
  ];
  const ratings = [1, 2, 2.5, 3, 3.5, 4, 4.5];
  var bikePerPage = 9;

  const params = useParams();
  const dispatch = useDispatch();

  const bikeListing = useSelector((state) => state.bikeList);
  let { loading, bikes, pages, error } = bikeListing;
  console.log(bikes);

  const navigate = useNavigate();

  const clearHandler = async () => {
    // setPage(+params.pageNum);
    setModel("");
    setColor("");
    setLocation("");
    setAvgRating("");
    setIsAvailable("");
    setStartDate("");
    setEndDate("");
    const filter = {
      color: "",
      model: "",
      location: "",
      isAvailable: "",
      avgRating: "",
      startDate: "",
      endDate: "",
    };
    Object.keys(filter).forEach((key) => {
      if (filter[key] === "") {
        delete filter[key];
      }
    });
    dispatch(bikeList(filter, page));
  };
  const filterHandler = async () => {
    if (
      (startDate !== "" && endDate === "") ||
      (startDate === "" && endDate !== "")
    ) {
      toast.error("Enter valid dates");
      return;
    }
    if (startDate > endDate) {
      toast.error("Start Date cannot be greater than End Date");
      return;
    }
    let filter = {
      color,
      location,
      model,
      avgRating,
      isAvailable,
      startDate,
      endDate,
    };

    Object.keys(filter).forEach((key) => {
      if (filter[key] === "") {
        delete filter[key];
      }
    });
    dispatch(bikeList(filter, page));
  };

  useEffect(() => {
    if (page !== +params.pageNum) {
      setPage(+params.pageNum);
    }
    let filter = {
      color,
      location,
      model,
      avgRating,
      isAvailable,
      startDate,
      endDate,
    };

    Object.keys(filter).forEach((key) => {
      if (filter[key] === "") {
        delete filter[key];
      }
    });
    dispatch(bikeList(filter, +params.pageNum));
  }, [dispatch, params.pageNum, page]);

  return (
    <>
      <h1>B I K E S</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Container>
            <Row>
              <Col>
                <Form.Group controlId="color" className="my-3">
                  <Form.Label>Color :</Form.Label>
                  <ToastContainer></ToastContainer>
                  <Form.Control
                    as="select"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="Red">Red</option>
                    <option value="Black">Black</option>
                    <option value="Blue">Blue</option>
                    <option value="Purple">Purple</option>
                    <option value="White">White</option>
                    <option value="Yellow">Yellow</option>
                    <option value="Green">Green</option>
                    <option value="Orange">Orange</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="location" className="my-3">
                  <Form.Label>Location :</Form.Label>
                  <Form.Control
                    as="select"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option value="">Select...</option>
                    {locations.map((loc) => {
                      return (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="color" className="my-3">
                  <Form.Label>Rating :</Form.Label>
                  <Form.Control
                    as="select"
                    value={avgRating}
                    onChange={(e) => setAvgRating(e.target.value)}
                  >
                    <option value="">Select...</option>
                    {ratings.map((rate) => {
                      return (
                        <option key={rate} value={rate}>{`> ${rate}`}</option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="model" className="my-3">
                  <Form.Label>Model :</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Model"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col>
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
              </Col>

              <Col>
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
              </Col>
              <Col>
                <Form.Group
                  controlId="activeFilterForReservation"
                  className="my-3"
                >
                  <Button
                    className="mt-4"
                    size="sm"
                    outline-variant="primary"
                    onClick={filterHandler}
                  >
                    Find Bikes
                  </Button>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="clearFilter" className="my-3">
                  <Button
                    className="mt-4"
                    size="sm"
                    outline-variant="primary"
                    onClick={clearHandler}
                  >
                    Clear Filter
                  </Button>
                </Form.Group>
              </Col>
            </Row>
          </Container>
          {bikes?.length === 0 ? (
            <NoDataFound displayText="No bikes available" />
          ) : (
            <Row>
              {bikes?.map((bike) => {
                return (
                  <Col key={bike.id} sm={14} md={7} lg={5} xl={4}>
                    <BikeCard bike={bike} />
                  </Col>
                );
              })}
            </Row>
          )}
          <Paginate
            prefix="bike/page"
            pages={Math.ceil(+pages / bikePerPage)}
            page={page}
          />
        </>
      )}
    </>
  );
}

export default BikesList;
