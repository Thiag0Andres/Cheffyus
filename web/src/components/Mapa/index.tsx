import React, { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Redux e Auth
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { updateFilterName } from "../../store/ducks/filterName/actions";

// Types
import { FilterName } from "../../store/ducks/filterName/types";

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
import Slider from "@material-ui/core/Slider";

// Components
import PaginationUi from "../Pagination";

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
import userNotfound from "../../images/user.png";

import api from "../../services/api";

import "./styles.scss";

function valuetext(value: number) {
  return `$ ${value}`;
}

const Mapa: React.FC = () => {
  const filterName: FilterName[] = useSelector(
    (state: RootStateOrAny) => state.filterName.filterName
  );
  const dispatch = useDispatch();

  // States
  const [show, setShow] = useState(false);
  const [value, setValue] = useState<number[]>([0, 10000]);
  const [valueDrop, setValueDrop] = useState<number>(0);
  const [valuePage, setValuePage] = useState();
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    38.8935124,
    -77.1550051,
  ]);

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const FilterMinMax = (event: FormEvent) => {
    event.preventDefault();

    //const proxyurl = "https://afternoon-brook-18118.herokuapp.com/";
    const url = `https://cheffyus-api.herokuapp.com/kitchens/?min_price=${value[0]}&max_price=${value[1]}`;

    api
      .get(url)
      .then((response) => {
        const data = response.data;
        dispatch(updateFilterName(data));
        setShow(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const AllkitchensTypes = () => {
    //const proxyurl = "https://afternoon-brook-18118.herokuapp.com/";
    const url = `https://cheffyus-api.herokuapp.com/kitchens/?min_price=${0}&max_price=${10000}`;

    api
      .get(url)
      .then((response) => {
        const data = response.data;
        dispatch(updateFilterName(data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (valueDrop != 0) {
      //const proxyurl = "https://afternoon-brook-18118.herokuapp.com/";
      const url = `https://cheffyus-api.herokuapp.com/kitchens/?category_id=${valueDrop}`;

      api
        .get(url)
        .then((response) => {
          const data = response.data;
          dispatch(updateFilterName(data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [valueDrop]);

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
                Select the category
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={AllkitchensTypes}>
                  All listing types
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setValueDrop(11);
                  }}
                >
                  Offering without online payment
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setValueDrop(21);
                  }}
                >
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
            <Pagination.Item
              id="pagination1"
              href="/kitchen/grid-kitchens"
              disabled={false}
            >
              <BsFillGridFill />
              <Hidden smDown implementation="css">
                Grid
              </Hidden>
            </Pagination.Item>
            <Pagination.Item
              id="pagination2"
              href="/kitchen/list-kitchens"
              disabled={false}
            >
              <GoListUnordered />
              <Hidden smDown implementation="css">
                List
              </Hidden>
            </Pagination.Item>
            <Pagination.Item
              id="pagination3"
              href="/kitchen/map-kitchens"
              active={true}
            >
              <FaMapMarkedAlt />
              <Hidden smDown implementation="css">
                Map
              </Hidden>
            </Pagination.Item>
          </Pagination>
        </Col>

        {show && (
          <Hidden mdUp implementation="css">
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
                    Select the category
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={AllkitchensTypes}>
                      All listing types
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setValueDrop(11);
                      }}
                    >
                      Offering without online payment
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setValueDrop(21);
                      }}
                    >
                      Offering with online payment
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Form className="range" onSubmit={FilterMinMax}>
                  <Form.Group
                    className="range-form"
                    controlId="formBasicRangeCustom"
                  >
                    <Form.Label className="text">Price</Form.Label>
                    <Slider
                      value={value}
                      onChange={handleChange}
                      //valueLabelDisplay="auto"
                      aria-labelledby="range-slider"
                      getAriaValueText={valuetext}
                      max={10000}
                      min={0}
                    />

                    <Form.Group className="Min-Max">
                      <Form.Label className="text2">Min: {value[0]}</Form.Label>
                      <Form.Label className="text2">Max: {value[1]}</Form.Label>
                    </Form.Group>
                    <Button
                      className="button"
                      type="submit"
                      onClick={FilterMinMax}
                    >
                      Update view
                    </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Hidden>
        )}
      </Row>
      <Row className="content-map">
        <Col className="slider" xl="3" lg="3" md="3" xs="3" sm="3">
          <Hidden smDown implementation="css">
            <Form className="range" onSubmit={FilterMinMax}>
              <Form.Group
                className="range-form"
                controlId="formBasicRangeCustom"
              >
                <Form.Label className="text">Price</Form.Label>
                <Slider
                  value={value}
                  onChange={handleChange}
                  //valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  getAriaValueText={valuetext}
                  max={10000}
                  min={0}
                />

                <Form.Group className="Min-Max">
                  <Form.Label className="text2">Min: {value[0]}</Form.Label>
                  <Form.Label className="text2">Max: {value[1]}</Form.Label>
                </Form.Group>

                <Button className="button" type="submit" onClick={FilterMinMax}>
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
            {filterName.length > 0 &&
              filterName.map((restaurant: any) => (
                <Marker
                  key={restaurant.kitchen.id}
                  icon={mapIcon}
                  position={[
                    restaurant.kitchen.location_lat,
                    restaurant.kitchen.location_lon,
                  ]}
                >
                  <Popup className="popup" closeButton={false}>
                    <Row className="row1">
                      <div className="opacity"></div>
                      <img
                        src={restaurant.kitchen.image_urls[0]}
                        alt={restaurant.kitchen.name}
                      />
                      <Link
                        className="box1"
                        to={{
                          pathname: `/kitchen/restaurant/${restaurant.kitchen.name}`,
                          state: {
                            detail: restaurant,
                          },
                        }}
                      >
                        <span>{restaurant.kitchen.name}</span>
                      </Link>
                    </Row>
                    <Row className="row2">
                      <Link
                        className="box2"
                        to={{
                          pathname: `/kitchen/profile-chef/${restaurant.user.first_name}`,
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
                            pathname: `/kitchen/profile-chef/${restaurant.user.first_name}`,
                            state: {
                              detail: restaurant,
                            },
                          }}
                        >
                          {restaurant.user.first_name}
                        </Link>
                      </Link>
                      <div className="price">
                        <p className="value">
                          ${restaurant.kitchen.price_per_time}
                        </p>
                        <p className="hour">
                          per {restaurant.kitchen.time_type}
                        </p>
                      </div>
                    </Row>
                  </Popup>
                </Marker>
              ))}
          </Map>
        </Col>
      </Row>
      <Row className="pagination">
        <PaginationUi setValuePage={setValuePage} />
      </Row>
    </Container>
  );
};
export default Mapa;
