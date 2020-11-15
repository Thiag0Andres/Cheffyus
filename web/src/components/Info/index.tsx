import React from "react";
import { Link } from "react-router-dom";

// Bootstrap
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import "./styles.scss";

interface Props {
  detail: any;
}

const Info: React.FC<Props> = ({ detail }) => {
  return (
    <Container id="content-info">
      <Col className="body" xl="auto" lg="auto" md="auto" xs="auto" sm="auto">
        <Row className="row">
          <h2>Details</h2>
        </Row>
        <Row className="row">
          <p>
            <Link
              to={{
                pathname: `/restaurant/${detail.title}`,
                state: {
                  detail: detail,
                },
              }}
            >
              {detail.title}
            </Link>{" "}
            by{" "}
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
          </p>
        </Row>
        <Row className="row">
          <div className="box1">
            <div className="price">
              <p>Price per hour:</p>
              <p>${detail.price}</p>
            </div>
            <div className="price">
              <p className="text">Price:</p>
              <p className="text">${detail.price}</p>
            </div>
          </div>
        </Row>
      </Col>
    </Container>
  );
};

export default Info;
