import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import Pagination from "react-bootstrap/Pagination";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

//Icons
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
  // Estado
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  // Chamada a api
  useEffect(() => {
    api.get("restaurants").then((response) => {
      setRestaurants(response.data);
      console.log(response);
    });
  }, []);

  return (
    <Container fluid id="page-home-list">
      <Row className="header">
        <Dropdown className="dropdown">
          <Dropdown.Toggle id="dropdown-basic">
            All listing types
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="">All listing types</Dropdown.Item>
            <Dropdown.Item href="">
              Offering without online payment
            </Dropdown.Item>
            <Dropdown.Item href="">Offering with online payment</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Pagination>
          <Pagination.Item id="pagination1" href="/" disabled={false}>
            <BsFillGridFill />
            Grid
          </Pagination.Item>
          <Pagination.Item id="pagination2" href="/list" active={true}>
            <GoListUnordered />
            List
          </Pagination.Item>
          <Pagination.Item id="pagination3" href="/map" disabled={false}>
            <FaMapMarkedAlt />
            Map
          </Pagination.Item>
        </Pagination>
      </Row>
      <Row>
        <Col className="slider" xl="3">
          <Form className="range">
            <Form.Group controlId="formBasicRangeCustom">
              <Form.Label className="text">Price</Form.Label>
              <Form.Control
                className="range-slider"
                type="range"
                custom
                size="lg"
              />
              <Button className="button" variant="primary" type="submit">
                Update view
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col className="list" xl="9">
          <ul>
            {restaurants.map((restaurant) => (
              <li key={restaurant.id}>
                <img
                  src={restaurant.image_url_restaurant}
                  alt={restaurant.name}
                />
                <div className="info">
                  <div className="box1">
                    <strong>{restaurant.title}</strong>
                    <div className="chef-info">
                      <img
                        src={restaurant.image_url_chef}
                        alt={restaurant.name}
                      />
                      <Link to="">{restaurant.name}</Link>
                    </div>
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
