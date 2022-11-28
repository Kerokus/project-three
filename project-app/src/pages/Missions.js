import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


const Missions = () => {
  const [missionData, setMissionData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  
  //FETCH MISSION DATA
  useEffect(() => {
    fetch("http://localhost:8081/missions")
      .then((res) => res.json())
      .then((data) => {
        let dataSlice = data.map((item) => {
          if (item.start_date) {
            item.start_date = item.start_date.slice(0, 10);
            item.end_date = item.end_date.slice(0, 10);
          }
          return item;
        });
        setMissionData(dataSlice);
      })
      .catch((error) => {
        console.error(error);
        return [];
      });
  }, [refresh]);

  //Buid Card Layout
  const renderMissionCard = (card, index) => {
    return (
      <Card style={{ width: '18rem' }} key={index} className="mission-card">
      <Card.Body>
        <Card.Title>{card.start_date}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Team Info?</Card.Subtitle>
        <Card.Text>
          {card.description}
        </Card.Text>
        <Button variant="primary">Mission Info</Button>
        <Button variant="danger">Delete Mission</Button>
      </Card.Body>
    </Card>
    )
  }

  
  
  //DATA HANDLERS

  //Call this to refresh the mission list
  const toggleRefresh = () => {
    setRefresh((current) => !current);
  };

  
  
  return (
    <>
    <h1>Upcoming Missions</h1>
    <div className="mission-card-container">  
      {missionData.map(renderMissionCard)}
    </div>
    
    </>
  )
}

export default Missions