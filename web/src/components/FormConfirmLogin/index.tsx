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

const FormConfirmLogin: React.FC = () => {
  // Estado
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(true);

  return (
    <>
      <Row id="content-confirm-login">
        {alert && (
          <Alert className="alert" variant="secondary">
            <FaInfoCircle size={18} />
            Is already connected.
          </Alert>
        )}
        <Col className="body">
          <Form className="form1">
            <p>
              You will soon receive an email with a link to confirm your email
              address. Don't forget to check your spam folder! After confirming
              your address, you can join Cheffy.
            </p>

            {/*           <Form.Group controlId="formBasicForgotEmail">
              <Form.Label className="text">Email</Form.Label>
              <Form.Control className="input" type="email" />
            </Form.Group> */}
            <Button className="button4" type="submit">
              Request new password
            </Button>
            <p>Your email is robson@hotmail.com. Change</p>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default FormConfirmLogin;
