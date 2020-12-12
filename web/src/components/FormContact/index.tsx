import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Redux e Auth
import { RootStateOrAny, useSelector } from "react-redux";
import { ApplicationState } from "../../store";

// Types
import { User } from "../../store/ducks/user/types";
import { Token } from "../../store/ducks/token/types";

//Message
import { useSnackbar } from "notistack";

// Bootstrap
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import api from "../../services/api";

import "./styles.scss";

interface Props {
  detail: any;
  verification: boolean;
}

const FormContact: React.FC<Props> = ({ detail, verification }) => {
  const user: User = useSelector((state: ApplicationState) => state.user.user);
  const token: Token = useSelector(
    (state: RootStateOrAny) => state.token.token.token
  );
  const { enqueueSnackbar } = useSnackbar();

  // State
  const [formData, setFormData] = useState({
    message: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    //console.log(event.target);

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const { message } = formData;

    const body = {
      user_id: detail.user.id,
      sender_id: user.id,
      message: message,
      isReview: false,
    };

    const proxyurl = "https://afternoon-brook-18118.herokuapp.com/";
    const url = "https://cheffyus-api.herokuapp.com/";

    api
      .post(proxyurl + url + "inbox", body, {
        headers: { Authorization: token },
      })
      .then(() => {
        setFormData({ message: "" });
        enqueueSnackbar("Message sent successfully!", {
          variant: "success",
        });
      })
      .catch((error) => {
        enqueueSnackbar("Failed to send message.", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <Row id="content-contact">
      <Col className="body" xl="12" lg="12" md="12" xs="12" sm="12">
        <Form className="form" onSubmit={handleSubmit}>
          <h2>
            Send message to{" "}
            <Link
              to={{
                pathname: `/kitchen/profile-chef/${detail.user.first_name}`,
                state: {
                  detail: detail,
                },
              }}
            >
              {detail.user.first_name}
            </Link>
          </h2>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            {verification && <Form.Label className="text">Message</Form.Label>}
            <Form.Control
              className="textarea"
              as="textarea"
              name="message"
              rows={3}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button className="button" type="submit" onClick={handleSubmit}>
            Send message
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default FormContact;
