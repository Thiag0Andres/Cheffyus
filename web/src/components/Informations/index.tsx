import React from "react";

//Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import ListGroup from "react-bootstrap/ListGroup";

//Icons
import { FaInfoCircle } from "react-icons/fa";
import { FaMapSigns } from "react-icons/fa";
import { RiFileLockLine } from "react-icons/ri";
import { CgFileDocument } from "react-icons/cg";
import { BsArrowRight } from "react-icons/bs";

//Components
import About from "../../components/About";
import HowToUse from "../../components/HowToUse";
import Privacy from "../../components/Privacy";
import Terms from "../../components/Terms";

import "./styles.scss";

const Informations: React.FC = () => {
  return (
    <>
      <Tab.Container defaultActiveKey="#about">
        <Row className="content">
          <Col className="column1" xl={3}>
            <ListGroup>
              <ListGroup.Item id="list" action href="#about">
                <FaInfoCircle />
                <div id="space-between">
                  About <BsArrowRight />
                </div>
              </ListGroup.Item>
              <ListGroup.Item id="list" action href="#how_to_use">
                <FaMapSigns />
                <div id="space-between">
                  How it works <BsArrowRight />
                </div>
              </ListGroup.Item>
              <ListGroup.Item id="list" action href="#privacy">
                <RiFileLockLine />
                <div id="space-between">
                  Privacy policy <BsArrowRight />
                </div>
              </ListGroup.Item>
              <ListGroup.Item id="list" action href="#terms">
                <CgFileDocument style={{ transform: "rotateX(180deg)" }} />
                <div id="space-between">
                  Terms of use <BsArrowRight />
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col className="column2" xl={9}>
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
