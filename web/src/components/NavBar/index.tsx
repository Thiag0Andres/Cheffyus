import React, { useEffect, useState } from "react";

// Bootstrap
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

// Redux e Auth
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { removeUser } from "../../store/ducks/user/actions";
import { isAuthenticated } from "../../services/auth";

// Types
import { User } from "../../store/ducks/user/types";

// Images
import logo from "../../images/logo.jpg";

import "./styles.scss";

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const user: User = useSelector((state: RootStateOrAny) => state.user.user);

  // States
  const [show, setShow] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  // Atualiza o estado de autenticação na mudança de usuário
  useEffect(() => {
    const response = isAuthenticated();
    setIsLogged(response);
  }, [user]);

  // Logout do usuário
  const logout = () => {
    //enqueueSnackbar("Usuário deslogado com sucesso!", { variant: "info" });
    dispatch(removeUser());
  };

  return (
    <>
      <Navbar id="navbar" expand="xl">
        <Nav className="content1">
          <Navbar.Brand className="logo" href="/">
            <img src={logo} alt="Cheffy" />
          </Navbar.Brand>
          <Form inline>
            <FormControl
              className="search"
              type="text"
              placeholder="Search Kitchen here..."
            />
          </Form>
          <Nav.Link className="text1" href="/about">
            About
          </Nav.Link>
          <Nav.Link className="text1" href="/contact-us">
            Contact us
          </Nav.Link>
        </Nav>
        <Nav className="content2">
          {isLogged ? (
            <h1 onClick={logout}>{user.name}</h1>
          ) : (
            <>
              <Nav.Link className="text2" href="/signup">
                Sign up
              </Nav.Link>
              <Nav.Link className="text2" href="/login">
                Log in
              </Nav.Link>
              <Button
                className="button"
                type="submit"
                href="/add-kitchen"
                onClick={() => setShow(true)}
              >
                + Add Your Kitchen
              </Button>
            </>
          )}
        </Nav>
      </Navbar>
    </>
  );
};

export default NavBar;
