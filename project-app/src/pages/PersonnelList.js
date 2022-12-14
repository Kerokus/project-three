import '../styling/personnel.css'
import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import BootstrapTable from "react-bootstrap-table-next";
import { Pen, Trash3 } from "react-bootstrap-icons";
import {Link} from 'react-router-dom'
import TeamContext from "./TeamsContext";


const PersonnelList = () => {
  //Justin's Original Functionality States:
  const [show, setShow] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [deleteValue, setDeleteValue] = useState('')
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({});
  const [personnelData, setPersonnelData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

  const { clickedTeam, setClickedTeam } = useContext(TeamContext)
  // Search Functionality States:
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [teamData, setTeamData] = useState([]);

  // async FETCH TEAM TABLE DATA (needed to render team names)
  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await fetch("http://localhost:8081/teams")
        const data = await response.json()
        setTeamData(data)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [refresh])

// async FETCH PERSONNEL TABLE DATA 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8081/personnel")
        const data = await response.json()
        let dataSlice = data.map(item => {
          if (item.dep_start) {
            item.dep_start = item.dep_start.slice(0, 10);
          } if (item.dep_end) {
            item.dep_end = item.dep_end.slice(0, 10);
          }
          return item;
        })
        setPersonnelData(dataSlice);
        // setFilteredData(dataSlice);
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [refresh])

