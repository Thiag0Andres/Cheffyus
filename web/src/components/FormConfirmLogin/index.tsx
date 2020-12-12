import React, { useState, ChangeEvent, FormEvent } from "react";
import { useHistory } from "react-router-dom";

// Redux e Auth
import { useSelector, RootStateOrAny } from "react-redux";
import { useDispatch } from "react-redux";
import { updateUser, removeUser } from "../../store/ducks/user/actions";
import { updateToken, removeToken } from "../../store/ducks/token/actions";

// Types
import { User } from "../../store/ducks/user/types";
import { Token } from "../../store/ducks/token/types";

//Message
import { useSnackbar } from "notistack";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import api from "../../services/api";

import "./styles.scss";

const FormConfirmLogin: React.FC = () => {
  const user: User = useSelector((state: RootStateOrAny) => state.user.user);
  const token: Token = useSelector(
    (state: RootStateOrAny) => state.token.token.token
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  // States
  const [show, setShow] = useState(true);
  const [show2, setShow2] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    tokenEmail: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    //console.log(event.target);

    setFormData({ ...formData, [name]: value });
  };

  const ConfirmToken = (event: FormEvent) => {
    event.preventDefault();

    const { tokenEmail } = formData;

    const body = {
      email: user.defaultEmail,
      token: tokenEmail,
    };

    const proxyurl = "https://afternoon-brook-18118.herokuapp.com/";
    const url = "https://cheffyus-api.herokuapp.com/";

    api
      .post(proxyurl + url + `/users/confirm_email/${user.id}`, body, {
        headers: { Authorization: token },
      })
      .then((response) => {
        const data = response.data;

        dispatch(updateUser(data));
        setFormData({ email: "", tokenEmail: "" });

        history.push("/kitchen/grid-kitchens");

        enqueueSnackbar("Email verified successfully!", {
          variant: "success",
        });
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar("Failed to verify email.", {
          variant: "error",
        });
      });
  };

  return (
    <>
      <Row id="content-confirm-login">
        <Col className="body" xl="12" lg="12" md="12" xs="12" sm="12">
          <Form className="form1" onSubmit={ConfirmToken}>
            <Form.Group>
              <Form.Label className="text">Access Token </Form.Label>
              <Form.Control
                className="input"
                name="tokenEmail"
                type="text"
                onChange={handleInputChange}
              />
            </Form.Group>
            <p>
              You will soon receive an email with a link to confirm your email
              address. Don't forget to check your spam folder! After confirming
              your address, you can join Cheffy.
            </p>
            <Button className="button1" type="submit" onSubmit={ConfirmToken}>
              Verify token
            </Button>
          </Form>

          {/* Resend confirmation instructions */}

          <Form className="form2">
            {show && (
              <p className="change-email">
                Your email is {user.defaultEmail}.
                <Button
                  className="button2"
                  onClick={() => {
                    setShow(false);
                    setShow2(true);
                  }}
                >
                  Change
                </Button>
              </p>
            )}
            {show2 && (
              <>
                <p className="change-email">
                  Your email is {user.defaultEmail}.
                  <Button
                    className="button2"
                    onClick={() => {
                      setShow(true);
                      setShow2(false);
                    }}
                  >
                    Cancel
                  </Button>
                </p>
                <Form.Group controlId="formBasicForgotEmail">
                  <Form.Label className="text">New email address: </Form.Label>
                  <Form.Control
                    className="input"
                    type="email"
                    placeholder="email"
                  />
                </Form.Group>
                <Button className="button3" type="submit">
                  Change
                </Button>
              </>
            )}
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default FormConfirmLogin;
