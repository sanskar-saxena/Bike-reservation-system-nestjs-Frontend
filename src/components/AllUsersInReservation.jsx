import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Loader from "../functionalities/Loader";
import Message from "../functionalities/Message";
import NoDataFound from "./NoDataFound";
import Paginate from "../functionalities/Paginate";
import { allUsersInReservation } from "../redux/actions/allreservationAction";

const AllUsersInReservation = () => {
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const params = useParams();

  const reservationUsersList = useSelector(
    (state) => state.reservationUsersList
  );
  const { loading, error, usersReservations, totalCount } =
    reservationUsersList;

  useEffect(() => {
    if (page !== +params.pageNum) {
      setPage(+params.pageNum);
    }
    dispatch(allUsersInReservation(+params.pageNum));
  }, [dispatch, params.pageNum, page]);
  return (
    <>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {error || (usersReservations && usersReservations.length === 0) ? (
        <NoDataFound displayText="No Reservations Found" />
      ) : (
        <Row>
          <Col md={6}>
            <h1>All Users In Reservations : </h1>
          </Col>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Role</th>
                <th>Bike Id</th>
                <th>Status</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              {usersReservations &&
                usersReservations.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.userEmail}</td>
                    <td>{item.role}</td>
                    <td>{item.bikeId}</td>
                    <td>{item.status}</td>
                    <td>{item.startDate}</td>
                    <td>{item.endDate}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Paginate
            prefix="manage/reservations/user/page"
            pages={Math.ceil(+totalCount / 9)}
            page={page}
          />
        </Row>
      )}
    </>
  );
};

export default AllUsersInReservation;
