import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Redux e Auth
import { RootStateOrAny, useSelector } from "react-redux";
import { ApplicationState } from "../../../store";

// Types
import { User } from "../../../store/ducks/user/types";
import { Token } from "../../../store/ducks/token/types";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

// Icons
import { TiPencil } from "react-icons/ti";

import api from "../../../services/api";

import "./styles.scss";

const FormConversationsListings: React.FC = () => {
  const user: User = useSelector((state: ApplicationState) => state.user.user);
  const token: Token = useSelector(
    (state: RootStateOrAny) => state.token.token.token
  );

  // States
  const [messageList, setMessageList] = useState([]);
  const [messageForUser, setMessageForUser] = useState([]);
  const [userMessage, setUserMessage] = useState<Array<any>>([]);
  const [userList, setUserList] = useState([]);

  // Chamada a api
  useEffect(() => {
    const proxyurl = "https://afternoon-brook-18118.herokuapp.com/";
    const url = "http://cheffyus-api.herokuapp.com/";

    api
      .get(proxyurl + url + "users", {
        headers: { Authorization: token },
      })
      .then((response) => {
        setUserList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    api
      .get(proxyurl + url + "inbox", {
        headers: { Authorization: token },
      })
      .then((response) => {
        setMessageList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    handle();
  }, [messageList, userList]);

  const handle = () => {
    const users: any = [];

    messageList.filter((messageL: any) =>
      userList.map(
        (userL: any) =>
          messageL.sender_id == userL.id && users.push(userL, messageL)
      )
    );
    setUserMessage(users);
  };

  console.log(userMessage);

  return (
    <>
      <Col
        id="content-form-conversations"
        xl="auto"
        lg="auto"
        md="auto"
        xs="auto"
        sm="auto"
      >
        <Row className="body">
          <h2>Conversations</h2>
          <Form className="form">
            <Form.Control
              className="input"
              type="text"
              placeholder="Search for a name, email or keyword"
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="buttons">
              <Button className="button1">Search</Button>
              <Button className="button2">Show all</Button>
            </div>
          </Form>
          <Table striped bordered hover>
            <thead
              style={{
                color: "#3c3c3c",
              }}
            >
              <tr>
                <th>Started from</th>
                <th>Status</th>
                <th>Started</th>
                <th>Latest Activity</th>
                <th>Starter</th>
                <th>Seller</th>
              </tr>
            </thead>
            <tbody
              style={{
                color: "#3c3c3c",
              }}
            >
              {userMessage.map((userM: any) => (
                <tr>
                  <td>{userM.isReview}</td>
                  <td>{userM.createdAt}</td>
                  <td>{userM.updatedAt}</td>
                  <td>{userM.first_name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      </Col>
    </>
  );
};

export default FormConversationsListings;
