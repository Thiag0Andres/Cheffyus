import React, { useState } from "react";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Icons
import { IoLogoFacebook } from "react-icons/io";

import "./styles.scss";

const FormSignup: React.FC = () => {
  // Estado
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Row id="contentSignup">
        <Col className="body">
          <Form className="form">
            <Button className="button1" variant="primary" size="lg" block>
              <IoLogoFacebook size={25} />
              Sign up with Facebook
            </Button>
            <h3>Sign up with email</h3>
            <Form.Group controlId="formBasicEmail">
              <Form.Label className="text">Email address</Form.Label>
              <Form.Control className="input" type="email" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label className="text">First Name</Form.Label>
              <Form.Control className="input" type="name" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label className="text">Last Name</Form.Label>
              <Form.Control className="input" type="name" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label className="text">Password</Form.Label>
              <Form.Control className="input" type="password" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label className="text">Confirm Password</Form.Label>
              <Form.Control className="input" type="password" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                className="text2"
                type="checkbox"
                label="I accept the Terms of Use and Privacy policy"
                onClick={() => setShowModal(true)}
              />
              <Form.Check
                className="text2"
                type="checkbox"
                label="I agree to receive occasional emails from the Cheffy team and understand that I can change my mind at any time"
              />
            </Form.Group>
            <Button className="button2" variant="primary" type="submit">
              Create account
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default FormSignup;
