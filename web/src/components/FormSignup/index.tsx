import React, { useState } from "react";
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

// Icons
import { IoLogoFacebook } from "react-icons/io";

import "./styles.scss";

const FormSignup: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // State
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const signIn = () => {
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
  };

  return (
    <>
      <Row id="contentSignup">
        <Col className="body">
          <Form className="form">
            <Button className="button1" size="lg" block>
              <IoLogoFacebook size={25} />
              Sign up with Facebook
            </Button>
            <h3>Sign up with email</h3>
            <Form.Group controlId="formBasicEmail">
              <Form.Label className="text">Email address</Form.Label>
              <Form.Control
                className="input"
                type="email"
                value={email}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(event.target.value)
                }
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label className="text">First Name</Form.Label>
              <Form.Control className="input" type="text" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label className="text">Last Name</Form.Label>
              <Form.Control className="input" type="text" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label className="text">Password</Form.Label>
              <Form.Control
                className="input"
                type="password"
                value={password}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(event.target.value)
                }
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label className="text">Confirm Password</Form.Label>
              <Form.Control className="input" type="text" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                className="text2"
                type="checkbox"
                label="I accept the Terms of Use and Privacy policy"
                onClick={() => setShowModal(true)}
              />
              <Form.Check
                className="text2"
                type="checkbox"
                label="I agree to receive occasional emails from the Cheffy team and understand that I can change my mind at any time"
              />
            </Form.Group>
            <Button className="button2" type="submit" onClick={signIn}>
              Create account
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default FormSignup;
