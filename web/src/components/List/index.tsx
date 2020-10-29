import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import Pagination from "react-bootstrap/Pagination";

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
            <Dropdown.Item href="">Action</Dropdown.Item>
            <Dropdown.Item href="">Another action</Dropdown.Item>
            <Dropdown.Item href="">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Pagination>
          <Pagination.Item id="pagination1" href="/" disabled={false}>
            Grid
          </Pagination.Item>
          <Pagination.Item id="pagination2" href="/List" active={true}>
            List
          </Pagination.Item>
          <Pagination.Item id="pagination3" href="/Map" disabled={false}>
            Map
          </Pagination.Item>
        </Pagination>
      </Row>
      <Row>
        <Col xl="4"></Col>
        <Col className="list" xl="8">
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
                  <span>{restaurant.price}</span>
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
