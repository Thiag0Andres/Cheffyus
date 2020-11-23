import React, { useState, ChangeEvent, FormEvent } from "react";
import { useHistory } from "react-router-dom";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Redux e Auth
import { checkAuth } from "../../services/validation";
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/ducks/user/actions";
import { updateToken } from "../../store/ducks/token/actions";
import { environment } from "../../environment/environment";

//Message
import { useSnackbar } from "notistack";

// Icons
import { IoLogoFacebook } from "react-icons/io";

import api from "../../services/api";

import "./styles.scss";

const {
  REACT_APP_LOCAL_STORAGE_USER,
  REACT_APP_LOCAL_STORAGE_TOKEN,
} = environment;

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

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const { defaultEmail, first_name, last_name, password } = formData;

    const body = {
      emails: [defaultEmail],
      defaultEmail,
      first_name,
      last_name,
      username: first_name.toLowerCase() + last_name[0].toLowerCase(),
      display_name: first_name[0].toUpperCase() + last_name[0].toUpperCase(),
      password,
      user_type: "chef",
    };

    const proxyurl = "https://afternoon-brook-18118.herokuapp.com/";
    const url = "https://cheffyus-api.herokuapp.com/";

    api
      .post(proxyurl + url + "users/register", body)
      .then((response) => {
        const data = response.data.result;

        dispatch(updateUser(data.user));
        dispatch(updateToken(data.token));

        history.push("/");

        enqueueSnackbar("User successfully registered!", {
          variant: "success",
        });

        //console.log(data);
      })
      .catch((error) => {
        enqueueSnackbar("Failed to register.", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <>
      <Row id="contentSignup">
        <Col className="body" xl="12" lg="12" md="12" xs="12" sm="12">
          <Form className="form" onSubmit={handleSubmit}>
            <Button className="button1" size="lg" block>
              <IoLogoFacebook size={25} />
              Sign up with Facebook
            </Button>
            <h3>Sign up with email</h3>
            <Form.Group controlId="formBasicEmail">
              <Form.Label className="text">Email address</Form.Label>
              <Form.Control
                className="input"
                name="defaultEmail"
                type="text"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label className="text">First Name</Form.Label>
              <Form.Control
                className="input"
                name="first_name"
                type="text"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label className="text">Last Name</Form.Label>
              <Form.Control
                className="input"
                name="last_name"
                type="text"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label className="text">Password</Form.Label>
              <Form.Control
                className="input"
                name="password"
                type="password"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label className="text">Confirm Password</Form.Label>
              <Form.Control
                className="input"
                name="confirm_password"
                type="password"
              />
            </Form.Group>

            <Form.Check
              className="text2"
              type="checkbox"
              label="I accept the Terms of Use and Privacy policy"
            />
            <Form.Check
              className="text2"
              type="checkbox"
              label="I agree to receive occasional emails from the Cheffy team and understand that I can change my mind at any time"
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
