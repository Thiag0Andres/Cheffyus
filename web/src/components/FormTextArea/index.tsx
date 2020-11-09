import React, { useEffect, useState } from "react";

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

import "./styles.scss";

const FormTextArea: React.FC = () => {
  const user: User = useSelector((state: RootStateOrAny) => state.user.user);

  //States
  const [isLogged, setIsLogged] = useState(false);

  // Atualiza o estado de autenticação na mudança de usuário
  useEffect(() => {
    const response = isAuthenticated();
    setIsLogged(response);
  }, [user]);

  return (
    <>
      <Row id="content">
        <Col className="body">
          <Form className="form">
            {!isLogged && (
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label className="text">
                  Your email address (to contact you)
                </Form.Label>
                <Form.Control className="input" type="email" />
              </Form.Group>
            )}
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label className="text">
                Your message to the Cheffy team
              </Form.Label>
              <Form.Control className="textarea" as="textarea" rows={3} />
            </Form.Group>
            <Button className="button" type="submit">
              Log message
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default FormTextArea;
