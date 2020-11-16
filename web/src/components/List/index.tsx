import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import Pagination from "react-bootstrap/Pagination";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Material UI
import Hidden from "@material-ui/core/Hidden";

// Icons
import { BsFillGridFill } from "react-icons/bs";
import { GoListUnordered } from "react-icons/go";
import { FaMapMarkedAlt } from "react-icons/fa";

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

const List: React.FC = () => {
  // States
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [show, setShow] = useState(false);

  const history = useHistory();

  // Chamada a api
  useEffect(() => {
    api.get("restaurants").then((response) => {
      setRestaurants(response.data);
      //console.log(response);
    });
  }, []);

  return (
    <Container fluid id="page-home-list">
      <Row className="content-header">
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
            <Pagination.Item id="pagination1" href="/" disabled={false}>
              <BsFillGridFill />
              <Hidden smDown implementation="css">
                Grid
              </Hidden>
            </Pagination.Item>
            <Pagination.Item id="pagination2" href="/list" active={true}>
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
      <Row className="content-list">
        <Col className="slider" xl="3" lg="3" md="3" xs="3" sm="3">
          <Hidden smDown implementation="css">
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
          </Hidden>
        </Col>
        <Col className="list" xl="auto" lg="auto" md="auto" xs="auto" sm="auto">
          <ul>
            {restaurants.map((restaurant) => (
              <li key={restaurant.id}>
                <Link
                  to={{
                    pathname: `/restaurant/${restaurant.title}`,
                    state: {
                      detail: restaurant,
                    },
                  }}
                >
                  <img
                    src={restaurant.image_url_restaurant}
                    alt={restaurant.name}
                  />
                </Link>
                <div className="info">
                  <div className="box1">
                    <Link
                      to={{
                        pathname: `/restaurant/${restaurant.title}`,
                        state: {
                          detail: restaurant,
                        },
                      }}
                    >
                      <strong>{restaurant.title}</strong>
                    </Link>
                    <Link
                      className="chef-info"
                      to={{
                        pathname: `/profile-chef/${restaurant.name}`,
                        state: {
                          detail: restaurant,
                        },
                      }}
                    >
                      <img
                        src={restaurant.image_url_chef}
                        alt={restaurant.name}
                      />
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
                  </div>
                  <div className="price">
                    <span>${restaurant.price}</span>
                    <p>per hour</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};
export default List;
