import '../styling/singlemission.css'
import React, { useState, useEffect, useContext } from "react";
import {useNavigate} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import MissionContext from "./MissionContext";
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Badge from 'react-bootstrap/Badge'

const SingleMission = () => {
  const navigate = useNavigate()
  const { clickedMission, setClickedMission} = useContext(MissionContext)
  const [personnel, setPersonnel] = useState(null)
  const [missionTeamMembers, setMissionTeamMembers] = useState(null)
  const [missionTeams, setMissionTeams] = useState(null)
  const [refresh, setRefresh] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({})

  useEffect(() => {
    let teamMembers
    fetch(`http://localhost:8081/personnel`)
    .then(res => res.json())
    .then(data => setPersonnel(data))
    .catch(err => {
      console.log(err)
      })
  }, [refresh])

  useEffect(() => {
    let teamNames
    fetch(`http://localhost:8081/teams`)
    .then(res => res.json())
    .then(teams => {
      teamNames = teams.filter(individual => individual.mission_id == clickedMission.id);
      setMissionTeams(teamNames);
      })
      .catch(err => {
        console.log(err)
      })
  }, [refresh])

  useEffect(() => {
    let members
    if(personnel && missionTeams){
      members = missionTeams.map(team => {
        let personArray = personnel.filter(person => person.team_id == team.id)
        return personArray
      })
    let allMembers = members.flat(1)
      setMissionTeamMembers(allMembers)
    }else{
      return
    }
  }, [personnel, missionTeams])

  //DATA HANDLERS
  const toggleRefresh = () => {
    setRefresh((current) => !current);
  };

  //missions webpage redirect
  const navigateToMissions = () => {
    navigate('/missions');
  }

  //Render check
  const renderCheck = () => {
    if(clickedMission){
      if(Object.keys(clickedMission).length && missionTeamMembers && missionTeams){
        return true
      }
    }
    return false
  }

  //Delete mission
  const handleDeleteClose = () => setShowDelete(false)
  const handleDeleteShow = () => setShowDelete(true)

  const deleteMission = async() => {
    try {
      let missionDelete = await fetch(`http://localhost:8081/missions/${clickedMission.id}`,  { method: "DELETE" })
      if(missionDelete.status !== 202){
      throw new Error()
      }
      handleDeleteClose();
      navigateToMissions();
    } catch(err){
      console.log(err)
      handleDeleteClose();
    }

  }

  //Edit mission
  const handleShow = () => setShowEdit(true)

  const handleShowEdit = async () => {
    try {
      let response = await fetch(`http://localhost:8081/missions/${clickedMission.id}`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error
        }
        return res.json() 
      })
      .then((data) => {
        let dataSlice = data.map((item) => {
          if (item.start_date) {
            item.start_date = item.start_date.slice(0, 10);
            item.end_date = item.end_date.slice(0, 10);
          }
          return item;
        });
        setFormData(dataSlice[0]);
      })
      handleShow()
    } catch (error) {
      
    }
  }

  const editMission = async() => {
    console.log('Edited.')
  }
    //Set state for the "Edit Mission" form
    const handleFormData = (event) => {
      let newData = { ...formData };
      newData[event.target.id] = event.target.value;
      setFormData(newData);
    };
  
    //Close "Add mission" form
    const handleEditClose = () => {
      setValidated(false);
      setShowEdit(false);
      setFormData({});
    };
  
    //set Add State
    const handleAdd = () => {
      handleShowEdit();
    }
  
    //SUBMIT edits
    const handleSubmit = async (event) => {
      try {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.stopPropagation();
        }
        setValidated(true);
        let response = await fetch(`http://localhost:8081/missions/${clickedMission.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        setClickedMission(formData)
        setFormData({});
        handleEditClose();
        toggleRefresh();
        if (response.status !== 201) {
          throw new Error();
        }
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <>
    {renderCheck() ? (
    <>
      <div className='page-title'>
      
      <h1 className='mission-header'>
      Mission: {clickedMission.location}
      </h1>
      <div className='mission-buttons-header'>
        <Link className='mission-button-single'to='/missions'>
          <Button variant='light' className='homepage-button'>
            Back to Missions
          </Button>
        </Link>
        <Link className='home-button-single'to='/'>
          <Button variant='primary' className='homepage-button'>
            Back to Home
          </Button>
        </Link>
      </div>
      </div>
      <div className='info-card'>
        <Card border='light' className='mission-card-body' bg='dark' text='white' style={{ width: '25rem' }}>
        <div className='mission-details'>
          <Card.Title className='members-title'>Mission Start Date</Card.Title>
          {clickedMission.start_date ? <Card.Text className='detail-text'>{clickedMission.start_date}</Card.Text> : <Card.Text className='detail-text'>No date available</Card.Text>}
        </div>
        <div className='mission-details'>
          <Card.Title className='members-title'>Mission End Date</Card.Title>
          {clickedMission.end_date ? <Card.Text className='detail-text'>{clickedMission.end_date}</Card.Text> : <Card.Text className='detail-text'>No date available</Card.Text>}
        </div>
        </Card>

        <Card border='light' className='details-card-body' bg='dark' text='white' style={{ width: '25rem' }}>
          <Card.Body className='card-contents-single'>
            <div className='mission-details'>
              <Card.Title className='members-title'>Mission Details</Card.Title>
              <Card.Text className='detail-text'>
              {clickedMission.description}
              </Card.Text>
            </div>
            <div className='buttons'>
              <Button variant="success" onClick={handleShowEdit}>Edit Mission Details</Button>
              <Button variant="danger" onClick={handleDeleteShow}>Delete Mission</Button>
            </div>
          </Card.Body>
        </Card>
    
        <Card border='light' className='teams-card-body' bg='dark' text='white' style={{ width: '25rem' }}>
          <Card.Title className='members-title'>Assigned Teams</Card.Title>
            <div className='assigned-teams'>
             {missionTeams ? (missionTeams.length ? (missionTeams.map(team => <Card.Text className='detail-text'>{team.name}</Card.Text>)) : <Card.Text className='detail-text'>No teams assigned</Card.Text>) : <Card.Text className='detail-text'>Could not load team data.</Card.Text>}
            </div>
          <Card.Title className='members-title'>Assigned Members</Card.Title>
            <div className='members'>
              {missionTeamMembers ? (missionTeamMembers.length ? (missionTeamMembers.map(individual => {
                return(
                  <Card.Text className='team-text'>| {individual.first_name.concat(" ", individual.last_name)}, {individual.rank}, {individual.mos} |</Card.Text>
                )}
              )) : <Card.Text className='team-text'>No team members.</Card.Text>) : <p>Could not load team data.</p>}
            </div>
        </Card>
      </div>

      <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Mission</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please confirm that you wish to delete this mission. This action cannot be undone.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Close
          </Button>
          <Button variant="primary" onClick={deleteMission}>
            Delete Mission
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showEdit}
        onHide={handleEditClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Edit Mission</Modal.Title>
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
          <Button variant="secondary" onClick={handleEditClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      </>
      ) : <p>Page is loading...</p>}
    </>
  )
}

export default SingleMission