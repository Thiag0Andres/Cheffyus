import React from "react";
import { Link } from "react-router-dom";

// Bootstrap
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import "./styles.scss";

interface Props {
  detail: any;
  message: boolean;
}

const FormContact: React.FC<Props> = ({ detail, message }) => {
  return (
    <>
      <Row id="content-contact">
        <Col className="body" xl="12" lg="12" md="12" xs="12" sm="12">
          <Form className="form">
            <h2>
              Send message to{" "}
              <Link
                to={{
                  pathname: `/profile-chef/${detail.name}`,
                  state: {
                    detail: detail,
                  },
                }}
              >
                {detail.name}
              </Link>
            </h2>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              {message && <Form.Label className="text">Message</Form.Label>}
              <Form.Control className="textarea" as="textarea" rows={3} />
            </Form.Group>
            <Button className="button">Send message</Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default FormContact;
