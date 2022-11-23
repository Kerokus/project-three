import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Home = () => {
  return (
    <>
    
  <Container >
   <Row className="justify-content-center">
    
    <Col xs lg="2">
      Left hand text
    </Col>
    
    <Col md="auto">I just want this in the middle</Col>
    
    <Col xs lg="2">
      Right hand text
    </Col>
   
   </Row>
  </Container>
    
    {/* <div className="border d-flex align-items-center justify-content-center">
    <div className="mb-2">
        <Button variant="secondary" size="lg">
          Missions
        </Button>{' '}
        <Button variant="secondary" size="lg">
          Teams
        </Button>
      </div>
      </div> */}
    
  </>
  )
}

export default Home