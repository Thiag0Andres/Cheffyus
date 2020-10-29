import React, { useEffect, useState } from "react";

//Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import Pagination from "react-bootstrap/Pagination";

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

const Grid: React.FC = () => {
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
    <Container fluid id="page-home-grid">
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
          <Pagination.Item id="pagination1" href="/" active={true}>
            <BsFillGridFill />
            Grid
          </Pagination.Item>
          <Pagination.Item id="pagination2" href="/List" disabled={false}>
            <GoListUnordered />
            List
          </Pagination.Item>
          <Pagination.Item id="pagination3" href="/Map" disabled={false}>
            <FaMapMarkedAlt />
            Map
          </Pagination.Item>
        </Pagination>
      </Row>
      <Row>
        <Col className="slider" xl="4"></Col>
        <Col className="grid" xl="8">
          <ul>
            {restaurants.map((restaurant) => (
              <div key={restaurant.id}>
                <li>
                  <img
                    src={restaurant.image_url_restaurant}
                    alt={restaurant.name}
                  />
                  <strong>{restaurant.title}</strong>
                  <span>{restaurant.price}</span>

                  <div className="box2">
                    <img
                      src={restaurant.image_url_chef}
                      alt={restaurant.name}
                    />
                    <strong>{restaurant.name}</strong>
                  </div>
                </li>
              </div>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};
export default Grid;
