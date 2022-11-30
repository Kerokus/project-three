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
      .then(teamDatum => {
        setTeamData(teamDatum)
        setFilteredData(teamDatum);
      })
      .catch((error) => {
        console.error(error);
        return [];
      });
  }, [refresh]);

//   Creates new "team_name" column in personnel table being rendered
// useEffect(() => {
//   let withTeamNames = missionData.map(mission => {
//     teamData.forEach(team => {
//       if (mission.id === team.mission_id) {
//         mission.team_name = team.name
//       } if (mission.id === 3) {
//         mission.team_name = 'Multiple Teams'
//       }
//     })
//     return mission;
//   })
//   setFilteredData(withTeamNames)
// }, [missionData, teamData])
  
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
        <Button variant="danger" onClick={() => {
          setClickedTeam(team)
          handleDeleteShow()
        }}>Delete Team</Button>
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
    newData.current_size = 0;
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

  //ADD Team
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.stopPropagation();
      }
      setValidated(true);
      let response = await fetch("http://localhost:8081/teams", {
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

  //Delete a team
  const handleDeleteClose = () => setShowDelete(false)
  const handleDeleteShow = () => setShowDelete(true)

  const deleteTeam = async() => {
    try {
      let teamDelete = await fetch(`http://localhost:8081/teams/${clickedTeam.id}`,  { method: "DELETE" })
      if(teamDelete.status !== 202){
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
      if (a.name) {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {return -1};
        if (nameA > nameB) {return 1};
        return 0;
      } 
    })
  }

    //// Search Functions////

  // Sets the "Search Term" on change of the search text box (default is "")
  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
} 

//Filters the data without having to select a "Search By" Category
useEffect(() => {
  let searchArray = [];
    teamData.forEach((team) => {
      let teamDataString = JSON.stringify(team)
      if (teamDataString.toLowerCase().includes(searchTerm.toLowerCase())) {
        searchArray.push(team)
      }
      setFilteredData(searchArray)
    })
}, [searchTerm])
  
  return (
    <>
      <h1 className='teams-header'>Teams</h1>
      <div className='nav-buttons'>
        <Button variant='success' className='add-mission' onClick={handleAdd}>
          Add Team
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
              placeholder="Search Teams" 
              onChange={(event) => {handleSearch(event)}}
              value={searchTerm}
          />     
      </div>

      <div className="mission-card-container">
        {sortTeams([...filteredData]).map(renderTeamCard)}
      </div>

      <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please confirm that you wish to delete this team. This action
          cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Close
          </Button>
          <Button variant="warning" onClick={() => {
          deleteTeam()
          setSearchTerm('')
        }}>
            <Link
              to="/teams"
              style={{ color: "white", textDecoration: "none" }}
            >
              Delete Team
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
          <Modal.Title>Add Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  id="name"
                  onChange={(e) => handleFormData(e)}
                  value={formData.name}
                  required
                  type="text"
                  placeholder="Team Name"
                />
              </Form.Group>

              <Form.Group as={Col} md="4">
                <Form.Label>Mission ID</Form.Label>
                <Form.Control
                  id="mission_id"
                  onChange={(e) => handleFormData(e)}
                  value={formData.mission_id}
                  required
                  type="text"
                  placeholder="Mission ID"
                />
              </Form.Group>


            </Row>
            <Row className="mb-3">

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