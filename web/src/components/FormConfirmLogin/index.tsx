import React, { useState } from "react";
import { Link } from "react-router-dom";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Button";

// Icons
import { FaInfoCircle } from "react-icons/fa";

import "./styles.scss";

const FormConfirmLogin: React.FC = () => {
  // States
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(true);
  //Your account was created successfully. Now you need to confirm your email address. --> Quando o usário fez o cadastro
  //Is already connected. --> Quando já se encrota conectado
  //Check your inbox --> Quando o usuário manda refazer o email
  //Welcome, "nome"! --> Quando fez o login e não confirmou ainda
  return (
    <>
      <Row id="content-confirm-login">
        {alert && (
          <Alert className="alert" variant="secondary">
            <FaInfoCircle size={18} />
            Your account was created successfully. Now you need to confirm your
            email address.
          </Alert>
        )}
        <Col className="body">
          <Form className="form1">
            <p>
              You will soon receive an email with a link to confirm your email
              address. Don't forget to check your spam folder! After confirming
              your address, you can join Cheffy.
            </p>
            <Button className="button1" type="submit">
              Resend confirmation instructions
            </Button>
            <p className="change-email">
              Your email is "email".
              <Button className="button2" onClick={() => setShow(true)}>
                Change
              </Button>
            </p>

            {show && (
              <Form className="form2">
                <Form.Group controlId="formBasicForgotEmail">
                  <Form.Label className="text">New email address: </Form.Label>
                  <Form.Control
                    className="input"
                    type="email"
                    placeholder="email"
                  />
                </Form.Group>
                <Button className="button3" type="submit">
                  Change
                </Button>
              </Form>
            )}
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default FormConfirmLogin;
