import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { userReservations } from "../redux/actions/userActions";
import Loader from "../functionalities/Loader";
import Message from "../functionalities/Message";
import NoDataFound from "./NoDataFound";
import { Table, Row, Col, Button } from "react-bootstrap";
import { cancelReservation } from "../redux/actions/allreservationAction";
import { updateBike } from "../redux/actions/bikeActions";
import { toast } from "react-toastify";

const ManagerReservations = () => {
  const params = useParams();
  const [isAvailable, setIsAvailable] = useState(true);

  const userReservationsList = useSelector(
    (state) => state.userReservationsList
  );
  const { loading, error, reservations } = userReservationsList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userReservations(+params.userId));
  }, [dispatch, params.userId]);

  const cancelHandler = (id, bikeId) => {
    
    dispatch(cancelReservation(id));
    dispatch(
      updateBike({
        id: bikeId,
        isAvailable,
      })
    );
    console.log(bikeId);
    window.location.reload(false);
    
  };
  return (
    <>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {error || (reservations && reservations.length === 0) ? (
        <NoDataFound displayText="No Reservations Found" />
      ) : (
        <Row>
          <Col md={6}>
            <h1>YOUR RESERVATIONS : </h1>
          </Col>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>BikeId</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Cancel</th>
              </tr>
            </thead>
            <tbody>
              {reservations &&
                reservations.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.bikeId}</td>
                    <td>{item.startDate}</td>
                    <td>{item.endDate}</td>
                    <td>{item.status}</td>
                    <td>
                      <Button
                        size={40}
                        variant="outline-danger"
                        type="button"
                        onClick={() => cancelHandler(item.id, item.bikeId)}
                        disabled={item.status === "CANCELLED"}
                      >
                        Cancel
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Row>
      )}
    </>
  );
};

export default ManagerReservations;
