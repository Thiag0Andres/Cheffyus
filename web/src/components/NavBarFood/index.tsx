import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

// Redux e Auth
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../store";
import { removeUserDelivery } from "../../store/ducks/userDelivery/actions";
import { removeTokenDelivery } from "../../store/ducks/tokenDelivery/actions";
import { removeCart } from "../../store/ducks/cart/actions";
import { isAuthenticatedDelivery } from "../../services/auth";

// Types
import { UserDelivery } from "../../store/ducks/userDelivery/types";
import { TokenDelivery } from "../../store/ducks/tokenDelivery/types";
import { Cart } from "../../store/ducks/cart/types";

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

//Message
import { useSnackbar } from "notistack";

//Icons
import { FaRegUser, FaShoppingCart } from "react-icons/fa";
import { GiSettingsKnobs } from "react-icons/gi";
import { BiMenu } from "react-icons/bi";
import { GoSearch } from "react-icons/go";

// Images
import logo from "../../images/logo.jpg";

import api from "../../services/api";

import "./styles.scss";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  setFilter: any;
}

const NavBarFood: React.FC<Props> = (props: Props) => {
  const { window, setFilter } = props;
  const dispatch = useDispatch();
  const userDelivery: UserDelivery = useSelector(
    (state: ApplicationState) => state.userDelivery.userDelivery
  );
  const token: TokenDelivery = useSelector(
    (state: RootStateOrAny) => state.tokenDelivery.tokenDelivery.tokenDelivery
  );
  const cart: Cart[] = useSelector(
    (state: RootStateOrAny) => state.cart.cart.length
  );
  const history = useHistory();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  // States
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [formData, setFormData] = useState({
    search: "",
  });

  useEffect(() => {
    const filteredKitchens: any = restaurants.filter((restaurant: any) => {
      return (
        (restaurant.name.toLowerCase().indexOf(formData.search.toLowerCase()) &&
          restaurant.chef.name
            .toLowerCase()
            .indexOf(formData.search.toLowerCase())) !== -1
      );
    });
    setFilter(filteredKitchens);
  }, [formData.search]);

  // Atualiza o estado de autenticação na mudança de usuário
  useEffect(() => {
    const response = isAuthenticatedDelivery();
    setIsLogged(response);
    //console.log(isLogged);
  }, [userDelivery]);

  // Logout do usuário
  const logout = () => {
    const url = `https://mycheffy.herokuapp.com/basket/clear`;

    const body = { deliveryType: "driver" };

    api
      .put(url, body, {
        headers: {
          "x-access-token": token,
          "content-type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

    dispatch(removeUserDelivery());
    dispatch(removeTokenDelivery());
    history.push("/food/grid-foods");
    enqueueSnackbar("User successfully logged out!", { variant: "info" });
  };

  const handlePage = () => {
    if (isLogged) {
      history.push("/food/cart");
    } else {
      history.push("/food/login");
      enqueueSnackbar("You must log in to Cheffy to see the cart.", {
        variant: "error",
      });
    }
  };

  /*   const handlePageProfile = () => {
    history.push({
      pathname: `/food/profile-user/${userDelivery.name}`,
      state: {
        detail: userDelivery,
      },
    });
  }; */

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleInputChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    //console.log(event.target.value);

    setFormData({ ...formData, [name]: value });
  };

  const drawer = (
    <div id="drawer">
      {isLogged ? (
        <div className="drawer-login1">
          <div className="avatar" /* onClick={handlePageProfile} */>
            {userDelivery.imagePath === null ? (
              userDelivery.name[0].toUpperCase()
            ) : (
              <img src={userDelivery.imagePath} />
            )}
          </div>

          <Button className="button" type="submit" onClick={handlePage}>
            <FaShoppingCart />
            &nbsp;&nbsp;&nbsp;Cart&nbsp;&nbsp;{cart}
          </Button>
        </div>
      ) : (
        <div className="drawer-login2">
          <Link className="text3" to="/food/signup">
            Sign up
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link className="text3" to="/food/login">
            Log in
          </Link>
        </div>
      )}

      <div className="drawer-menu">
        <p>Menu</p>
        <Link className="text3" to="/food/grid-foods">
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
            <Link
              className="text3"
              to="/food/settings"
              /*               to={{
                pathname: `/food/profile-user/${userDelivery.name}`,
                state: {
                  detail: userDelivery,
                },
              }} */
            >
              Profile
            </Link>
            <Link className="text3" to="/food/settings">
              Settings
            </Link>
          </div>
          <div className="logout-adm">
            <Button className="button1" onClick={logout}>
              Log out
            </Button>
          </div>
        </Hidden>
      )}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Navbar id="navbarfood" expand="xl">
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
                placeholder="Search for a food here..."
                name="search"
                onChange={handleInputChange}
              />
            </Form>
          </Hidden>
          <Hidden smDown implementation="css">
            <div className="texts">
              <Nav.Link className="text1" href="/food/grid-foods">
                Home
              </Nav.Link>
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
                    {userDelivery.imagePath === null ? (
                      userDelivery.name[0].toUpperCase()
                    ) : (
                      <img src={userDelivery.imagePath} />
                    )}
                  </div>
                  {show && (
                    <Container
                      className="box-profile"
                      onMouseOver={() => setShow(true)}
                    >
                      <Row className="row1">
                        <Col className="col" xl="6" lg="6" md="6" xs="6" sm="6">
                          <Link
                            className="item"
                            to="/food/settings"
                            /*                        to={{
                              pathname: `/food/profile-user/${userDelivery.name}`,
                              state: {
                                detail: userDelivery,
                              },
                            }} */
                          >
                            <FaRegUser size={32} />
                            Profile
                          </Link>
                        </Col>
                        <Col className="col" xl="6" lg="6" md="6" xs="6" sm="6">
                          <Link className="item" to="/food/settings">
                            <GiSettingsKnobs size={32} />
                            Settings
                          </Link>
                        </Col>
                      </Row>
                      <Row className="row2">
                        <Button className="button3" onClick={logout}>
                          Log out
                        </Button>
                      </Row>
                    </Container>
                  )}
                </div>

                <Button className="button2" onClick={handlePage}>
                  <FaShoppingCart />
                  &nbsp;&nbsp;&nbsp;Cart&nbsp;&nbsp;{cart}
                </Button>
              </div>
            ) : (
              <div className="box2">
                <Nav.Link className="text2" href="/food/signup">
                  Sign up
                </Nav.Link>
                <Nav.Link className="text2" href="/food/login">
                  Log in
                </Nav.Link>
                <Button className="button2" onClick={handlePage}>
                  <FaShoppingCart />
                  &nbsp;&nbsp;&nbsp;Cart
                </Button>
              </div>
            )}
          </Hidden>
          <Hidden mdUp implementation="css">
            {isLogged ? (
              <div className="box3">
                {show1 && (
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={() => {
                      setShow1(false);
                      setShow2(true);
                    }}
                  >
                    <GoSearch />
                  </IconButton>
                )}
                <Hidden xsDown implementation="css">
                  <Button className="button2" onClick={handlePage}>
                    <FaShoppingCart />
                    &nbsp;&nbsp;&nbsp;Cart&nbsp;&nbsp;{cart}
                  </Button>
                </Hidden>
              </div>
            ) : (
              <div className="box3">
                {show1 && (
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={() => {
                      setShow1(false);
                      setShow2(true);
                    }}
                  >
                    <GoSearch />
                  </IconButton>
                )}
                <Hidden xsDown implementation="css">
                  <Button className="button2" onClick={handlePage}>
                    <FaShoppingCart />
                    &nbsp;&nbsp;&nbsp;Cart
                  </Button>
                </Hidden>
              </div>
            )}
          </Hidden>
        </Nav>
      </Navbar>
      {show2 && (
        <Hidden mdUp implementation="css">
          <div id="search-mobile">
            <FormControl
              className="search"
              type="text"
              placeholder="Search for a food here..."
              name="search"
              value={formData.search}
              onChange={handleInputChange}
            />
            <IconButton
              className="icon"
              onClick={() => {
                setShow1(true);
                setShow2(false);
              }}
            >
              <GoSearch />
            </IconButton>
          </div>
        </Hidden>
      )}
    </>
  );
};

export default NavBarFood;
