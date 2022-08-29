import React from "react";
import { useSelector } from "react-redux";
import { Card, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
const BikeCard = ({ bike }) => {
  const { userInfo } = useSelector((state) => state.userLogin);

  const accessRole = userInfo.user.role;
  return (
    <>
      {bike && (
        <Card className="my-3 p-3">
          <Link to={`/bike/${bike.id}`}>
            <Card.Img className="img" src={`/images/${bike.image}`} />
          </Link>
          <Card.Body>
            <Card.Text>
              {bike.isAvailable ? (
                <Badge pill bg="success" text="light">
                  Available
                </Badge>
              ) : (
                <Badge pill bg="danger" text="light">
                  Unavailable
                </Badge>
              )}
            </Card.Text>
            <Card.Title as="div">{bike.location}</Card.Title>
            <Card.Text>
              <strong>{bike.color}</strong>
            </Card.Text>
            <Card.Text as="div">
              <div className="my-3">
                <Rating value={bike.avgRating} />
              </div>
            </Card.Text>
            {accessRole === "MANAGER" && (
              <Link to={`/reservations/${bike.id}/page/1`}>
                <Button className="my-3">
                  <strong>Reservations</strong>
                </Button>
              </Link>
            )}
            <Link to={`/bike/${bike.id}`}>
              <Card.Text as="h4">
                <strong>{bike.model}</strong>
              </Card.Text>
            </Link>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default BikeCard;
