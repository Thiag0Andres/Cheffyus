import React, { useState, ChangeEvent, FormEvent } from "react";
import { useHistory } from "react-router-dom";

// Redux e Auth
import { checkAuth } from "../../services/validation";
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/ducks/user/actions";
import { updateToken } from "../../store/ducks/token/actions";

//Message
import { useSnackbar } from "notistack";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Facebook login
import FacebookLogin from "react-facebook-login";

// Icons
import { IoLogoFacebook } from "react-icons/io";

import api from "../../services/api";

import "./styles.scss";

const FormSignup: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  // State
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    defaultEmail: "",
    first_name: "",
    last_name: "",
    password: "",
  });

  /* const signIn = () => {
    // Cria um usuário padrão
    const user = {
      id: "1",
      email: email.trim(),
      name: "thiago p",
      nickName: "tp",
      token: "tokem_valido",
    };
    // Validação do email
    const isEmailValid = checkAuth("email", email.trim());

    // Verificando autenticação
    const isValidated = checkAuth("auth", {
      email: email.trim(),
      password,
    });

    if (email === "" && password === "") {
      setError(true);
    } else if (email === "" || password === "") {
      setError(true);
    } else if (!isEmailValid) {
      setError(true);
    } else if (isValidated) {
      dispatch(updateUser({ user }));
      history.push("/confirm-login");
      //enqueueSnackbar("Usuário logado com sucesso!", { variant: "success" });
    } else {
      setEmail("");
      setPassword("");
      //enqueueSnackbar("Falha ao autenticar.", { variant: "error" });
    }
  }; */

  const handleInputChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    //console.log(event.target);

    setFormData({ ...formData, [name]: value });
  };

  const responseFacebook = (response: any) => {
    //console.log(response);

    if (response.status !== "unknown") {
      var texto = response.name;
      var palavras = texto.split(" ");

      const body = {
        emails: [response.email],
        defaultEmail: response.email,
        first_name: palavras[0],
        last_name: palavras[1],
        username: palavras[0].toLowerCase() + palavras[1].toLowerCase(),
        display_name:
          palavras[0][0].toUpperCase() + palavras[1][0].toUpperCase(),
        image_url: response.picture.data.url,
        password: response.userID,
        user_type: "chef",
      };

      const proxyurl = "https://afternoon-brook-18118.herokuapp.com/";
      const url = "https://cheffyus-api.herokuapp.com/";

      api
        .post(proxyurl + url + "users/register", body)
        .then((response) => {
          const data = response.data.result;

          dispatch(updateUser(data));
          dispatch(
            updateToken({
              token: { token: `Bearer ${response.data.result.auth_token}` },
            })
          );

          history.push("/kitchen/confirm-login");

          enqueueSnackbar("User successfully registered!", {
            variant: "success",
          });
        })
        .catch((error) => {
          enqueueSnackbar(error.response.data.message, { variant: "error" });
          console.log(error);
        });
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const { defaultEmail, first_name, last_name, password } = formData;

    const body = {
      emails: [defaultEmail],
      defaultEmail,
      first_name,
      last_name,
      username:
        first_name.length > 0 && last_name.length > 0
          ? first_name.toLowerCase() + last_name[0].toLowerCase()
          : "",
      display_name:
        first_name.length > 0 && last_name.length > 0
          ? first_name[0].toUpperCase() + last_name[0].toUpperCase()
          : "",
      password,
      user_type: "chef",
    };

    const proxyurl = "https://afternoon-brook-18118.herokuapp.com/";
    const url = "https://cheffyus-api.herokuapp.com/";

    api
      .post(proxyurl + url + "users/register", body)
      .then((response) => {
        const data = response.data.result;

        dispatch(updateUser(data));
        dispatch(
          updateToken({
            token: { token: `Bearer ${response.data.result.auth_token}` },
          })
        );

        history.push("/kitchen/confirm-login");

        enqueueSnackbar("User successfully registered!", {
          variant: "success",
        });
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
        console.log(error);
      });
  };

  return (
    <>
      <Row id="contentSignup">
        <Col className="body" xl="12" lg="12" md="12" xs="12" sm="12">
          <Form className="form" onSubmit={handleSubmit}>
            <FacebookLogin
              icon={<IoLogoFacebook size={25} />}
              appId="1293792574327500"
              fields="name,email,picture"
              textButton="&nbsp;&nbsp;Sign up with Facebook"
              callback={responseFacebook}
            />
            <h3>Sign up with email</h3>
            <Form.Group controlId="formBasicEmail">
              <Form.Label className="text">Email address</Form.Label>
              <Form.Control
                className="input"
                name="defaultEmail"
                type="text"
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label className="text">First Name</Form.Label>
              <Form.Control
                className="input"
                name="first_name"
                type="text"
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label className="text">Last Name</Form.Label>
              <Form.Control
                className="input"
                name="last_name"
                type="text"
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label className="text">Password</Form.Label>
              <Form.Control
                className="input"
                name="password"
                type="password"
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label className="text">Confirm Password</Form.Label>
              <Form.Control
                className="input"
                name="confirm_password"
                type="password"
                required
              />
            </Form.Group>

            <Form.Check
              className="text2"
              type="checkbox"
              label="I accept the Terms of Use and Privacy policy"
              required
            />
            <Form.Check
              className="text2"
              type="checkbox"
              label="I agree to receive occasional emails from the Cheffy team and understand that I can change my mind at any time"
              required
            />

            <Button className="button2" type="submit" onClick={handleSubmit}>
              Create account
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default FormSignup;
