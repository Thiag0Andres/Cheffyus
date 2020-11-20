import React from "react";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";

const FormTransactions: React.FC = () => {
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
        <h2>Transactions</h2>
        <Form className="form">
          <Form.Control
            className="input"
            type="text"
            placeholder="Search for a transaction title or other party involved"
          />
          <Dropdown>
            <Dropdown.Toggle className="input-dropdown">
              All statues
            </Dropdown.Toggle>
            <Dropdown.Menu className="input-dropdown">
              <Dropdown.Item className="input-item">Canceled</Dropdown.Item>
              <Dropdown.Item className="input-item">Completed</Dropdown.Item>
              <Dropdown.Item className="input-item">Dismissed</Dropdown.Item>
              <Dropdown.Item className="input-item">Disputed</Dropdown.Item>
              <Dropdown.Item className="input-item">Expired</Dropdown.Item>
              <Dropdown.Item className="input-item">
                Free transaction
              </Dropdown.Item>
              <Dropdown.Item className="input-item">Paid</Dropdown.Item>
              <Dropdown.Item className="input-item">Pending</Dropdown.Item>
              <Dropdown.Item className="input-item">
                Preauthorized
              </Dropdown.Item>
              <Dropdown.Item className="input-item">Refunded</Dropdown.Item>
              <Dropdown.Item>Rejected</Dropdown.Item>
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

export default FormTransactions;
