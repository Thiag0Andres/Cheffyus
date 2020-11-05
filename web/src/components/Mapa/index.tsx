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

// leaflet
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";

// Icons
import { BsFillGridFill } from "react-icons/bs";
import { GoListUnordered } from "react-icons/go";
import { FaMapMarkedAlt } from "react-icons/fa";

// Images
import markerMap from "../../images/markerMap.png";

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
    38.8935124,
    -77.1550051,
  ]);

  // Chamada a api
  useEffect(() => {
    api.get("restaurants").then((response) => {
      setRestaurants(response.data);
      //console.log(response);
    });
  }, []);

  // Marker do map
  const mapIcon = Leaflet.icon({
    iconUrl: markerMap,
    iconSize: [23, 36],
    iconAnchor: [11.5, 43],
    //popupAnchor: [],
  });

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
          <Map center={initialPosition} zoom={9}>
            <TileLayer
              url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
            />

            {restaurants.map((restaurant) => (
              <Marker
                key={restaurant.id}
                icon={mapIcon}
                position={restaurant.location}
              >
                <Popup
                  className="popup"
                  closeButton={false}
                  minWidth={200}
                  maxWidth={200}
                  maxHeight={150}
                >
                  <Row className="row1">
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
                      <p>{restaurant.title}</p>
                    </Link>
                  </Row>
                  <Row className="row2">
                    <Link
                      className="box2"
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
                      <div className="price">
                        <span className="value">${restaurant.price}</span>
                        <p className="hour">per hour</p>
                      </div>
                    </Link>
                  </Row>
                </Popup>
              </Marker>
            ))}
          </Map>
        </Col>
      </Row>
    </Container>
  );
};
export default Mapa;
