import React from "react";
import { useState, useEffect } from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../functionalities/Loader";
import Message from "../functionalities/Message";
import Paginate from "../functionalities/Paginate";
import { bikeList, deleteBike } from "../redux/actions/bikeActions";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function ManageBikes() {
  const [page, setPage] = useState(1);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const managerListBike = useSelector((state) => state.bikeList);
  const { loading, error, bikes, pages } = managerListBike;

  const createBike = () => {
    navigate(`/create/bikes`);
  };
  const editHandler = (id) => {
    navigate(`/manage/bikes/${id}/edit`);
  };

  const deleteHandler = (id) => {
    dispatch(deleteBike(+id));
    dispatch(
      bikeList(
        {
          color: "",
          location: "",
          model: "",
          avgRating: "",
          isAvailable: "",
          startDate: "",
          endDate: "",
        },
        page
      )
    );
    window.location.reload(false);
    toast.success("Bike Deleted");
  };

  useEffect(() => {
    if (page !== +params.pageNum) {
      setPage(+params.pageNum);
    }
    dispatch(
      bikeList(
        {
          color: "",
          location: "",
          model: "",
          avgRating: "",
          isAvailable: "",
          startDate: "",
          endDate: "",
        },
        params.pageNum
      )
    );
  }, [dispatch, params.pageNum, page]);

  return (
    <>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      <Row>
        <Col md={11}>
          <h1>ALL BIKES: </h1>
        </Col>
        <Col md={1}>
          <Button
            size="sm"
            variant="primary"
            type="button"
            onClick={() => createBike()}
          >
            CREATE
          </Button>
        </Col>
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Model</th>
              <th>Color</th>
              <th>Status</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {bikes &&
              bikes.map((bike) => (
                <tr key={bike.id}>
                  <td>{bike.id}</td>
                  <td>{bike.model}</td>
                  <td>{bike.color}</td>
                  <td>{bike.isAvailable ? "Available" : "Unavailable"}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-info"
                      type="button"
                      onClick={() => editHandler(bike.id)}
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      type="button"
                      onClick={() => deleteHandler(bike.id)}
                    >
                      Delete
                    </Button>
                  <ToastContainer></ToastContainer>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <Paginate
          prefix="manage/bikes"
          page={page}
          pages={Math.ceil((pages * 1) / 9)}
        />
      </Row>
    </>
  );
}

export default ManageBikes;
