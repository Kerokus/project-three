import '../styling/home.css'
import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom';

const Home = () => {
  return (
    <>
    
  <Container >
    <Row className='home-header-text'>
      <h1>Welcome!</h1>
    </Row>
    <Row className='home-header-text'>
      <h4>Please select from the options below to get started.</h4>
    </Row>
    
   <Row className="justify-content-center">
    
    <Col className='column'xs lg="4">
    <Card bg='dark' text='white'style={{ width: '20rem' }}>
      <Card.Body className='card-body'>
        <Card.Title className='card-title'>Missions</Card.Title>
        <Card.Text>View all current and projected missions.</Card.Text>
        <Card.Text>View specific mission details.</Card.Text>
        <Card.Text className='final-text'>Delete and add missions.</Card.Text>
        <Link to={'/missions'} style={{color: 'white', textDecoration: 'none'}}>
        <Button variant="light" style={{width: '100%'}}>Go To Missions</Button>
        </Link>
      </Card.Body>
    </Card>
    </Col>
    
    <Col className='column' xs lg="4">
    <Card bg='dark' text='white' style={{ width: '20rem'}}>
      <Card.Body className='card-body'>
        <Card.Title className='card-title'>Teams</Card.Title>
        <Card.Text>View all teams.</Card.Text>
        <Card.Text>View specific team information.</Card.Text>
        <Card.Text>Delete teams.</Card.Text>
        <Link to={'/teams'} style={{color: 'white', textDecoration: 'none'}}>
        <Button variant="light" style={{width: '100%'}}>Go To Teams</Button>
        </Link>
      </Card.Body>
    </Card>
    </Col>
    

    <Col className='column'xs lg="4">
    <Card bg='dark' text='white' style={{ width: '20rem' }}>
      <Card.Body className='card-body'>
        <Card.Title className='card-title'>Personnel</Card.Title>
        <Card.Text>View all deployed personnel.</Card.Text>
        <Card.Text>Edit details for personnel.</Card.Text>
        <Card.Text>Add or remove personnel.</Card.Text>
        <Link to={'/personnel'} style={{color: 'white', textDecoration: 'none'}}>
        <Button variant="light" style={{width: '100%'}}>Go To Personnel</Button>
        </Link>
      </Card.Body>
    </Card>
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