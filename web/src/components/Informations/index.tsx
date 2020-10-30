import React from "react";

//Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import ListGroup from "react-bootstrap/ListGroup";

//Components
import About from "../../components/About";
import HowToUse from "../../components/HowToUse";
import Privacy from "../../components/Privacy";
import Terms from "../../components/Terms";

import "./styles.scss";

const Informations: React.FC = () => {
  return (
    <>
      <Tab.Container id="content" defaultActiveKey="#about">
        <Row>
          <Col xl={3}>
            <ListGroup>
              <ListGroup.Item action href="#about">
                About
              </ListGroup.Item>
              <ListGroup.Item action href="#how_to_use">
                How it works
              </ListGroup.Item>
              <ListGroup.Item action href="#privacy">
                Privacy policy
              </ListGroup.Item>
              <ListGroup.Item action href="#terms">
                Terms of use
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col xl={9}>
            <Tab.Content>
              <Tab.Pane eventKey="#about">
                <About />
              </Tab.Pane>
              <Tab.Pane eventKey="#how_to_use">
                <HowToUse />
              </Tab.Pane>
              <Tab.Pane eventKey="#privacy">
                <Privacy />
              </Tab.Pane>
              <Tab.Pane eventKey="#terms">
                <Terms />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
};

export default Informations;
