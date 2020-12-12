import React from "react";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const BackgroundFood: React.FC = () => {
  return (
    <Row id="page-home-background">
      <Col className="text" xl="auto" lg="auto" md="auto" xs="auto" sm="auto">
        <h6>Cheffy</h6>
        <p>Order Food. Lease Food.</p>
      </Col>
    </Row>
  );
};
export default BackgroundFood;
