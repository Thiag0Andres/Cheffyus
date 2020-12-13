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

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Material UI
import Hidden from "@material-ui/core/Hidden";
import Slider from "@material-ui/core/Slider";
import { theme } from "../../material-ui";
import { CircularProgress, ThemeProvider } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

// Components
import PaginationUi from "../Pagination";

// Images
import userNotfound from "../../images/user.png";
import foodNotFound from "../../images/foodNotFound.jpg";

import api from "../../services/api";

function valuetext(value: number) {
  return `$ ${value}`;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > *": {
        marginTop: theme.spacing(2),
      },
    },
  })
);

interface Props {
  filter: any;
}

const GridFood: React.FC<Props> = ({ filter }) => {
  const classes = useStyles();

  // States
  const [show, setShow] = useState(false);
  const [restaurants, setRestaurants] = useState<Array<any>>([]);
  const [value, setValue] = useState<number[]>([0, 1000]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = React.useState(1);

  //console.log("filter", filter);

  useEffect(() => {
    setRestaurants(filter);
  }, [filter]);

  useEffect(() => {
    //const proxyurl = "https://afternoon-brook-18118.herokuapp.com/";
    const url = `https://mycheffy.herokuapp.com/plate/?page=${page}&pageSize=${12}`;

    api
      .get(url)
      .then((response) => {
        const data = response.data;
        setRestaurants(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  console.log(restaurants);

  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    const sum = value + 1;
    setPage(sum);
  };

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const FilterMinMax = (event: FormEvent) => {
    event.preventDefault();

    //const proxyurl = "https://afternoon-brook-18118.herokuapp.com/";
    const url = `https://mycheffy.herokuapp.com/plate/?page=${page}&pageSize=${12}&price=${
      value[0]
    }`;

    api
      .get(url)
      .then((response) => {
        const data = response.data;
        setRestaurants(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container fluid id="page-home-grid">
      <Row className="content-header">
        <Col className="header" xl="12" lg="12" md="12" xs="12" sm="12">
          <Hidden mdUp implementation="css">
            <Button className="button2" onClick={() => setShow(true)}>
              Filter
            </Button>
          </Hidden>
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
                      max={1000}
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
                  max={1000}
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
            {restaurants.length > 0 &&
              restaurants.map((restaurant: any) => (
                <li key={restaurant.id}>
                  <div className="opacity"></div>

                  <img
                    className="imgKitchen"
                    src={
                      restaurant.PlateImages.length === 0
                        ? foodNotFound
                        : restaurant.PlateImages[0]?.url
                    }
                    alt={restaurant.name}
                  />
                  <Link
                    className="box1"
                    to={{
                      pathname: `/food/food/${restaurant.name}`,
                      state: {
                        detail: restaurant,
                      },
                    }}
                  >
                    <div className="price">
                      <span className="value">${restaurant.price}</span>
                    </div>
                    <p>{restaurant.name}</p>
                  </Link>
                  <Link
                    className="box2"
                    to="/food/grid-foods"
                    /*                     to={{
                      pathname: `/food/profile-chef/${restaurant.chef.name}`,
                      state: {
                        detail: restaurant,
                      },
                    }} */
                  >
                    <img
                      className="imgChef"
                      src={
                        restaurant.chef.imagePath === null
                          ? userNotfound
                          : restaurant.chef.imagePath
                      }
                      alt={restaurant.chef.name}
                    />
                    &nbsp;&nbsp;&nbsp;
                    <Link
                      to="/food/grid-foods"
                      /*                     to={{
                      pathname: `/food/profile-chef/${restaurant.chef.name}`,
                      state: {
                        detail: restaurant,
                      },
                    }} */
                    >
                      {restaurant.chef.name}
                    </Link>
                  </Link>
                </li>
              ))}
          </ul>
        </Col>
      </Row>
      <Row
        className={classes.root}
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Pagination
          count={page}
          shape="rounded"
          onChange={handleChangePagination}
        />
      </Row>
    </Container>
  );
};
export default GridFood;
