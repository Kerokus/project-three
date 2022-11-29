import '../styling/missions.css';
import React, { useState, useEffect, useContext } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import TeamContext from "./TeamsContext";
import Modal from 'react-bootstrap/Modal';
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";



const Teams = () => {
  const [missionData, setMissionData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [teamData, setTeamData] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const { clickedTeam, setClickedTeam } = useContext(TeamContext)
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({});
  const [validated, setValidated] = useState(false);
  
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
        return fetch("http://localhost:8081/teams")
      })
      .then((response => response.json()))
      .then(teamDatum => setTeamData(teamDatum))
      .catch((error) => {
        console.error(error);
        return [];
      });
  }, [refresh]);
  
  // //Matching missions to teams
  // const getTeamInfo = (mission) => {
  //   let val = [];
  //   for(let team of teamData) {
  //     if (team.mission_id === mission.id) {
  //       val.push(<div>Team {team.id}</div>);
  //     }
  //   }
  //   if (val.length === 0) return (<p>Team assignment TBD</p>);
  //   else return val;
  // }

  //Build Card Layout
  const renderTeamCard = (team, index) => {
    return (
    <Card border='light' style={{ width: '18rem' }} key={index} bg='dark' text='white'className="mission-card">
      <Card.Header>{team.name}</Card.Header>
      <Card.Body className='card-body'>
        <Card.Text>
          {missionData.forEach(mission => {
            let missionId = mission.id
            let teamMissionId = (team['mission_id'])
            if (missionId === teamMissionId) {
              team.mission_location = mission.location
            }
          })}
          Current Location: {team.mission_location}
        </Card.Text>
        <Card.Subtitle className="mb-2 text-muted"># of personnel: {team.current_size} </Card.Subtitle>
        <div className='buttons'>
        <Link to={`/teams/${team.id}`} style={{color: 'white', textDecoration: 'none'}}>
        <Button variant="secondary" onClick={() => {setClickedTeam(team)}}>
          Team Info
        </Button>
        </Link>
        <Button variant="danger" onClick={handleDeleteShow}>Delete Team</Button>
        </div>
      </Card.Body>
    </Card>
    )
  }

  
  
  //DATA HANDLERS

  //Call this to refresh the mission list
  const toggleRefresh = () => {
    setRefresh((current) => !current);
  };

  //Open "Personnel" form
  const handleShow = () => setShow(true);

  //Set state for the "Add personnel" form
  const handleFormData = (event) => {
    let newData = { ...formData };
    newData[event.target.id] = event.target.value;
    setFormData(newData);
  };

  //Close "Add mission" form
  const handleClose = () => {
    setValidated(false);
    setShow(false);
    setFormData({});
  };

  //set Add State
  const handleAdd = () => {
    handleShow();
  }

  //ADD mission
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.stopPropagation();
      }
      setValidated(true);
      let response = await fetch("http://localhost:8081/missions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      setFormData({});
      handleClose();
      toggleRefresh();
      if (response.status !== 201) {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Delete a mission
  const handleDeleteClose = () => setShowDelete(false)
  const handleDeleteShow = () => setShowDelete(true)

  const deleteMission = async() => {
    try {
      let missionDelete = await fetch(`http://localhost:8081/missions/${clickedTeam.id}`,  { method: "DELETE" })
      if(missionDelete.status !== 202){
      throw new Error()
      }
      handleDeleteClose();
      toggleRefresh();
    } catch(err){
      console.log(err)
      handleDeleteClose();
    }
  }

  const sortTeams = (teamsArray) => {
    return teamsArray.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {return -1};
      if (nameA > nameB) {return 1};
      return 0;
    })
  }
  
  return (
    <>
      <h1>Teams</h1>
      <Button variant='success' className='add-mission' onClick={handleAdd}>
        Add Mission
      </Button>
      <div className="mission-card-container">
        {sortTeams([...teamData]).map(renderTeamCard)}
      </div>

      <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Mission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please confirm that you wish to delete this team. This action
          cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Close
          </Button>
          <Button variant="warning" onClick={deleteMission}>
            <Link
              to="/missions"
              style={{ color: "white", textDecoration: "none" }}
            >
              Delete Mission
            </Link>
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Add Mission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated}>
            <Row className="mb-3">
              <Form.Group as={Col} md="5">
                <Form.Label>Mission Start Date</Form.Label>
                <Form.Control
                  id="start_date"
                  onChange={(e) => handleFormData(e)}
                  value={formData.start_date}
                  type="date"
                  placeholder="YYYY-MM-DD"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter Mission Start Date.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="5">
                <Form.Label>Mission End Date</Form.Label>
                <Form.Control
                  id="end_date"
                  onChange={(e) => handleFormData(e)}
                  value={formData.end_date}
                  type="date"
                  placeholder="YYYY-MM-DD"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter Mission End Date.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  id="location"
                  onChange={(e) => handleFormData(e)}
                  value={formData.location}
                  required
                  type="text"
                  placeholder="Location"
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="9">
                <Form.Label>Mission Details</Form.Label>
                <Form.Control
                  as="textarea"
                  id="description"
                  onChange={(e) => handleFormData(e)}
                  value={formData.description}
                  type="text"
                  placeholder="Mission details"
                  maxLength={"500"}
                  style={{ height: "100px" }}
                  required
                />
                
                <Form.Control.Feedback type="invalid">
                  Enter mission details
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Teams