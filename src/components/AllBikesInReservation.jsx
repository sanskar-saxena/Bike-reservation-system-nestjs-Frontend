import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Loader from "../functionalities/Loader";
import Message from "../functionalities/Message";
import NoDataFound from "./NoDataFound";
import Paginate from "../functionalities/Paginate";
import { allBikesInReservation } from "../redux/actions/allreservationAction";

const AllBikesInReservation = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const params = useParams();

  const reservationBikesList = useSelector(
    (state) => state.reservationBikesList
  );
  const { loading, error, bikesReservations, totalCount } =
    reservationBikesList;

  useEffect(() => {
    if (page !== +params.pageNum) {
      setPage(+params.pageNum);
    }
    dispatch(allBikesInReservation(+params.pageNum));
  }, [dispatch, params.pageNum, page]);

  return (
    <>
      {" "}
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {error || (bikesReservations && bikesReservations.length === 0) ? (
        <NoDataFound displayText="No Reservations Found" />
      ) : (
        <Row>
          <Col md={6}>
            <h1>All Bikes Reservations : </h1>
          </Col>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Model</th>
                <th>Color</th>
                <th>Location</th>
                <th>Avg Rating</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              {bikesReservations &&
                bikesReservations.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.model}</td>
                    <td>{item.color}</td>
                    <td>{item.location}</td>
                    <td>{item.avgRating}</td>
                    <td>{item.startDate}</td>
                    <td>{item.endDate}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Paginate
            prefix="manage/reservations/bikes/page"
            pages={Math.ceil(+totalCount / 9)}
            page={page}
          />
        </Row>
      )}
    </>
  );
};

export default AllBikesInReservation;
