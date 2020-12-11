import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

// Bootstrap
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

// Redux e Auth
import { useSelector, RootStateOrAny } from "react-redux";
import { isAuthenticated } from "../../services/auth";

// Types
import { User } from "../../store/ducks/user/types";

//Message
import { useSnackbar } from "notistack";

import api from "../../services/api";

import "./styles.scss";

const FormTextArea: React.FC = () => {
  const user: User = useSelector((state: RootStateOrAny) => state.user.user);
  const { enqueueSnackbar } = useSnackbar();

  //States
  const [isLogged, setIsLogged] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });

  // Atualiza o estado de autenticação na mudança de usuário
  useEffect(() => {
    const response = isAuthenticated();
    setIsLogged(response);
  }, [user]);

  const handleInputChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    //console.log(event.target);

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const { email, message } = formData;

    if (isLogged) {
      const body = {
        sender_id: user.id,
        message: message,
      };

      const proxyurl = "https://afternoon-brook-18118.herokuapp.com/";
      const url = "https://cheffyus-api.herokuapp.com/";

      api
        .post(proxyurl + url + "inbox/contact/admin", body)
        .then(() => {
          setFormData({ email: "", message: "" });
          enqueueSnackbar("Message sent successfully!", {
            variant: "success",
          });
        })
        .catch((error) => {
          enqueueSnackbar("Failed to send message.", { variant: "error" });
          console.log(error);
        });
    } else {
      const body = {
        email: email,
        message: message,
      };

      const proxyurl = "https://afternoon-brook-18118.herokuapp.com/";
      const url = "https://cheffyus-api.herokuapp.com/";

      api
        .post(proxyurl + url + "inbox/contact/admin", body)
        .then(() => {
          setFormData({ email: "", message: "" });
          enqueueSnackbar("Message sent successfully!", {
            variant: "success",
          });
        })
        .catch((error) => {
          enqueueSnackbar("Failed to send message.", { variant: "error" });
          console.log(error);
        });
    }
  };

  return (
    <>
      <Row id="content-form-area">
        <Col className="body" xl="12" lg="12" md="12" xs="12" sm="12">
          <Form className="form" onSubmit={handleSubmit}>
            {!isLogged && (
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label className="text">
                  Your email address (to contact you)
                </Form.Label>
                <Form.Control
                  className="input"
                  type="email"
                  name="email"
                  onChange={handleInputChange}
                />
              </Form.Group>
            )}
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label className="text">
                Your message to the Cheffy team
              </Form.Label>
              <Form.Control
                className="textarea"
                as="textarea"
                rows={3}
                name="message"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button className="button" type="submit" onClick={handleSubmit}>
              Log message
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default FormTextArea;
