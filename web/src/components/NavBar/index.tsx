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

// Material UI
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";

import { useTheme } from "@material-ui/core/styles";

// Redux e Auth
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../store";
import { removeUser } from "../../store/ducks/user/actions";
import { removeToken } from "../../store/ducks/token/actions";
import { isAuthenticated } from "../../services/auth";

// Types
import { User } from "../../store/ducks/user/types";
import { Token } from "../../store/ducks/token/types";

//Message
import { useSnackbar } from "notistack";

//Icons
import { FaRegUser } from "react-icons/fa";
import { FiInbox } from "react-icons/fi";
import { ImAddressBook } from "react-icons/im";
import { GiSettingsKnobs } from "react-icons/gi";
import { BiMenu } from "react-icons/bi";
import { GoSearch } from "react-icons/go";

// Images
import logo from "../../images/logo.jpg";
import userNotFound from "../../images/user.jpg";

import "./styles.scss";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const NavBar: React.FC<Props> = (props: Props) => {
  const { window } = props;
  const dispatch = useDispatch();
  const user: User = useSelector((state: ApplicationState) => state.user.user);
  const token: Token = useSelector(
    (state: ApplicationState) => state.token.token
  );
  const history = useHistory();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  // States
  const [show, setShow] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Atualiza o estado de autenticação na mudança de usuário
  useEffect(() => {
    const response = isAuthenticated();
    setIsLogged(response);
  }, [user]);

  // Logout do usuário
  const logout = () => {
    dispatch(removeUser());
    dispatch(removeToken());
    history.push("/");
    enqueueSnackbar("User successfully logged out!", { variant: "info" });
  };

  const handlePage = () => {
    if (isLogged) {
      history.push("/add-kitchen");
    } else {
      history.push("/login");
    }
  };

  const handlePageProfile = () => {
    history.push({
      pathname: `/profile-user/${user.username}`,
      state: {
        detail: user,
      },
    });
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div id="drawer">
      {isLogged ? (
        <div className="drawer-login1">
          <div className="avatar" onClick={handlePageProfile}>
            {user.image_url === null ? (
              user.display_name
            ) : (
              <img src={user.image_url} />
            )}
          </div>
          <Button className="button" type="submit" href="/add-kitchen">
            + Add Your Kitchen
          </Button>
        </div>
      ) : (
        <div className="drawer-login2">
          <Link className="text3" to="/signup">
            Sign up
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link className="text3" to="/login">
            Log in
          </Link>
        </div>
      )}

      <div className="drawer-menu">
        <p>Menu</p>
        <Link className="text3" to="/">
          Home
        </Link>
        <Link className="text3" to="/about">
          About
        </Link>
        <Link className="text3" to="/contact-us">
          Contact us
        </Link>
      </div>

      {isLogged && (
        <Hidden mdUp implementation="css">
          <div className="drawer-user">
            <p>User</p>

            <Link className="text3" to="/inbox">
              Inbox
            </Link>
            <Link className="text3" to="/settings">
              My listings
            </Link>
            <Link
              className="text3"
              to={{
                pathname: `/profile-user/${user.username}`,
                state: {
                  detail: user,
                },
              }}
            >
              Profile
            </Link>
            <Link className="text3" to="/settings">
              Settings
            </Link>

            <div className="logout-adm">
              <Button className="button1" onClick={logout}>
                Log out
              </Button>
            </div>
          </div>
        </Hidden>
      )}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Navbar id="navbar" expand="xl">
      <Drawer
        container={container}
        variant="temporary"
        anchor={theme.direction === "rtl" ? "right" : "left"}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {drawer}
      </Drawer>
      <Nav className="content1" onMouseOut={() => setShow(false)}>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <BiMenu />
          </IconButton>
        </Hidden>
        <Navbar.Brand className="logo" href="/">
          <img src={logo} alt="Cheffy" />
        </Navbar.Brand>
        <Hidden smDown implementation="css">
          <Form inline>
            <FormControl
              className="search"
              type="text"
              placeholder="Search Kitchen here..."
            />
          </Form>
        </Hidden>
        <Hidden smDown implementation="css">
          <div className="texts">
            <Nav.Link className="text1" href="/about">
              About
            </Nav.Link>
            <Nav.Link className="text1" href="/contact-us">
              Contact us
            </Nav.Link>
          </div>
        </Hidden>
      </Nav>
      <Nav className="content2">
        <Hidden smDown implementation="css">
          {isLogged ? (
            <div className="box1">
              <div className="content-profile">
                <div
                  className="avatar"
                  onClick={() => setShow(true)}
                  onMouseOver={() => setShow(true)}
                >
                  {user.image_url === null ? (
                    user.display_name
                  ) : (
                    <img src={user.image_url} />
                  )}
                </div>
                {show && (
                  <Container
                    className="box-profile"
                    onMouseOver={() => setShow(true)}
                  >
                    <Row className="row1">
                      <Col className="col" xl="3" lg="3" md="3" xs="3" sm="3">
                        <Link className="item" to="/inbox">
                          <FiInbox size={32} />
                          Inbox
                        </Link>
                      </Col>
                      <Col className="col" xl="3" lg="3" md="3" xs="3" sm="3">
                        <Link className="item" to="/settings">
                          <ImAddressBook size={32} />
                          My listings
                        </Link>
                      </Col>
                      <Col className="col" xl="3" lg="3" md="3" xs="3" sm="3">
                        <Link
                          className="item"
                          to={{
                            pathname: `/profile-user/${user.username}`,
                            state: {
                              detail: user,
                            },
                          }}
                        >
                          <FaRegUser size={32} />
                          Profile
                        </Link>
                      </Col>
                      <Col className="col" xl="3" lg="3" md="3" xs="3" sm="3">
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
            </div>
          ) : (
            <div className="box2">
              <Nav.Link className="text2" href="/signup">
                Sign up
              </Nav.Link>
              <Nav.Link className="text2" href="/login">
                Log in
              </Nav.Link>
              <Button className="button2" type="submit" onClick={handlePage}>
                + Add Your Kitchen
              </Button>
            </div>
          )}
        </Hidden>
        <Hidden mdUp implementation="css">
          <div className="box3">
            <IconButton color="inherit" aria-label="open drawer" edge="start">
              <GoSearch />
            </IconButton>
            <Hidden xsDown implementation="css">
              <Button className="button2" type="submit" onClick={handlePage}>
                + Add Your Kitchen
              </Button>
            </Hidden>
          </div>
        </Hidden>
      </Nav>
    </Navbar>
  );
};

export default NavBar;
