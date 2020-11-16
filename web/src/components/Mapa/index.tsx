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

// Material UI
import Hidden from "@material-ui/core/Hidden";

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
  // States
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [show, setShow] = useState(false);
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
    iconSize: [23, 33],
    iconAnchor: [11.5, 33],
    popupAnchor: [0, -32],
  });

  return (
    <Container fluid id="page-home-map">
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
            <Pagination.Item id="pagination2" href="/list" disabled={false}>
              <GoListUnordered />
              <Hidden smDown implementation="css">
                List
              </Hidden>
            </Pagination.Item>
            <Pagination.Item id="pagination3" href="/map" active={true}>
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
      <Row className="content-map">
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
        <Col className="map" xl="auto" lg="auto" md="auto" xs="auto" sm="auto">
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
                <Popup className="popup" closeButton={false}>
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
                      <span>{restaurant.title}</span>
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
                    </Link>
                    <div className="price">
                      <p className="value">${restaurant.price}</p>
                      <p className="hour"> per hour</p>
                    </div>
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
