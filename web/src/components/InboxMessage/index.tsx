import React, { useEffect, useState } from "react";

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
    messageList.map((messageL: any) => {
      (messageL.user_id == user.id || messageL.sender_id == user.id) &&
        userList.map((userL: any) => {
          (userL.id == messageL.user_id || userL.id == messageL.sender_id) &&
            userL.id != user.id &&
            setUserMessage(userL);
        });
    });
  };

  console.log(userMessage);

  return (
    <Row id="content-inbox-message">
      <Col className="body" xl="12" lg="12" md="12" xs="12" sm="12">
        <div className="alert">
          {userMessage.map((userM) => (
            <img
              src={userM.image_url === null ? userNotfound : userM.image_url}
              alt={userM.first_name}
            />
          ))}
        </div>
      </Col>
    </Row>
  );
};

export default InboxMessage;
