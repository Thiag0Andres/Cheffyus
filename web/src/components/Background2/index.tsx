import React from "react";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./styles.scss";

interface Props {
  text: string;
}

const Background2: React.FC<Props> = ({ text }) => {
  return (
    <div id="page-home-background2">
      <div className="opacity"></div>
      <Col className="text" xl="auto" lg="auto" md="auto" xs="auto" sm="auto">
        <h1>{text}</h1>
      </Col>
    </div>
  );
};
export default Background2;
