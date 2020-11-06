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
}

const Info: React.FC<Props> = ({ detail }) => {
  return (
    <>
      <Row id="content-info">
        <Col className="body"></Col>
      </Row>
    </>
  );
};

export default Info;