//Creates new "team_name" column in personnel table being rendered
  useEffect(() => {
    let withTeamNames = personnelData.map(person => {
      teamData.forEach(team => {
        if (person.team_id === team.id) {
          person.team_name = team.name
        }
      })
      return person;
    })
    setFilteredData(withTeamNames)
  }, [personnelData])

  //TABLE HEADERS
  const columns = [
    {
      dataField: "last_name",
      text: "Last Name",
      sort: true,
      headerStyle: (column, colIndex) => {
        return { backgroundColor: '#5A5A5A', color:'white' };
      },
      rowStyle: (row, rowIndex) => {
      return {color: 'white'}
      }
    },
    {
      dataField: "first_name",
      text: "First Name",
      headerStyle: (column, colIndex) => {
        return { backgroundColor: '#5A5A5A', color:'white' };
      },
    },
    {
      dataField: "rank",
      text: "Rank",
      sort: true,
      headerStyle: (column, colIndex) => {
        return { width: "5%", backgroundColor: '#5A5A5A', color:'white' };
      },
    },
    {
      dataField: "mos",
      text: "MOS",
      sort: true,
      headerStyle: (column, colIndex) => {
        return { width: "70px", backgroundColor: '#5A5A5A', color:'white' };
      },
    },
    {
      dataField: "team_name",
      text: "Team",
      formatter: (cell, row, rowIndex, extraData) => (
        <div className='link-to' key={rowIndex} >
          <Link to={`/teams/${row['team_id']}`} onClick={() => 
          teamData.forEach(team => {
            if (row['team_id'] === team.id) {
              setClickedTeam(team)
            }
          })}> 
            {row.team_name}  </Link>
        </div>
          ),
      sort: true,
      headerStyle: (column, colIndex) => {
        return { width: "100px", backgroundColor: '#5A5A5A', color:'white' };
      }
    },
    {
      dataField: "contact",
      text: "Email address",
      sort: true,
      headerStyle: (column, colIndex) => {
        return { width: "300px", backgroundColor: '#5A5A5A', color:'white' };
      },
    },
    {
      dataField: "dep_start",
      text: "Deployment Start",
      sort: true,
      headerStyle: (column, colIndex) => {
        return { width: "120px", backgroundColor: '#5A5A5A', color:'white' };
      },
    },
    {
      dataField: "dep_end",
      text: "Deployment End",
      sort: true,
      headerStyle: (column, colIndex) => {
        return { width: "120px", backgroundColor: '#5A5A5A', color:'white' };
      },
    },
    {
      dataField: "id",
      text: '',
      formatter: (cell, row, rowIndex) => {
        return (
          <div className="table-buttons">
            <Button
              variant="secondary"
              onClick={() => handleEditShow(cell)}
            >
              <Pen />
            </Button>
            <Button 
              variant="danger" 
              onClick={() => handleShowWarning(cell)}>
              <Trash3 />
            </Button>
          </div>
        );
      },
      headerStyle: (column, colIndex) => {
        return { width: "120px", backgroundColor: '#5A5A5A', color:'white' };
      },
    },
  ];

  ////DATA HANDLERS////

  //Call this to refresh the table
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

  //Close "Add personnel" form
  const handleClose = () => {
    setValidated(false);
    setShow(false);
    setFormData({});
  };

  //set Add State
  const handleAdd = () => {
    setIsAdd(true)
    setValidated(false);
    handleShow();
  }

  const formValidate = () => {
    if (Object.keys(formData).length === 0) {
      return false
    }
    if (!formData.first_name || formData.first_name === '') {
      return false
    }
    if (!formData.last_name || formData.last_name === '') {
      return false
    }
    if (!formData.rank || formData.rank.length !== 3) {
      return false
    }
    if (!formData.mos || formData.mos.length < 3 || formData.mos.length > 4) {
      return false
    }
    if (!formData.dep_start) {
      return false
    }
    if (!formData.dep_end) {
      return false
    }
    if (!formData.contact) {
      return false
    }
    return true
  }

  //EDIT existing person within database
  const handleEditShow = async (fieldId) => {
    setIsAdd(false);
    try {
      let response = await fetch(`http://localhost:8081/personnel/${fieldId}`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error
        }
        return res.json() 
      })
      .then((data) => {
        let dataSlice = data.map((item) => {
          if (item.dep_start) {
            item.dep_start = item.dep_start.slice(0, 10);
          } if (item.dep_end) {
            item.dep_end = item.dep_end.slice(0, 10);
          }
          return item;
        });
        setFormData(dataSlice[0]);
      })
      handleShow()
    } catch (error) {
      
    }
  }
  
  //ADD new personnel / EDIT existing personnel
  const handleSubmit = async (event) => {
    try {
      const form = event.currentTarget;
      if (form.checkValidity() === false || formValidate() === false) {
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);
      } else {
        setValidated(true);
        event.preventDefault();
        let response = await fetch(isAdd ? "http://localhost:8081/personnel" : `http://localhost:8081/personnel/${formData.id}`, {
          method: isAdd ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        setFormData({});
        console.log('FILTER: '+ filteredData)
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

  //DELETE person from database
  const handleDelete = async () => {
    try {
      let response = await fetch(`http://localhost:8081/personnel/${deleteValue}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      toggleRefresh();
      handleCloseWarning();
      if (response.status !== 202) {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //DELETE Confirmation Warnings
  const handleCloseWarning = () => {
    setShowWarning(false);
    setDeleteValue('');
  }

  const handleShowWarning = (rowId) => {
    setShowWarning(true);
    setDeleteValue(rowId);
  }

//// Search Functions////

  // Sets the "Search Term" on change of the search text box (default is "")
  const handleSearch = (event) => {
      setSearchTerm(event.target.value)
  } 

  //Filters the data without having to select a "Search By" Category
  useEffect(() => {
    let searchArray = [];
      personnelData.forEach((person) => {
        let personnelDataString = JSON.stringify(person)
        if (personnelDataString.toLowerCase().includes(searchTerm.toLowerCase())) {
          if(searchArray.filter(item => {
            return item.id === person.id;
          }).length === 0){
            searchArray.push(person)
          }
        }
        setFilteredData(searchArray)
      })
  }, [searchTerm])


  return (
    <>
      <h1 className='header-text'>Deployed Personnel</h1>
      <div className='nav-buttons'>
      <Button className='add-mission' variant="success" onClick={handleAdd}>
        Add Personnel
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
              placeholder="Search Personnel" 
              onChange={(event) => {handleSearch(event)}}
              value={searchTerm}
          />    
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Add/Edit Personnel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  id="last_name"
                  onChange={(e) => handleFormData(e)}
                  value={formData.last_name}
                  required
                  type="text"
                  placeholder="Last Name"
                />
              </Form.Group>

              <Form.Group as={Col} md="4">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  id="first_name"
                  onChange={(e) => handleFormData(e)}
                  value={formData.first_name}
                  required
                  type="text"
                  placeholder="First Name"
                />
              </Form.Group>

              <Form.Group as={Col} md="3">
                <Form.Label>Rank</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    id="rank"
                    onChange={(e) => handleFormData(e)}
                    value={formData.rank}
                    className="formRank"
                    type="text"
                    minLength={"3"}
                    maxLength={"3"}
                    placeholder="RNK"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Enter a three-letter rank.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="3">
                <Form.Label>MOS</Form.Label>
                <Form.Control
                  id="mos"
                  onChange={(e) => handleFormData(e)}
                  value={formData.mos}
                  className="formMOS"
                  type="text"
                  minLength={"3"}
                  maxLength={"4"}
                  placeholder="MOS"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter an MOS.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="3">
                <Form.Label>Team #</Form.Label>
                <Form.Select
                  id="team_id"
                  onChange={(e) => handleFormData(e)}
                  value={formData.team_id}
                  aria-label="Default select example"
                >
                  <option>Select</option>
                  {teamData.map(team => {
                    return (
                      <option value={team.id} key={team.id}>{team.name}</option>
                    )
                  })}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Please provide a team #
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="5">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  id="contact"
                  onChange={(e) => handleFormData(e)}
                  value={formData.contact}
                  type="email"
                  placeholder="email@address"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter a valid email address.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="5">
                <Form.Label>Deployment Start Date</Form.Label>
                <Form.Control
                  id="dep_start"
                  onChange={(e) => handleFormData(e)}
                  value={formData.dep_start}
                  type="date"
                  placeholder="YYYY-MM-DD"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter Deployment Start Date.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="5">
                <Form.Label>Deployment End Date</Form.Label>
                <Form.Control
                  id="dep_end"
                  onChange={(e) => handleFormData(e)}
                  value={formData.dep_end}
                  type="date"
                  placeholder="YYYY-MM-DD"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter Deployment End Date.
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

      <div className='table-div'>
      <BootstrapTable
        keyField="id"
        data={filteredData}
        columns={columns}
        rowStyle={{backgroundColor: '#d3d3d3'}}
        striped
      />
      </div>
      <Modal
        show={showWarning}
        onHide={handleCloseWarning}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header >
          <Modal.Title>CONFIRM</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you wish to delete this entry?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseWarning}>
            Close
          </Button>
          <Button variant="warning" onClick={() => {
          handleDelete()
          setSearchTerm('')
        }}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PersonnelList;
