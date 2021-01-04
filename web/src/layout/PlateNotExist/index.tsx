import React from "react";

// Bootstrap
import Container from "react-bootstrap/Container";

// Images
import fastFood from "../../images/fastFood.svg";

import "./styles.scss";
interface Props {
  text: string;
}

const PaymentSuccess: React.FC<Props> = ({ text }) => {
  return (
    <Container id="image">
      <img src={fastFood} />
      <h1 className="text">{text}</h1>
    </Container>
  );
};

export default PaymentSuccess;
