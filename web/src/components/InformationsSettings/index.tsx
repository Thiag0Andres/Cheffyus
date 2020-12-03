import React, { useState } from "react";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import ListGroup from "react-bootstrap/ListGroup";

// Icons
import { RiFileUserLine } from "react-icons/ri";
import { BsFillGridFill } from "react-icons/bs";
import { FaDatabase } from "react-icons/fa";
import { RiFileLockLine } from "react-icons/ri";
import { FaConciergeBell } from "react-icons/fa";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";

// Components
import FormProfileInfo from "../../components/FormProfileInfo";
import FormListings from "../../components/FormListings";
import FormTransactions from "../../components/FormTransactions";
import FormAccount from "../../components/FormAccount";
import FormNotifications from "../../components/FormNotifications";
import FormPayments from "../../components/FormPayments";

import "./styles.scss";

const InformationsSettings: React.FC = () => {
  // States
  const [show, setShow] = useState(true);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [show5, setShow5] = useState(false);
  const [show6, setShow6] = useState(false);

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
                  setShow5(false);
                  setShow6(false);
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
                href="#listings"
                onClick={() => {
                  setShow(false);
                  setShow2(true);
                  setShow3(false);
                  setShow4(false);
                  setShow5(false);
                  setShow6(false);
                }}
              >
                <BsFillGridFill />
                &nbsp;&nbsp;
                <div className="space-between">
                  Listings {show2 && <BsArrowRight />}
                </div>
              </ListGroup.Item>
              <ListGroup.Item
                className="list"
                action
                href="#transactions"
                onClick={() => {
                  setShow(false);
                  setShow2(false);
                  setShow3(true);
                  setShow4(false);
                  setShow5(false);
                  setShow6(false);
                }}
              >
                <FaDatabase />
                <div className="space-between">
                  &nbsp;&nbsp; Transactions {show3 && <BsArrowRight />}
                </div>
              </ListGroup.Item>
              <ListGroup.Item
                className="list"
                action
                href="#account"
                onClick={() => {
                  setShow(false);
                  setShow2(false);
                  setShow3(false);
                  setShow4(true);
                  setShow5(false);
                  setShow6(false);
                }}
              >
                <RiFileLockLine />
                <div className="space-between">
                  &nbsp;&nbsp; Account {show4 && <BsArrowRight />}
                </div>
              </ListGroup.Item>
              <ListGroup.Item
                className="list"
                action
                href="#notifications"
                onClick={() => {
                  setShow(false);
                  setShow2(false);
                  setShow3(false);
                  setShow4(false);
                  setShow5(true);
                  setShow6(false);
                }}
              >
                <FaConciergeBell />
                <div className="space-between">
                  &nbsp;&nbsp; Notifications {show5 && <BsArrowRight />}
                </div>
              </ListGroup.Item>
              <ListGroup.Item
                className="list"
                action
                href="#payments"
                onClick={() => {
                  setShow(false);
                  setShow2(false);
                  setShow3(false);
                  setShow4(false);
                  setShow5(false);
                  setShow6(true);
                }}
              >
                <AiFillDollarCircle />
                <div className="space-between">
                  &nbsp;&nbsp; Payments {show6 && <BsArrowRight />}
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col className="column2" xl="9" lg="9" md="9" xs="9" sm="9">
            <Tab.Content>
              <Tab.Pane eventKey="#profile-info">
                <FormProfileInfo />
              </Tab.Pane>
              <Tab.Pane eventKey="#listings">
                <FormListings />
              </Tab.Pane>
              <Tab.Pane eventKey="#transactions">
                <FormTransactions />
              </Tab.Pane>
              <Tab.Pane eventKey="#account">
                <FormAccount />
              </Tab.Pane>
              <Tab.Pane eventKey="#notifications">
                <FormNotifications />
              </Tab.Pane>
              <Tab.Pane eventKey="#payments">
                <FormPayments />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
};

export default InformationsSettings;
