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

import api from "../../services/api";

import "./styles.scss";

const InboxMessage: React.FC = () => {
  const user: User = useSelector((state: ApplicationState) => state.user.user);
  const token: Token = useSelector(
    (state: RootStateOrAny) => state.token.token.token
  );

  // States
  const [messageList, setMessageList] = useState([]);
  const [messageUserId, setMessageUserId] = useState([]);
  const [userList, setUserList] = useState([]);

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
  }, []);

  /*   messageList.map((messageL: any) => {
    if (messageL.sender_id == user.id) {
      setMessageUserId(messageL);
    }
  }); */

  return (
    <Row id="content-inbox-message">
      <Col className="body" xl="12" lg="12" md="12" xs="12" sm="12">
        <div className="alert">
          {/* <img src={} alt={} /> */}
          Your account was created successfully. Now you need to confirm your
          email address.
        </div>
      </Col>
    </Row>
  );
};

export default InboxMessage;

/*               d.user.image_url === null
                ? userNotfound
                : restaurant.user.image_url 
                
                restaurant.user.first_name*/
