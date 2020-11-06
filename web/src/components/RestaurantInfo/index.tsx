import React from "react";
import { Link, useHistory } from "react-router-dom";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";

import "./styles.scss";

interface Props {
  detail: any;
}

const RestaurantInfo: React.FC<Props> = ({ detail }) => {
  const history = useHistory();

  const handleNextPageContactChef = () => {
    {
      history.push({
        pathname: `/contact-chef/${detail.name}`,
        state: {
          detail: detail,
        },
      });
    }
  };

  const handleNextPageRequest = () => {
    {
      history.push({
        pathname: `/request/${detail.title}`,
        state: {
          detail: detail,
        },
      });
    }
  };

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
                pathname: `/profile-chef/${detail.name}`,
                state: {
                  detail: detail,
                },
              }}
            >
              <img src={detail.image_url_chef_medium} alt={detail.name} />
              {detail.name}
            </Link>

            <Button
              className="button"
              type="submit"
              onClick={handleNextPageContactChef}
            >
              Contact
            </Button>
          </div>
          <div className="box3">
            <Button
              className="button"
              type="submit"
              onClick={handleNextPageRequest}
            >
              Request
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default RestaurantInfo;
