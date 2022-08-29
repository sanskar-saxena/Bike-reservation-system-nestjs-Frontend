import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
const NoDataFound = ({ displayText }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <Container>
      <Row>
        <Col md={3}>
          <Button variant="light" onClick={handleClick}>
            <BsFillArrowLeftCircleFill size={30} />{" "}
          </Button>
          <h2 className="my-3">{displayText}</h2>
        </Col>
        <Col md={6}>
          <Image src="/images/empty.jpg" alt="No Data Found" fluid></Image>
        </Col>
      </Row>
    </Container>
  );
};

export default NoDataFound;
