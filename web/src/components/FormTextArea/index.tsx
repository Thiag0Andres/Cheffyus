import React, { useState } from "react";

//Bootstrap
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import "./styles.scss";

const FormTextArea: React.FC = () => {
  return (
    <>
      <Row id="content">
        <Col className="body">
          <Form className="form">
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label id="text">
                Your email address (to contact you)
              </Form.Label>
              <Form.Control className="input" type="email" />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label id="text">Your message to the Cheffy team</Form.Label>
              <Form.Control className="textarea" as="textarea" rows={3} />
            </Form.Group>
            <Button className="button">Send message</Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default FormTextArea;
