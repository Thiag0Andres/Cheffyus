import React, { useEffect, useState } from "react";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import Pagination from "react-bootstrap/Pagination";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Icons
import { BsFillGridFill } from "react-icons/bs";
import { GoListUnordered } from "react-icons/go";
import { FaMapMarkedAlt } from "react-icons/fa";

// leaflet
import { Map, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

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

const Mapa: React.FC = () => {
  // Estado
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    36.9029234,
    -76.1518893,
  ]);

  // Chamada a api
  useEffect(() => {
    api.get("restaurants").then((response) => {
      setRestaurants(response.data);
      //console.log(response);
    });
  }, []);

  return (
    <Container fluid id="page-home-map">
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
          <Pagination.Item id="pagination2" href="/list" disabled={false}>
            <GoListUnordered />
            List
          </Pagination.Item>
          <Pagination.Item id="pagination3" href="/map" active={true}>
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
              <Button className="button" type="submit">
                Update view
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col className="map" xl="9">
          <Map center={initialPosition} zoom={7}>
            {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}*/}
            <TileLayer
              url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
            />
          </Map>
        </Col>
      </Row>
    </Container>
  );
};
export default Mapa;
