import React from "react";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./styles.scss";

const Background: React.FC = () => {
  return (
    <Row id="page-home-background">
      <Col className="text" xl="auto" lg="auto" md="auto" xs="auto" sm="auto">
        <h6> Cheffy</h6>
        <p>Rent Kitchen. Lease Kitchen.</p>
      </Col>
    </Row>
  );
};
export default Background;
