import React from "react";
import { Link } from "react-router-dom";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

// Icons
import { BsChatFill } from "react-icons/bs";

// Images
import user from "../../images/user.png";

import "./styles.scss";

interface Props {
  detail: any;
}

const UserProfile: React.FC<Props> = ({ detail }) => {
  return (
    <Container fluid id="page-user-profile">
      <Row className="body">
        <Col className="info" xl="8">
          <Link to="/settings">
            <BsChatFill />
            Share something about yourself
          </Link>
          <h2>
            No open listings
            <Link className="text-link" to="/settings">
              Manage all my listings
            </Link>
          </h2>

          <h2>No followed people</h2>

          <h2>No reviews</h2>
        </Col>
        <Col className="image" xl="4">
          <img src={user} alt={detail.name} />
          <Button className="button" href="/settings">
            Edit profile
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
export default UserProfile;
