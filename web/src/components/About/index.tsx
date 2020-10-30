import React from "react";

//Bootstrap
import Row from "react-bootstrap/Row";

import "./styles.scss";

const About: React.FC = () => {
  return (
    <>
      <Row id="content">
        How it works <br />
        Here you can find information about how Cheffy works.
      </Row>
    </>
  );
};

export default About;
