import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Redux e Auth
import { RootStateOrAny, useSelector } from "react-redux";
import { ApplicationState } from "../../store";

// Types
import { User } from "../../store/ducks/user/types";
import { Token } from "../../store/ducks/token/types";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Images
import userNotfound from "../../images/user.png";

import api from "../../services/api";

import "./styles.scss";

const InboxMessage: React.FC = () => {
  const user: User = useSelector((state: ApplicationState) => state.user.user);
  const token: Token = useSelector(
    (state: RootStateOrAny) => state.token.token.token
  );

  // States
  const [messageList, setMessageList] = useState([]);
  const [userMessage, setUserMessage] = useState([]);

  // Chamada a api
  useEffect(() => {
    const proxyurl = "https://afternoon-brook-18118.herokuapp.com/";
    const url = "http://cheffyus-api.herokuapp.com/";

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

  const handle = () => {
    const users: any = [];

    messageList.filter(
      (messageL: any) =>
        (messageL.user_id == user.id || messageL.sender_id == user.id) &&
        users.push(messageL)
    );
    setUserMessage(users);
  };

  //console.log(userMessage);

  useEffect(() => {
    handle();
  }, [messageList]);

  return (
    <Col
      id="content-inbox-message"
      xl="auto"
      lg="auto"
      md="auto"
      xs="auto"
      sm="auto"
    >
      <Row className="body">
        {userMessage.map((messageL: any) => (
          <Link
            key={messageL.id}
            className="message"
            to={{
              pathname: `/conversation/${messageL.sender.first_name}`,
              state: {
                detail: messageL,
              },
            }}
          >
            <Col className="box1" xl="4" lg="4" md="4" xs="4" sm="4">
              <img
                src={
                  messageL.sender.image_url === null
                    ? userNotfound
                    : messageL.sender.image_url
                }
                alt={messageL.sender.first_name}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <div className="name-hour">
                <Link
                  to={{
                    pathname: `/profile-chef/${messageL.sender.first_name}`,
                    state: {
                      detail: messageL.sender,
                    },
                  }}
                >
                  {messageL.sender.first_name + " " + messageL.sender.last_name}
                </Link>
                <p>{messageL.createdAt}</p>
              </div>
            </Col>
            <Col className="box2" xl="6" lg="6" md="6" xs="6" sm="6">
              <p>{messageL.message}</p>
            </Col>
            <Col className="box3" xl="2" lg="2" md="2" xs="2" sm="2">
              <p>{messageL.type_message}</p>
            </Col>
          </Link>
        ))}
      </Row>
    </Col>
  );
};

export default InboxMessage;
