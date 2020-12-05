import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Button";

// Redux e Auth
import { checkAuth } from "../../services/validation";
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/ducks/user/actions";
import { updateToken } from "../../store/ducks/token/actions";

//Message
import { useSnackbar } from "notistack";

// Icons
import { IoLogoFacebook } from "react-icons/io";
import { FaInfoCircle } from "react-icons/fa";

import api from "../../services/api";

import "./styles.scss";

const FormLogin: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  // States
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(false);

  const [formData, setFormData] = useState({
    defaultEmail: "",
    password: "",
  });

  //const scrollToNextPage = () => window.scrollTo(0, 1000);

  const handleInputChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    //console.log(event.target);

    setFormData({ ...formData, [name]: value });
  };

  const signIn = (event: FormEvent) => {
    event.preventDefault();

    const { defaultEmail, password } = formData;

    const proxyurl = "https://afternoon-brook-18118.herokuapp.com/";
    const url = "https://cheffyus-api.herokuapp.com/";

    api
      .post(proxyurl + url + "users/authenticate", {
        email: defaultEmail.trim(),
        password: password,
      })
      .then((response) => {
        const data = response.data;

        dispatch(updateUser(data.user));
        dispatch(updateToken(data.token));

        history.push("/");
        enqueueSnackbar("User successfully logged in!", { variant: "success" });
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      });

    /* 
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
      history.push("/");
      //enqueueSnackbar("Usuário logado com sucesso!", { variant: "success" });
    } else {
      setEmail("");
      setPassword("");
      //enqueueSnackbar("Falha ao autenticar.", { variant: "error" });
    }
     */
  };

  return (
    <>
      <Row id="content-login">
        {alert && (
          <Alert className="alert" variant="secondary">
            <FaInfoCircle size={18} />
            <div>
              You must log in to Cheffy to create a new listing. If you don't
              have an account you can
              <Link to="/signup"> create one here</Link>.
            </div>
          </Alert>
        )}
        <Col className="body" xl="12" lg="12" md="12" xs="12" sm="12">
          <Form className="form1" onSubmit={signIn}>
            <Button className="button1" variant="primary" size="lg" block>
              <IoLogoFacebook size={25} />
              Log in with Facebook
            </Button>
            <p>...or with your email:</p>
            <Form.Group controlId="formBasicEmail">
              <Form.Label className="text">Email:</Form.Label>
              <Form.Control
                className="input"
                type="text"
                name="defaultEmail"
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label className="text">Password:</Form.Label>
              <Form.Control
                className="input"
                type="password"
                name="password"
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button className="button2" type="submit" onClick={signIn}>
              Log in
            </Button>
            <div>
              <Link to="/signup">Create a new account</Link>
            </div>
            <Button className="button3" onClick={() => setShow(true)}>
              Forgot password
            </Button>
            {show && (
              <Form className="form2">
                <p>Enter your email address to reset your password.</p>
                <Form.Group controlId="formBasicForgotEmail">
                  <Form.Label className="text">Email</Form.Label>
                  <Form.Control className="input" type="email" />
                </Form.Group>
                <Button className="button4" type="submit">
                  Request new password
                </Button>
              </Form>
            )}
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default FormLogin;
