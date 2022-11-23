import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import BootstrapTable from 'react-bootstrap-table-next';


const PersonnelList = () => {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({});

  const products = [ {
    last_name: "King",
    first_name: "Justin",
    rank: "CW2",
    mos: "351L",
    team_id: "Unassigned",
    contact: "justin.l.king14.mil@army.mil",
    dep_start: "2022-01-01",
    dep_end: "2022-09-01"
  },
  {
    last_name: "Smith",
    first_name: "John",
    rank: "SSG",
    mos: "35T",
    team_id: "4",
    contact: "thisemail3@myemail.com",
    dep_start: "2022-04-01",
    dep_end: "2023-01-01"
  },
  {
    last_name: "Adams",
    first_name: "Bill",
    rank: "SGT",
    mos: "35M",
    team_id: "3",
    contact: "thisemail2@myemail.com",
    dep_start: "2022-02-01",
    dep_end: "2022-10-01"
  },
];
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
      return { width: '70px' };
  }
  },
  {
    dataField: "mos",
    text: "MOS",
    sort: true,
    headerStyle: (column, colIndex) => {
      return { width: '70px' };
  }
  },
  {
    dataField: "team_id",
    text: "Team #",
    sort: true,
    headerStyle: (column, colIndex) => {
      return { width: '100px' };
  }
  },
  {
    dataField: "contact",
    text: "Email address",
    sort: true,
    headerStyle: (column, colIndex) => {
      return { width: '300px' };
  }},
  {
    dataField: "dep_start",
    text: "Deployment Start",
    sort: true,
    headerStyle: (column, colIndex) => {
      return { width: '120px' };
  }
  },
  {
    dataField: "dep_end",
    text: "Deployment End",
    sort: true,
    headerStyle: (column, colIndex) => {
      return { width: '120px' };
  }
  },
];
  
  const handleClose = () => {
    setValidated(false);
    setShow(false);
    setFormData({});
  };
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  const handleFormData = (event) => {
    let newData = { ...formData };
    newData[event.target.id] = event.target.value;
    setFormData(newData);
    console.log(formData);
  };

  return (
    <>
      <h1>Current Deployed Personnel</h1>

      <Button variant="primary" onClick={handleShow}>
        Add Personnel
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Personnel</Modal.Title>
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
                  aria-label="Default select example">
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
      keyField='last_name' 
      data={ products } 
      columns={ columns }
      />
    </>
  );
};

export default PersonnelList;
