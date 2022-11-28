import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import BootstrapTable from "react-bootstrap-table-next";
import { json } from "react-router";
import { Pen, Trash3 } from "react-bootstrap-icons";


const PersonnelList = () => {
  const [show, setShow] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [deleteValue, setDeleteValue] = useState('')
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({});
  const [personnelData, setPersonnelData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

  // Search Functionality States:
  const [searchByTerm, setSearchByTerm] = useState('last_name');
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredData, setFilteredData] = useState([]);


  //FETCH TABLE DATA
  useEffect(() => {
    fetch("http://localhost:8081/personnel")
      .then((res) => res.json())
      .then((data) => {
        let dataSlice = data.map((item) => {
          if (item.dep_start) {
            item.dep_start = item.dep_start.slice(0, 10);
            item.dep_end = item.dep_end.slice(0, 10);
          }
          return item;
        });
        setPersonnelData(dataSlice);
        setFilteredData(dataSlice);
      })
      .catch((error) => {
        console.error(error);
        return [];
      });
  }, [refresh]);

  //TABLE HEADERS
  const columns = [
    {
      dataField: "last_name",
      text: "Last Name",
      sort: true,
    },
    {
      dataField: "first_name",
      text: "First Name",
    },
    {
      dataField: "rank",
      text: "Rank",
      sort: true,
      headerStyle: (column, colIndex) => {
        return { width: "5%" };
      },
    },
    {
      dataField: "mos",
      text: "MOS",
      sort: true,
      headerStyle: (column, colIndex) => {
        return { width: "70px" };
      },
    },
    {
      dataField: "team_id",
      text: "Team #",
      sort: true,
      headerStyle: (column, colIndex) => {
        return { width: "100px" };
      },
    },
    {
      dataField: "contact",
      text: "Email address",
      sort: true,
      headerStyle: (column, colIndex) => {
        return { width: "300px" };
      },
    },
    {
      dataField: "dep_start",
      text: "Deployment Start",
      sort: true,
      headerStyle: (column, colIndex) => {
        return { width: "120px" };
      },
    },
    {
      dataField: "dep_end",
      text: "Deployment End",
      sort: true,
      headerStyle: (column, colIndex) => {
        return { width: "120px" };
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
    handleShow();
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
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.stopPropagation();
      }
      setValidated(true);
      let response = await fetch(isAdd ? "http://localhost:8081/personnel" : `http://localhost:8081/personnel/${formData.id}`, {
        method: isAdd ? "POST" : "PUT",
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

   // Search Functions:

   // Sets the "Search By" category on change of the options dropdown (default is last_name)
  const handleSearchBy = (event) => {
      setSearchByTerm(event.target.value)
  }

  // Sets the "Search Term" on change of the search text box (default is "")
  const handleSearch = (event) => {
      setSearchTerm(event.target.value)
  } 

  // Filters the data that's being displayed based on the Search By category and Search Term
  useEffect(() => {
    let searchArray = [];
    personnelData.forEach((person) => {
      if(typeof person[searchByTerm] === 'string') {
        if (person[searchByTerm]){
          if (person[searchByTerm].toLowerCase().includes(searchTerm.toLowerCase())) {
            searchArray.push(person)
          }
        }
      } else if (typeof person[searchByTerm] === 'number') {
        if (person[searchByTerm].toString().includes(searchTerm)) {
          searchArray.push(person)
        }
      } 
      setFilteredData(searchArray)
    })
  }, [searchTerm, searchByTerm])

  return (
    <>
      <h1>Current Deployed Personnel</h1>

      <Button variant="primary" onClick={handleAdd}>
        Add Personnel
      </Button>

      <div className="mainsearch">
          <input 
              className="text-search-bar" 
              type='text' 
              placeholder="Search Personnel" 
              onChange={(event) => {handleSearch(event)}}
          /> 
                                
        <select name="personnel-serach-options" id="personnel-serach-options" onChange ={(event) => handleSearchBy(event)}>
          <option value="last_name" >Last Name</option>
          <option value="first_name" >First Name</option>
          <option value="rank" >Rank</option>
          <option value="mos" >MOS</option>
          <option value="team_id" >Team #</option>
          <option value="dep_start" >Deployment Start</option>
          <option value="dep_end">Deployment End</option>
          
        </select>
                
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
          <Form noValidate validated={validated}>
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
                  <option value="1">Unassigned</option>
                  <option value="2">Team 1</option>
                  <option value="3">Team 2</option>
                  <option value="4">Team 3</option>
                  <option value="5">Team 4</option>
                  <option value="6">Team 5</option>
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

      <BootstrapTable
        keyField="last_name"
        data={filteredData}
        columns={columns}
      />
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
          <Button variant="warning" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PersonnelList;
