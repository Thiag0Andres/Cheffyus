import React from "react";

// Bootstrap
import Container from "react-bootstrap/Container";

// Images
import fastFood from "../../images/fastFood.svg";

import "./styles.scss";

const PlateNotExist: React.FC = () => {
  return (
    <Container id="image">
      <img src={fastFood} />
      <h1 className="text">
        There are no plates for the selected specification
      </h1>
    </Container>
  );
};

export default PlateNotExist;
