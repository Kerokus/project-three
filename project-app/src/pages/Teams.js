import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
//import TeamContext from './TeamContext';

const Teams = () => {
  // const [teamData, setTeamData] = useState([])
  // const [isLoading, setIsLoading] = useState(true)

  // useEffect( () => {
  //   setIsLoading(true)
  //   let url = `http://localhost:8081/teams`

  //   fetch(url)
  //   .then(res => res.json())
  //   .then(console.log(`TEAMS query: ${}`))
  //   .then(data => setEventData(data.results))
  //   .then(data => setIsLoading(false))
  // }, [])

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