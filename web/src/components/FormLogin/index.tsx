import React from "react";
import { Link } from "react-router-dom";

//Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

//Icons
import { IoLogoFacebook } from "react-icons/io";

import "./styles.scss";

const FormLogin: React.FC = () => {
  return (
    <>
      <Row id="contentLogin">
        <Col className="body">
          <Form className="form">
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
            <Button className="button2" variant="primary" type="submit">
              Log in
            </Button>
            <div>
              <Link to="/signup">Create a new account</Link>
            </div>
            <Link to="/">Forgot password</Link>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default FormLogin;
