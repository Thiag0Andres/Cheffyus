import React, { useState } from "react";
import { Link } from "react-router-dom";

//Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Button";

//Icons
import { IoLogoFacebook } from "react-icons/io";
import { FaInfoCircle } from "react-icons/fa";

import "./styles.scss";

const FormLogin: React.FC = () => {
  // Estado
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(true);

  return (
    <>
      <Row id="contentLogin">
        {alert && (
          <Alert className="alert" variant="secondary">
            <FaInfoCircle size={18} />
            <div>
              You must log in to Cheffy to create a new listing. If you don't
              have an account you can
              <Link to="/signup"> create one here</Link>
            </div>
          </Alert>
        )}
        <Col className="body">
          <Form className="form1">
            <Button className="button1" variant="primary" size="lg" block>
              <IoLogoFacebook size={25} />
              Log in with Facebook
            </Button>
            <p>...or with your email:</p>
            <Form.Group controlId="formBasicEmail">
              <Form.Label className="text">Email:</Form.Label>
              <Form.Control className="input" type="email" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label className="text">Password:</Form.Label>
              <Form.Control className="input" type="password" />
            </Form.Group>
            <Button className="button2" type="submit" href="/confirm-login">
              Log in
            </Button>
            <div>
              <Link to="/signup">Create a new account</Link>
            </div>
            <Button className="button3" onClick={() => setShow(true)}>
              Forgot password
            </Button>
            {show && (
              <Form className="form2">
                <p>Enter your email address to reset your password.</p>
                <Form.Group controlId="formBasicForgotEmail">
                  <Form.Label className="text">Email</Form.Label>
                  <Form.Control className="input" type="email" />
                </Form.Group>
                <Button className="button4" type="submit">
                  Request new password
                </Button>
              </Form>
            )}
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default FormLogin;
