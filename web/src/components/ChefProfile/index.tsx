import React from "react";
import { Link, useHistory } from "react-router-dom";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import "./styles.scss";

interface Props {
  detail: any;
}

const ChefProfile: React.FC<Props> = ({ detail }) => {
  const history = useHistory();

  const handleNextPage = () => {
    {
      history.push(`/contact-chef/${detail.name}`);
    }
  };

  return (
    <Container fluid id="page-chef-profile">
      <Row className="body">
        <Col className="info" xl="8">
          <h2>1 open listing</h2>

          <div className="box-image">
            <div className="opacity"></div>
            <img src={detail.image_url_restaurant} alt={detail.title} />
            <Link
              className="box1"
              to={{
                pathname: `/restaurant/${detail.title}`,
                state: {
                  detail: detail,
                },
              }}
            >
              <div className="price">
                <span className="value">${detail.price}</span>
                <span className="hour">/ hour</span>
              </div>
              <p>{detail.title}</p>
            </Link>
          </div>

          <h2>No followed people</h2>

          <h2>No reviews</h2>
        </Col>
        <Col className="image" xl="4">
          <img src={detail.image_url_chef_medium} alt={detail.name} />
          <Button className="button" type="submit" onClick={handleNextPage}>
            Contact {detail.name}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
export default ChefProfile;
