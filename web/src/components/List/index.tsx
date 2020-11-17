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
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
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
        <Col className="list" xl="9" lg="9" md="9" xs="9" sm="9">
          <ul>
            {restaurants.length > 0 &&
              restaurants.map((restaurant: any) => (
                <li key={restaurant.user.id}>
                  <Link
                    to={{
                      pathname: `/restaurant/${restaurant.kitchens[0].name}`,
                      state: {
                        detail: restaurant,
                      },
                    }}
                  >
                    <img
                      src={restaurant.kitchens[0].image_urls[0]}
                      alt={restaurant.kitchens[0].name}
                    />
                  </Link>
                  <div className="info">
                    <div className="box1">
                      <Link
                        to={{
                          pathname: `/restaurant/${restaurant.kitchens[0].name}`,
                          state: {
                            detail: restaurant,
                          },
                        }}
                      >
                        <strong>{restaurant.kitchens[0].name}</strong>
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
                      <span>${restaurant.kitchens[0].price_per_time}</span>
                      <Hidden xsDown implementation="css">
                        <p>per {restaurant.kitchens[0].time_type}</p>
                      </Hidden>
                      <Hidden smUp implementation="css">
                        <p>/ {restaurant.kitchens[0].time_type}</p>
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
