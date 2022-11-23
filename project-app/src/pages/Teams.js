import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Teams = () => {
  return (
    <>
    <Card style={{ width: '18rem' }}>
      <Card.Header>Team 1</Card.Header>
      <Card.Body>
        <Card.Title>Kuwait</Card.Title>
        <Card.Text>
          CI/HUMINT Team
        </Card.Text>
        <Button variant="primary">Team Info</Button>
        <Button variant="warning">Delete Team</Button>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Header>Team 2</Card.Header>
      <Card.Body>
        <Card.Title>Qatar</Card.Title>
        <Card.Text>
          CI/HUMINT Team
        </Card.Text>
        <Button variant="primary">Team Info</Button>
        <Button variant="warning">Delete Team</Button>
      </Card.Body>
    </Card>
    </>
  )
}

export default Teams