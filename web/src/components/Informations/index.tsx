import React, { useState } from "react";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import ListGroup from "react-bootstrap/ListGroup";

// Icons
import { FaInfoCircle } from "react-icons/fa";
import { FaMapSigns } from "react-icons/fa";
import { RiFileLockLine } from "react-icons/ri";
import { CgFileDocument } from "react-icons/cg";
import { BsArrowRight } from "react-icons/bs";

// Components
import About from "../../components/About";
import HowToUse from "../../components/HowToUse";
import Privacy from "../../components/Privacy";
import Terms from "../../components/Terms";

import "./styles.scss";

const Informations: React.FC = () => {
  // States
  const [show, setShow] = useState(true);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);

  return (
    <>
      <Tab.Container defaultActiveKey="#about">
        <Row id="content-information">
          <Col className="column1" xl="3" lg="3" md="3" xs="3" sm="3">
            <ListGroup>
              <ListGroup.Item
                className="list"
                action
                href="#about"
                onClick={() => {
                  setShow(true);
                  setShow2(false);
                  setShow3(false);
                  setShow4(false);
                }}
              >
                <FaInfoCircle />
                <div className="space-between">
                  About {show && <BsArrowRight />}
                </div>
              </ListGroup.Item>
              <ListGroup.Item
                className="list"
                action
                href="#how_to_use"
                onClick={() => {
                  setShow(false);
                  setShow2(true);
                  setShow3(false);
                  setShow4(false);
                }}
              >
                <FaMapSigns />
                <div className="space-between">
                  How it works {show2 && <BsArrowRight />}
                </div>
              </ListGroup.Item>
              <ListGroup.Item
                className="list"
                action
                href="#privacy"
                onClick={() => {
                  setShow(false);
                  setShow2(false);
                  setShow3(true);
                  setShow4(false);
                }}
              >
                <RiFileLockLine />
                <div className="space-between">
                  Privacy policy {show3 && <BsArrowRight />}
                </div>
              </ListGroup.Item>
              <ListGroup.Item
                className="list"
                action
                href="#terms"
                onClick={() => {
                  setShow(false);
                  setShow2(false);
                  setShow3(false);
                  setShow4(true);
                }}
              >
                <CgFileDocument style={{ transform: "rotateX(180deg)" }} />
                <div className="space-between">
                  Terms of use {show4 && <BsArrowRight />}
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col className="column2" xl="9" lg="9" md="9" xs="9" sm="9">
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
