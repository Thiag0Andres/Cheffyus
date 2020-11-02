import React from "react";
import { Link } from "react-router-dom";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

// Icons
import { BsFillGridFill } from "react-icons/bs";
import { GoListUnordered } from "react-icons/go";
import { FaMapMarkedAlt } from "react-icons/fa";

import "./styles.scss";

interface Props {
  detail: any;
}

const RestaurantInfo: React.FC<Props> = ({ detail }) => {
  return (
    <Container fluid id="page-restaurant-info">
      <Row className="body">
        <Col className="image" xl="9">
          <div className="opacity"></div>
          <img src={detail.image_url_restaurant} alt={detail.title} />
          <p>{detail.description}</p>
        </Col>
        <Col className="info" xl="3">
          <div className="box1">
            <div className="price">
              <span className="value">${detail.price}</span>
              <span className="hour">/ hour</span>
            </div>
          </div>
          <div className="box2">
            <img src={detail.image_url_chef_medium} alt={detail.name} />
            <Button className="button" type="submit" href="/contact-chef">
              Contact {detail.name}
            </Button>
          </div>
          <div className="box3"></div>
        </Col>
      </Row>
    </Container>
  );
};
export default RestaurantInfo;
