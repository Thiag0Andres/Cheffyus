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

// Images
import userNotfound from "../../images/user.png";

import api from "../../services/api";

import "./styles.scss";

const List: React.FC = () => {
  // States
  const [restaurants, setRestaurants] = useState([]);
  const [show, setShow] = useState(false);

  const history = useHistory();

  // Chamada a api
  useEffect(() => {
    const proxyurl = "https://afternoon-brook-18118.herokuapp.com/";
    const url = "https://cheffyus-api.herokuapp.com/";

    api
      .get(proxyurl + url + "kitchens")
      .then((response) => {
        setRestaurants(response.data);
        //console.log(response.data);
      })
      .catch((error) => {
        //console.log(error);
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
            <Button className="button2" onClick={() => setShow(false)}>
              Filter
            </Button>
          </Hidden>
          <Pagination>
            <Pagination.Item id="pagination1" href="/" disabled={false}>
              <BsFillGridFill />
              &nbsp;&nbsp;
              <Hidden smDown implementation="css">
                Grid
              </Hidden>
            </Pagination.Item>
            <Pagination.Item id="pagination2" href="/list" active={true}>
              <GoListUnordered />
              &nbsp;&nbsp;
              <Hidden smDown implementation="css">
                List
              </Hidden>
            </Pagination.Item>
            <Pagination.Item id="pagination3" href="/map" disabled={false}>
              <FaMapMarkedAlt />
              &nbsp;&nbsp;
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
        <Col className="list" xl="9" lg="9" md="9" xs="9" sm="9">
          <ul>
            {restaurants.length > 0 &&
              restaurants.map((restaurant: any) => (
                <li key={restaurant.user.id}>
                  <Link
                    className="restaurant_image"
                    to={{
                      pathname: `/restaurant/${restaurant.kitchen.name}`,
                      state: {
                        detail: restaurant,
                      },
                    }}
                  >
                    <img
                      src={restaurant.kitchen.image_urls[0]}
                      alt={restaurant.kitchen.name}
                    />
                  </Link>
                  <div className="info">
                    <div className="box1">
                      <Link
                        to={{
                          pathname: `/restaurant/${restaurant.kitchen.name}`,
                          state: {
                            detail: restaurant,
                          },
                        }}
                      >
                        <strong>{restaurant.kitchen.name}</strong>
                      </Link>
                      <Link
                        className="chef-info"
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
                        &nbsp;&nbsp;
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
                    </div>
                    <div className="price">
                      <span>${restaurant.kitchen.price_per_time}</span>
                      <Hidden xsDown implementation="css">
                        <p>per {restaurant.kitchen.time_type}</p>
                      </Hidden>
                      <Hidden smUp implementation="css">
                        <p>/{restaurant.kitchen.time_type}</p>
                      </Hidden>
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
