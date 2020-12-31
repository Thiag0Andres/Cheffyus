import React, { useState } from "react";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import ListGroup from "react-bootstrap/ListGroup";

// Icons
import { RiFileUserLine } from "react-icons/ri";
import { MdLocalShipping } from "react-icons/md";
import { AiFillDollarCircle } from "react-icons/ai";
import { GrUnorderedList } from "react-icons/gr";
import { BsArrowRight } from "react-icons/bs";

// Components
import FormProfileInfoFood from "../../components/FormProfileInfoFood";
import FormShipping from "../../components/FormShipping";
import FormPayment from "../../components/FormPayment";
import FormOrderDetailsFood from "../../components/FormOrderDetailsFood";

import "./styles.scss";

const InformationsSettingsFood: React.FC = () => {
  // States
  const [show, setShow] = useState(true);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);

  return (
    <>
      <Tab.Container defaultActiveKey="#profile-info">
        <Row id="content-information-settings">
          <Col className="column1" xl="3" lg="3" md="3" xs="3" sm="3">
            <ListGroup>
              <ListGroup.Item
                className="list"
                action
                href="#profile-info"
                onClick={() => {
                  setShow(true);
                  setShow2(false);
                  setShow3(false);
                  setShow4(false);
                }}
              >
                <RiFileUserLine />
                &nbsp;&nbsp;
                <div className="space-between">
                  Profile info {show && <BsArrowRight />}
                </div>
              </ListGroup.Item>
              <ListGroup.Item
                className="list"
                action
                href="#shipping"
                onClick={() => {
                  setShow(false);
                  setShow2(true);
                  setShow3(false);
                  setShow4(false);
                }}
              >
                <MdLocalShipping />
                &nbsp;&nbsp;
                <div className="space-between">
                  Shipping {show2 && <BsArrowRight />}
                </div>
              </ListGroup.Item>
              <ListGroup.Item
                className="list"
                action
                href="#payment"
                onClick={() => {
                  setShow(false);
                  setShow2(false);
                  setShow3(true);
                  setShow4(false);
                }}
              >
                <AiFillDollarCircle />
                <div className="space-between">
                  &nbsp;&nbsp; Payment {show3 && <BsArrowRight />}
                </div>
              </ListGroup.Item>
              <ListGroup.Item
                className="list"
                action
                href="#ordersDetails"
                onClick={() => {
                  setShow(false);
                  setShow2(false);
                  setShow3(false);
                  setShow4(true);
                }}
              >
                <GrUnorderedList />
                <div className="space-between">
                  &nbsp;&nbsp; Orders Details {show4 && <BsArrowRight />}
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col className="column2" xl="9" lg="9" md="9" xs="9" sm="9">
            <Tab.Content>
              <Tab.Pane eventKey="#profile-info">
                <FormProfileInfoFood />
              </Tab.Pane>
              <Tab.Pane eventKey="#shipping">
                <FormShipping />
              </Tab.Pane>
              <Tab.Pane eventKey="#payment">
                <FormPayment />
              </Tab.Pane>
              <Tab.Pane eventKey="#ordersDetails">
                <FormOrderDetailsFood />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
};

export default InformationsSettingsFood;
