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

import api from "../../services/api";

import "./styles.scss";

interface Restaurant {
  id: number;
  title: string;
  image_url_restaurant: string;
  price: number;
  location: [number, number];
  name: string;
  image_url_chef: string;
}

const Grid: React.FC = () => {
  const user: User = useSelector((state: RootStateOrAny) => state.user.user);

  // States
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [alert, setAlert] = useState(false);
  const [show, setShow] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  // Chamada a api
  useEffect(() => {
    api.get("restaurants").then((response) => {
      setRestaurants(response.data);
      //console.log(response);
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
                  pathname: `/profile-user/${user.name}`,
                  state: {
                    detail: user,
                  },
                }}
              >
                {user.name}
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
            <Button className="button2" onClick={() => setShow(true)}>
              Filter
            </Button>
          </Hidden>
          <Pagination>
            <Pagination.Item id="pagination1" href="/" active={true}>
              <BsFillGridFill />
              <Hidden smDown implementation="css">
                Grid
              </Hidden>
            </Pagination.Item>
            <Pagination.Item id="pagination2" href="/list" disabled={false}>
              <GoListUnordered />
              <Hidden smDown implementation="css">
                List
              </Hidden>
            </Pagination.Item>
            <Pagination.Item id="pagination3" href="/map" disabled={false}>
              <FaMapMarkedAlt />
              <Hidden smDown implementation="css">
                Map
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
        <Col className="grid" xl="9" lg="9" md="9" xs="9" sm="9">
          <ul>
            {restaurants.map((restaurant) => (
              <li key={restaurant.id}>
                <div className="opacity"></div>
                <img
                  src={restaurant.image_url_restaurant}
                  alt={restaurant.title}
                />
                <Link
                  className="box1"
                  to={{
                    pathname: `/restaurant/${restaurant.title}`,
                    state: {
                      detail: restaurant,
                    },
                  }}
                >
                  <div className="price">
                    <span className="value">${restaurant.price}</span>
                    <span className="hour">/ hour</span>
                  </div>
                  <p>{restaurant.title}</p>
                </Link>
                <Link
                  className="box2"
                  to={{
                    pathname: `/profile-chef/${restaurant.name}`,
                    state: {
                      detail: restaurant,
                    },
                  }}
                >
                  <img src={restaurant.image_url_chef} alt={restaurant.name} />
                  <Link
                    to={{
                      pathname: `/profile-chef/${restaurant.name}`,
                      state: {
                        detail: restaurant,
                      },
                    }}
                  >
                    {restaurant.name}
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
