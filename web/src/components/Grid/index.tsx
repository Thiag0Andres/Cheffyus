import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import Pagination from "react-bootstrap/Pagination";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

// Material UI
import Hidden from "@material-ui/core/Hidden";

// Redux e Auth
import { useSelector, RootStateOrAny } from "react-redux";
import { isAuthenticated } from "../../services/auth";

// Types
import { User } from "../../store/ducks/user/types";

// Icons
import { BsFillGridFill } from "react-icons/bs";
import { GoListUnordered } from "react-icons/go";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

// Images
import userNotfound from "../../images/user.png";
import kitchenNotFound from "../../images/kitchen.jpg";

import api from "../../services/api";

import "./styles.scss";

const Grid: React.FC = () => {
  const user: User = useSelector((state: RootStateOrAny) => state.user.user);

  // States
  const [restaurants, setRestaurants] = useState([]);
  const [alert, setAlert] = useState(false);
  const [show, setShow] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  // Chamada a api
  useEffect(() => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://cheffyus-api.herokuapp.com/";

    api
      .get(proxyurl + url + "kitchens")
      .then((response) => {
        setRestaurants(response.data);
        //console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Atualiza o estado de autenticação na mudança de usuário
  useEffect(() => {
    const response = isAuthenticated();
    setIsLogged(response);
  }, []);

  //Welcome, "nome"! --> Quando fez o login e confirmou o cadastro
  //You are already a member of Cheffy. Welcome back! -> Depois de confirmar o cadastro e da um F5
  //You have now been logged out of Cheffy. See you soon! --> Após fazer logout

  return (
    <Container fluid id="page-home-grid">
      <Row className="content-header">
        {alert && (
          <Alert
            className="alert"
            variant="secondary"
            onClick={() => setIsLogged(false)}
          >
            <FaCheck size={18} />
            <div>
              Welcome,{" "}
              <Link
                to={{
                  pathname: `/profile-user/${user.username}`,
                  state: {
                    detail: user,
                  },
                }}
              >
                {user.first_name + user.last_name[0].toUpperCase()}
              </Link>
              !
            </div>
          </Alert>
        )}
        {/*         {!isLogged && (
          <Alert className="alert" variant="secondary">
            <FaCheck size={18} />
            You have now been logged out of Cheffy. See you soon!
          </Alert>
        )} */}
        <Col className="header" xl="12" lg="12" md="12" xs="12" sm="12">
          <Hidden smDown implementation="css">
            <Dropdown className="dropdown">
              <Dropdown.Toggle id="dropdown-basic">
                All listing types
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="">All listing types</Dropdown.Item>
                <Dropdown.Item href="">
                  Offering without online payment
                </Dropdown.Item>
                <Dropdown.Item href="">
                  Offering with online payment
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Hidden>
          <Hidden mdUp implementation="css">
            <Button className="button2" onClick={() => setShow(false)}>
              Filter
            </Button>
          </Hidden>
          <Pagination>
            <Pagination.Item id="pagination1" href="/" active={true}>
              <BsFillGridFill />
              &nbsp;&nbsp;
              <Hidden smDown implementation="css">
                Grid
              </Hidden>
            </Pagination.Item>
            <Pagination.Item id="pagination2" href="/list" disabled={false}>
              <GoListUnordered />
              &nbsp;&nbsp;
              <Hidden smDown implementation="css">
                List
              </Hidden>
            </Pagination.Item>
            <Pagination.Item id="pagination3" href="/map" disabled={false}>
              <FaMapMarkedAlt />
              <Hidden smDown implementation="css">
                &nbsp;&nbsp; Map
              </Hidden>
            </Pagination.Item>
          </Pagination>
        </Col>

        {show && (
          <Row className="content-filter">
            <Col
              className="filter"
              xl="auto"
              lg="auto"
              md="auto"
              xs="auto"
              sm="auto"
            >
              <Dropdown className="dropdown">
                <Dropdown.Toggle id="dropdown-basic">
                  All listing types
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="">All listing types</Dropdown.Item>
                  <Dropdown.Item href="">
                    Offering without online payment
                  </Dropdown.Item>
                  <Dropdown.Item href="">
                    Offering with online payment
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Form className="range">
                <Form.Group controlId="formBasicRangeCustom">
                  <Form.Label className="text">Price</Form.Label>
                  <Form.Control
                    className="range-slider"
                    type="range"
                    custom
                    size="lg"
                  />
                  <Button className="button" type="submit">
                    Update view
                  </Button>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        )}
      </Row>
      <Row className="content-grid">
        <Col className="slider" xl="3" lg="3" md="3" xs="3" sm="3">
          <Hidden smDown implementation="css">
            <Form className="range">
              <Form.Group
                className="range-form"
                controlId="formBasicRangeCustom"
              >
                <Form.Label className="text">Price</Form.Label>
                <Form.Control
                  className="range-slider"
                  type="range"
                  custom
                  size="lg"
                />
                <Button className="button" type="submit">
                  Update view
                </Button>
              </Form.Group>
            </Form>
          </Hidden>
        </Col>
        <Col className="grid" xl="auto" lg="auto" md="auto" xs="auto" sm="auto">
          <ul>
            {restaurants.map((restaurant: any) => (
              <li key={restaurant.user.id}>
                <div className="opacity"></div>

                <img
                  src={
                    restaurant.kitchen.image_urls[0] === null
                      ? kitchenNotFound
                      : restaurant.kitchen.image_urls[0]
                  }
                  alt={restaurant.kitchen.name}
                />
                <Link
                  className="box1"
                  to={{
                    pathname: `/restaurant/${restaurant.kitchen.name}`,
                    state: {
                      detail: restaurant,
                    },
                  }}
                >
                  <div className="price">
                    <span className="value">
                      ${restaurant.kitchen.price_per_time}
                    </span>
                    &nbsp;
                    <span className="hour">
                      / {restaurant.kitchen.time_type}
                    </span>
                  </div>
                  <p>{restaurant.kitchen.name}</p>
                </Link>
                <Link
                  className="box2"
                  to={{
                    pathname: `/profile-chef/${restaurant.user.first_name}`,
                    state: {
                      detail: restaurant,
                    },
                  }}
                >
                  <img
                    src={
                      restaurant.user.image_url === null
                        ? userNotfound
                        : restaurant.user.image_url
                    }
                    alt={restaurant.user.first_name}
                  />
                  &nbsp;&nbsp;&nbsp;
                  <Link
                    to={{
                      pathname: `/profile-chef/${restaurant.user.first_name}`,
                      state: {
                        detail: restaurant,
                      },
                    }}
                  >
                    {restaurant.user.first_name}
                  </Link>
                </Link>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};
export default Grid;
