import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import chef from "../../images/chef.svg";

import "./styles.scss";

const MenuScreen: React.FC = () => {
  const history = useHistory();

  // States
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    /*     37.9179474,
    -83.9116557, */
    0,
    0,
  ]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    });
  }, []);

  const handlePageFood = () => {
    history.push({
      pathname: `/food/grid-foods/${initialPosition}`,
      state: {
        locationUser: initialPosition,
      },
    });
  };

  const handlePageKitchen = () => {
    history.push("/kitchen/grid-kitchens");
  };

  return (
    <Container id="content-menu-screen">
      <Row className="body">
        <Col className="info" xl="auto" lg="auto" md="auto" xs="auto" sm="auto">
          <div className="texts">
            {" "}
            <h5>Welcome to Cheffy</h5>
            <p className="text">
              Now you must select which service you want to go to
            </p>
          </div>

          <div className="buttons">
            <Button className="button" onClick={handlePageFood}>
              Order Food
            </Button>
            <Button
              className="button"
              style={{ marginLeft: "80px" }}
              onClick={handlePageKitchen}
            >
              Rent Kitchen
            </Button>
          </div>
        </Col>
        <Col className="image" xl="6" lg="6" md="6" xs="6" sm="6">
          <img src={chef} alt="" />
        </Col>
      </Row>
    </Container>
  );
};

export default MenuScreen;
