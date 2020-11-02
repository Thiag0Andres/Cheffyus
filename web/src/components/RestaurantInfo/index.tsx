import React from "react";
import { Link } from "react-router-dom";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";

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
          <Carousel>
            <Carousel.Item>
              <img src={detail.image_url_restaurant} alt={detail.title} />
            </Carousel.Item>
            <Carousel.Item>
              <img src={detail.image_url_restaurant} alt={detail.title} />
            </Carousel.Item>
          </Carousel>
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
            <Link
              to={{
                pathname: `/profile/${detail.name}`,
                state: {
                  detail: detail,
                },
              }}
            >
              <img src={detail.image_url_chef_medium} alt={detail.name} />
              {detail.name}
            </Link>

            <Button className="button" type="submit" href="/contact-chef">
              Contact
            </Button>
          </div>
          <div className="box3"></div>
        </Col>
      </Row>
    </Container>
  );
};
export default RestaurantInfo;
