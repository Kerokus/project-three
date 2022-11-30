import '../styling/missions.css';
import React, { useState, useEffect, useContext } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import MissionContext from "./MissionContext";
import Modal from 'react-bootstrap/Modal';
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";



const Missions = () => {
  const [missionData, setMissionData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [teamData, setTeamData] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const { clickedMission, setClickedMission } = useContext(MissionContext)
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({});
  const [validated, setValidated] = useState(false);

  // Search Functionality States:
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
    
  
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
        setFilteredData(dataSlice);
        return fetch("http://localhost:8081/teams")
      })
      .then((response => response.json()))
      .then(teamDatum => setTeamData(teamDatum))
      .catch((error) => {
        console.error(error);
        return [];
      });
  }, [refresh]);

  //Creates new "team_name" column in missions table being rendered
useEffect(() => {
  let withTeamNames = missionData.map(mission => {
    teamData.forEach(team => {
      if (mission.id === team.mission_id) {
        mission.team_name = team.name
      } if (mission.id === 3) {
        mission.team_name = 'Multiple Teams'
      }
    })
    return mission;
  })
  setFilteredData(withTeamNames)
}, [missionData, teamData])
  
  //Matching missions to teams
  const getTeamInfo = (mission) => {
    let val = [];
    for(let team of teamData) {
      if (team.mission_id === mission.id) {
        val.push(<div>Team {team.id}</div>);
      }
    }
    if (val.length === 0) return (<p>Team assignment TBD</p>);
    else return val;
  }

  //Build Card Layout
  const renderMissionCard = (mission, index) => {
    return (
    <Card border='light' style={{ width: '20rem' }} key={index} bg='dark' text='white'className="mission-card">
      <Card.Body className='card-body'>
        <Card.Title>{!mission.start_date ? 'Date TBD' : mission.start_date}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
        {mission.team_name !== undefined ?
          'Team : ' + mission.team_name :
          'Team assignment TBD'
          }
          </Card.Subtitle>
        <Card.Text className='card-text'>
          {mission.location}
        </Card.Text>
        <div className='buttons'>
        <Link to={`/missions/${mission.id}`} style={{color: 'white', textDecoration: 'none'}}>
        <Button variant="secondary" onClick={() => {setClickedMission(mission)}}>
          Mission Info
        </Button>
        </Link>
        <Button variant="danger" onClick={() => {
          setClickedMission(mission)
          handleDeleteShow()
        }}>Delete Mission</Button>
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
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);
      } else {
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
      let missionDelete = await fetch(`http://localhost:8081/missions/${clickedMission.id}`,  { method: "DELETE" })
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

  const sortMissions = (missionArray) => {
    return missionArray.sort((a, b) => 
    (new Date(a.start_date) - new Date(b.start_date))
    )
  }

    //// Search Functions////

  // Sets the "Search Term" on change of the search text box (default is "")
  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
} 

//Filters the data without having to select a "Search By" Category
useEffect(() => {
  let searchArray = [];
    missionData.forEach((mission) => {
      let missionDataString = JSON.stringify(mission)
      if (missionDataString.toLowerCase().includes(searchTerm.toLowerCase())) {
        searchArray.push(mission)
      }
      setFilteredData(searchArray)
    })
}, [searchTerm])
  
  return (
    <>
      <h1 className='header-text'>All Missions</h1>
      <div className = 'nav-buttons'>
      <Button variant='success' className='add-mission' onClick={handleAdd}>
        Add Mission
      </Button>
      <Link className='homepage-button-personnel' to='/'>
      <Button variant='primary' className='homepage-button'>
        Back to Home
      </Button>
      </Link>
      </div>
      <div className="mainsearch">
          <input 
              className="text-search-bar" 
              type='text' 
              placeholder="Search Missions" 
              onChange={(event) => {handleSearch(event)}}
              value={searchTerm}
          />     
      </div>
      <div className="mission-card-container">
        {sortMissions([...filteredData]).map(renderMissionCard)}
      </div>

      <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Mission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please confirm that you wish to delete this mission. This action
          cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Close
          </Button>
          <Button variant="warning" onClick={() => {
          deleteMission()
          setSearchTerm('')
        }}>
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
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type='submit'>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Missions