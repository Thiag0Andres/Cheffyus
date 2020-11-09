import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

// Bootstrap
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Redux e Auth
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { removeUser } from "../../store/ducks/user/actions";
import { isAuthenticated } from "../../services/auth";

// Types
import { User } from "../../store/ducks/user/types";

//Icons
import { FaRegUser } from "react-icons/fa";
import { FiInbox } from "react-icons/fi";
import { ImAddressBook } from "react-icons/im";
import { GiSettingsKnobs } from "react-icons/gi";

// Images
import logo from "../../images/logo.jpg";

import "./styles.scss";

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const user: User = useSelector((state: RootStateOrAny) => state.user.user);
  const history = useHistory();

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
    history.push("/");
  };

  const handlePage = () => {
    if (isLogged) {
      history.push("/add-kitchen");
    } else {
      history.push("/login");
    }
  };

  return (
    <>
      <Navbar id="navbar" expand="xl">
        <Nav className="content1" onMouseOut={() => setShow(false)}>
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
            <>
              <div className="content-profile">
                <div
                  className="avatar"
                  /* onMouseOver={() => setShow(true)} */
                  onClick={() => setShow(true)}
                  onMouseOver={() => setShow(true)}
                >
                  {user.nickName}
                </div>
                {show && (
                  <Container
                    className="box-profile"
                    onMouseOver={() => setShow(true)}
                  >
                    <Row className="row1">
                      <Col className="col" xl="3">
                        <Link className="item" to="/inbox">
                          <FiInbox size={32} />
                          Inbox
                        </Link>
                      </Col>
                      <Col className="col" xl="3">
                        <Link className="item" to="/settings">
                          <ImAddressBook size={32} />
                          My listings
                        </Link>
                      </Col>
                      <Col className="col" xl="3">
                        <Link
                          className="item"
                          to={{
                            pathname: `/profile-user/${user.name}`,
                            state: {
                              detail: user,
                            },
                          }}
                        >
                          <FaRegUser size={32} />
                          Profile
                        </Link>
                      </Col>
                      <Col className="col" xl="3">
                        <Link className="item" to="/settings">
                          <GiSettingsKnobs size={32} />
                          Settings
                        </Link>
                      </Col>
                    </Row>
                    <Row className="row2">
                      <Button className="button1" onClick={logout}>
                        Log out
                      </Button>
                    </Row>
                  </Container>
                )}
              </div>

              <Button className="button2" type="submit" href="/add-kitchen">
                + Add Your Kitchen
              </Button>
            </>
          ) : (
            <>
              <Nav.Link className="text2" href="/signup">
                Sign up
              </Nav.Link>
              <Nav.Link className="text2" href="/login">
                Log in
              </Nav.Link>
              <Button className="button2" type="submit" onClick={handlePage}>
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
