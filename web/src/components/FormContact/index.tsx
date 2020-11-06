import React from "react";

// Bootstrap
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import "./styles.scss";

interface Props {
  match: any;
}

const FormContact: React.FC<Props> = ({ match }) => {
  const nameChef = match.params.contactChef;

  return (
    <>
      <Row id="content-contact">
        <Col className="body">
          <Form className="form">
            <h2> Send message to {nameChef}</h2>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label className="text">Message</Form.Label>
              <Form.Control className="textarea" as="textarea" rows={3} />
            </Form.Group>
            <Button className="button" type="submit">
              Send message
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default FormContact;
