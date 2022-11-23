import React from 'react'
import Card from 'react-bootstrap/Card';

const Missions = () => {
  return (
    <><h1>Upcoming Missions</h1>
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>2022-09-01</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Team 2</Card.Subtitle>
        <Card.Text>
          QRO meets with host nation security in preparation for World Cup security operations.
        </Card.Text>
        <Card.Link href="#">View Details</Card.Link>
        <Card.Link href="#">Delete Mission</Card.Link>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>2022-09-15</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Team 1</Card.Subtitle>
        <Card.Text>
          KRO meets with RCC-SWA in response to cyber incident.
        </Card.Text>
        <Card.Link href="#">View Details</Card.Link>
        <Card.Link href="#">Delete Mission</Card.Link>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>2022-10-01</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Team 3</Card.Subtitle>
        <Card.Text>
          SRO conducts CI investigations briefing with unit command.
        </Card.Text>
        <Card.Link href="#">View Details</Card.Link>
        <Card.Link href="#">Delete Mission</Card.Link>
      </Card.Body>
    </Card>
    </>
  )
}

export default Missions