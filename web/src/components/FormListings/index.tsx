import React from "react";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";

import "./styles.scss";

const FormListings: React.FC = () => {
  return (
    <Col
      id="content-form-listings"
      xl="auto"
      lg="auto"
      md="auto"
      xs="auto"
      sm="auto"
    >
      <Row className="body">
        <h2>Listings</h2>
        <Form className="form">
          <Form.Control
            className="input"
            type="text"
            placeholder="Search for a listing title"
          />
          <Dropdown>
            <Dropdown.Toggle className="input-dropdown">
              All statues
            </Dropdown.Toggle>
            <Dropdown.Menu className="input-dropdown">
              <Dropdown.Item className="input-item">Open</Dropdown.Item>
              <Dropdown.Item className="input-item">Closed</Dropdown.Item>
              <Dropdown.Item>Expired</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div className="buttons">
            <Button className="button1" type="submit">
              Search
            </Button>
            <Button className="button2">Show all</Button>
          </div>
        </Form>
      </Row>
    </Col>
  );
};

export default FormListings;
