import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Badge,
  Form,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { bikeDetails, updateBike } from "../redux/actions/bikeActions";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import Loader from "../functionalities/Loader";
import Message from "../functionalities/Message";
import Rating from "../functionalities/Rating";
import { createReservation } from "../redux/actions/allreservationAction";
import { createReview } from "../redux/actions/reviewAction";
import { reviewList } from "../redux/actions/reviewAction";

const ReserveBikes = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [startDateX, setStartDate] = useState(new Date());
  const [endDateX, setEndDate] = useState(new Date());
  const [isAvailable, setIsAvailable] = useState(false);
  const [success, setSuccess] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const bikeListing = useSelector((state) => state.bikeList);
  let { bikes } = bikeListing;

  console.log(bikes);

  const bikeDetailsFunc = useSelector((state) => state.bikeDetails);
  const { loading, error, bike } = bikeDetailsFunc;

  const reviewListing = useSelector((state) => state.reviewList);
  const {
    loading: loadingReviews,
    error: errorReview,
    reviews,
  } = reviewListing;

  const reviewCreate = useSelector((state) => state.createReview);
  const { loading: createReviewLoading, error: createReviewError } =
    reviewCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { loading: userLoading, error: userError, userInfo } = userLogin;

  const createReservations = useSelector((state) => state.createReservation);
  const { loading: reserveLoading, error: reserveError } = createReservations;

  const formatDate = (date) => {
    console.log(date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  };

  const reservationList = useSelector((state) => state.reservationList);
  console.log(reservationList);

  let { reservations } = reservationList;
  // console.log(reservations);

  if (reservations) {
    reservations = reservations.filter(
      (bike) => bike.bikeId === +params.bikeId
    );
  }

  // console.log(reservations);

  const submitHandler = (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast("Please select a rating");
      return;
    }

    if (comment.length === 0) {
      toast("Comment cannot be empty");
      return;
    }
    dispatch(
      createReview({
        rating: +rating,
        comment,
        bikeId: +params.bikeId,
        userId: userInfo.user.id,
      })
    );
    dispatch(reviewList(+params.bikeId));
    setRating(0);
    setComment("");
  };

  function dateConverter(dateInMS) {
    dateInMS = new Date(dateInMS);
    const date = dateInMS.getDate();
    const month = dateInMS.getMonth() + 1;
    const year = dateInMS.getFullYear();

    return `${date}/${month}/${year}`;
  }

  useEffect(() => {
    dispatch(bikeDetails(+params.bikeId));
    dispatch(reviewList(+params.bikeId));
  }, [dispatch, params.bikeId]);

  const bookHandler = () => {
    if (
      startDateX.getTime() < bike.startDate ||
      startDateX.getTime() > bike.endDate ||
      endDateX.getTime() < bike.startDate ||
      endDateX.getTime() > bike.endDate
    ) {
      toast.error("Enter dates in availability of bike");
    } else if (startDateX.getTime() <= endDateX.getTime()) {

      
      dispatch(
        createReservation({
          bikeId: +params.bikeId,
          userId: userInfo.user.id,
          startDate: formatDate(startDateX),
          endDate: formatDate(endDateX),
          status: "BOOKED",
        })
      );
    } else {
      toast.error("Start Date cannot be greater than End date");
    }
  };

  return (
    <>
      <Link to="/bike/page/1">
        <BsFillArrowLeftCircleFill size={30} />
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image
                src={`/images/${bike.image}`}
                alt={`Bike image: ${bike.model}`}
                fluid
              />
            </Col>
            <Col md={3}>
              {reserveLoading && <Loader />}
              {reserveError && (
                <Message variant="danger">{reserveError}</Message>
              )}

              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h6>
                    Available from {dateConverter(bike.startDate)}-
                    {dateConverter(bike.endDate)}
                  </h6>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h3>{bike.model}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={bike.avgRating} />
                </ListGroup.Item>
                <ListGroup.Item>
                  <h3>{bike.color}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h3>{bike.location}</h3>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Status</Col>
                      <Col>
                        {bike.isAvailable ? (
                          <Badge pill bg="success" text="light">
                            Available
                          </Badge>
                        ) : (
                          <Badge pill bg="danger" text="light">
                            Unavailable
                          </Badge>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Start Date</Col>
                      <Col>
                        <DatePicker
                          selected={startDateX}
                          onChange={(date) => setStartDate(date)}
                          minDate={new Date()}
                          dateFormat="yyyy/MM/dd"
                          onKeyDown={(e) => {
                            e.preventDefault();
                          }}
                        />
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>End Date</Col>
                      <Col>
                        <DatePicker
                          selected={endDateX}
                          onChange={(date) => setEndDate(date)}
                          minDate={new Date()}
                          dateFormat="yyyy/MM/dd"
                          onKeyDown={(e) => {
                            e.preventDefault();
                          }}
                        />
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <ToastContainer></ToastContainer>
                    <Button
                      type="button"
                      className="btn-block"
                      onClick={bookHandler}
                      disabled={!bike.isAvailable}
                    >
                      Book Now
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Write a review</h2>
                  {createReviewLoading && <Loader />}
                  {createReviewError && (
                    <Message variant="danger">{createReviewError}</Message>
                  )}
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId="rating">
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as="select"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="0">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Average</option>
                        <option value="4">4 - Good</option>
                        <option value="5">5 - Excellent</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="comment">
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as="textarea"
                        row="3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Button className="my-3" type="submit" variant="primary">
                      Submit
                    </Button>
                  </Form>
                </ListGroup.Item>
                <h2 className="my-3">Reviews</h2>
                {reviews && reviews.length === 0 && (
                  <Message>No Reviews</Message>
                )}
                {reviews &&
                  reviews.map((review) => (
                    <ListGroup.Item key={review.id}>
                      <Rating value={review.rating} />
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ReserveBikes;
