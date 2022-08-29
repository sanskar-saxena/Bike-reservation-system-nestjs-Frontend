import React from 'react'
import { Container,Row,Col } from "react-bootstrap"
const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>Copyright &copy; Bike-Bungy</Col>
          
          <Col className='text-center py-3'>To learn more contact <a href="https://www.linkedin.com/in/sanskar-saxena1209/">Sanskar Saxena</a></Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer