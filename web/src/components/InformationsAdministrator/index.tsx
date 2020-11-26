import React, { useState } from "react";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import ListGroup from "react-bootstrap/ListGroup";

// Icons
import { HiUsers } from "react-icons/hi";
import { BsFillGridFill } from "react-icons/bs";
import { FaDatabase } from "react-icons/fa";
import { BsChatFill } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import { FaPaperPlane } from "react-icons/fa";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { BsArrowRight } from "react-icons/bs";

// Components
import FormConversationsListings from "../../components/AdminComponents/FormConversationsListings";
import FormKitchenListings from "../../components/AdminComponents/FormKitchenListings";
import FormReviewsListings from "../../components/AdminComponents/FormReviewsListings";
import FormTransactionsListings from "../../components/AdminComponents/FormTransactionsListings";
import FormUsersListings from "../../components/AdminComponents/FormUsersListings";

const InformationsSettings: React.FC = () => {
  // States
  const [show, setShow] = useState(true);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [show5, setShow5] = useState(false);
  const [show6, setShow6] = useState(false);
  const [show7, setShow7] = useState(false);
  const [show8, setShow8] = useState(false);

  return (
    <>
      <Tab.Container defaultActiveKey="#users-listings">
        <Row id="content-information">
          <Col className="column1" xl="3" lg="3" md="3" xs="3" sm="3">
            <ListGroup>
              <ListGroup.Item
                className="list"
                action
                href="#users-listings"
                onClick={() => {
                  setShow(true);
                  setShow2(false);
                  setShow3(false);
                  setShow4(false);
                  setShow5(false);
                  setShow6(false);
                  setShow7(false);
                  setShow8(false);
                }}
              >
                <HiUsers />
                &nbsp;&nbsp;
                <div className="space-between">
                  Users {show && <BsArrowRight />}
                </div>
              </ListGroup.Item>
              <ListGroup.Item
                className="list"
                action
                href="#kitchen-listings"
                onClick={() => {
                  setShow(false);
                  setShow2(true);
                  setShow3(false);
                  setShow4(false);
                  setShow5(false);
                  setShow6(false);
                  setShow7(false);
                  setShow8(false);
                }}
              >
                <BsFillGridFill />
                &nbsp;&nbsp;
                <div className="space-between">
                  Kitchens {show2 && <BsArrowRight />}
                </div>
              </ListGroup.Item>
              <ListGroup.Item
                className="list"
                action
                href="#transactions-listings"
                onClick={() => {
                  setShow(false);
                  setShow2(false);
                  setShow3(true);
                  setShow4(false);
                  setShow5(false);
                  setShow6(false);
                  setShow7(false);
                  setShow8(false);
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
                href="#conversations-listings"
                onClick={() => {
                  setShow(false);
                  setShow2(false);
                  setShow3(false);
                  setShow4(true);
                  setShow5(false);
                  setShow6(false);
                  setShow7(false);
                  setShow8(false);
                }}
              >
                <BsChatFill />
                <div className="space-between">
                  &nbsp;&nbsp; Conversations {show4 && <BsArrowRight />}
                </div>
              </ListGroup.Item>
              <ListGroup.Item
                className="list"
                action
                href="#reviews-listings"
                onClick={() => {
                  setShow(false);
                  setShow2(false);
                  setShow3(false);
                  setShow4(false);
                  setShow5(true);
                  setShow6(false);
                  setShow7(false);
                  setShow8(false);
                }}
              >
                <AiFillLike />
                <div className="space-between">
                  &nbsp;&nbsp; Reviews {show5 && <BsArrowRight />}
                </div>
              </ListGroup.Item>
              <ListGroup.Item
                className="list"
                action
                href=""
                onClick={() => {
                  setShow(false);
                  setShow2(false);
                  setShow3(false);
                  setShow4(false);
                  setShow5(false);
                  setShow6(true);
                  setShow7(false);
                  setShow8(false);
                }}
              >
                <FaPaperPlane />
                <div className="space-between">
                  &nbsp;&nbsp; Email users {show6 && <BsArrowRight />}
                </div>
              </ListGroup.Item>
              <ListGroup.Item
                className="list"
                action
                href=""
                onClick={() => {
                  setShow(false);
                  setShow2(false);
                  setShow3(false);
                  setShow4(false);
                  setShow5(false);
                  setShow6(false);
                  setShow7(true);
                  setShow8(false);
                }}
              >
                <RiMoneyDollarCircleFill />
                <div className="space-between">
                  &nbsp;&nbsp; Payment system {show7 && <BsArrowRight />}
                </div>
              </ListGroup.Item>
              <ListGroup.Item
                className="list"
                action
                href=""
                onClick={() => {
                  setShow(false);
                  setShow2(false);
                  setShow3(false);
                  setShow4(false);
                  setShow5(false);
                  setShow6(false);
                  setShow7(false);
                  setShow8(true);
                }}
              >
                <MdEmail />
                <div className="space-between">
                  &nbsp;&nbsp; Email {show8 && <BsArrowRight />}
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col className="column2" xl="9" lg="9" md="9" xs="9" sm="9">
            <Tab.Content>
              <Tab.Pane eventKey="#users-listings">
                <FormUsersListings />
              </Tab.Pane>
              <Tab.Pane eventKey="#kitchen-listings">
                <FormKitchenListings />
              </Tab.Pane>
              <Tab.Pane eventKey="#transactions-listings">
                <FormTransactionsListings />
              </Tab.Pane>
              <Tab.Pane eventKey="#conversations-listings">
                <FormConversationsListings />
              </Tab.Pane>
              <Tab.Pane eventKey="#reviews-listings">
                <FormReviewsListings />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
};

export default InformationsSettings;
