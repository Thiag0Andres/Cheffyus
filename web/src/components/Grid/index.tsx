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
import { theme } from "../../material-ui";
import { CircularProgress, ThemeProvider } from "@material-ui/core";

// Icons
import { BsFillGridFill } from "react-icons/bs";
import { GoListUnordered } from "react-icons/go";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

// Images
import userNotfound from "../../images/user.png";
import kitchenNotFound from "../../images/kitchen.jpg";

import api from "../../services/api";

import "./styles.scss";

function valuetext(value: number) {
  return `$ ${value}`;
}

const Grid: React.FC = () => {
  const filterName: FilterName[] = useSelector(
    (state: RootStateOrAny) => state.filterName.filterName
  );
  const dispatch = useDispatch();

  //console.log(filterName);

  // States
  const [show, setShow] = useState(false);
  const [value, setValue] = useState<number[]>([0, 10000]);
  const [valueDrop, setValueDrop] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const FilterMinMax = (event: FormEvent) => {
    event.preventDefault();

    const proxyurl = "https://afternoon-brook-18118.herokuapp.com/";
    const url = `https://cheffyus-api.herokuapp.com/kitchens/?min_price=${value[0]}&max_price=${value[1]}`;

    api
      .get(proxyurl + url)
      .then((response) => {
        const data = response.data;
        dispatch(updateFilterName(data));
        setShow(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (valueDrop != 0) {
      const proxyurl = "https://afternoon-brook-18118.herokuapp.com/";
      const url = `https://cheffyus-api.herokuapp.com/kitchens/?category_id=${valueDrop}`;

      api
        .get(proxyurl + url)
        .then((response) => {
          const data = response.data;
          dispatch(updateFilterName(data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [valueDrop]);

  return (
    <Container fluid id="page-home-grid">
      <Row className="content-header">
        <Col className="header" xl="12" lg="12" md="12" xs="12" sm="12">
          <Hidden smDown implementation="css">
            <Dropdown className="dropdown">
              <Dropdown.Toggle id="dropdown-basic">
                Select the category
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>All listing types</Dropdown.Item>
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
            <Pagination.Item id="pagination1" href="/" active={true}>
              <BsFillGridFill />
              &nbsp;&nbsp;
              <Hidden smDown implementation="css">
                Grid
              </Hidden>
            </Pagination.Item>
            <Pagination.Item id="pagination2" href="/list" disabled={false}>
              <GoListUnordered />
              &nbsp;&nbsp;
              <Hidden smDown implementation="css">
                List
              </Hidden>
            </Pagination.Item>
            <Pagination.Item id="pagination3" href="/map" disabled={false}>
              <FaMapMarkedAlt />
              <Hidden smDown implementation="css">
                &nbsp;&nbsp; Map
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
                    <Dropdown.Item>All listing types</Dropdown.Item>
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
      <Row className="content-grid">
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

        <Col className="grid" xl="auto" lg="auto" md="auto" xs="auto" sm="auto">
          {loading && (
            <div
              style={{
                width: "100vh",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ThemeProvider theme={theme}>
                <CircularProgress />
              </ThemeProvider>
            </div>
          )}

          <ul>
            {filterName.length > 0 &&
              filterName.map((restaurant: any) => (
                <li key={restaurant.kitchen.id}>
                  <div className="opacity"></div>

                  <img
                    src={
                      restaurant.kitchen.image_urls[0] === null
                        ? kitchenNotFound
                        : restaurant.kitchen.image_urls[0]
                    }
                    alt={restaurant.kitchen.name}
                  />
                  <Link
                    className="box1"
                    to={{
                      pathname: `/restaurant/${restaurant.kitchen.name}`,
                      state: {
                        detail: restaurant,
                      },
                    }}
                  >
                    <div className="price">
                      <span className="value">
                        ${restaurant.kitchen.price_per_time}
                      </span>
                      &nbsp;
                      <span className="hour">
                        / {restaurant.kitchen.time_type}
                      </span>
                    </div>
                    <p>{restaurant.kitchen.name}</p>
                  </Link>
                  <Link
                    className="box2"
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
                    &nbsp;&nbsp;&nbsp;
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
                </li>
              ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};
export default Grid;
