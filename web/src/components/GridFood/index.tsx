import React, { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

//Message
import { useSnackbar } from "notistack";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Material UI
import Hidden from "@material-ui/core/Hidden";
import Slider from "@material-ui/core/Slider";

// Components
import Pagination from "../Pagination";
import PaginationCategory from "../PaginationCategory";
import PaginationChef from "../PaginationChef";
import PlateNotExist from "../../layout/PlateNotExist";
import Loading from "../../layout/Loading";

// Images
import userNotfound from "../../images/user.png";
import foodNotFound from "../../images/foodNotFound.jpg";

// Icons
import { BsFillStarFill } from "react-icons/bs";

import api from "../../services/api";

import "./styles.scss";

function valuetext(value: number) {
  return `$ ${value}`;
}

interface Props {
  filter: any;
  setPage: any;
  locationUser: any;
}

const GridFood: React.FC<Props> = ({ filter, setPage, locationUser }) => {
  const { enqueueSnackbar } = useSnackbar();

  // States
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryBoolean, setCategoryBoolean] = useState(false);
  const [filterBoolean, setFilterBoolean] = useState(false);
  const [restaurants, setRestaurants] = useState<Array<any>>([]);
  const [value, setValue] = useState<number[]>([0, 1000]);
  const [valuePage, setValuePage] = useState(1);
  const [categoryFiltered, setCategoryFiltered] = useState([]);
  const [id, setId] = useState();
  const [typePlate, setTypePlate] = useState("");

  //console.log("location", locationUser);
  //console.log("id", id);

  useEffect(() => {
    setRestaurants(categoryFiltered);
  }, [categoryFiltered]);

  useEffect(() => {
    setRestaurants(filter);
  }, [filter]);

  useEffect(() => {
    setPage(valuePage);
  }, [setPage, valuePage]);

  useEffect(() => {
    setShowFilter(filterBoolean);
  }, [filterBoolean]);

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleSelectedOption = (e: any) => {
    setTypePlate(e.target.value);
  };

  // Chamada a api
  useEffect(() => {
    setLoading(true);
    const url = `https://mycheffy.herokuapp.com/plate/?page=${valuePage}&pageSize=${12}&near=${true}&lat=${
      locationUser[0]
    }&lon=${locationUser[1]}&radius=${100}`;

    api
      .get(url)
      .then((response) => {
        const data = response.data;
        //console.log("oi", data.data);
        setRestaurants(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [locationUser, valuePage]);

  const FilterPlates = (event: FormEvent) => {
    event.preventDefault();

    if (typePlate === "") {
      setLoading(true);
      console.log(1);
      const url = `https://mycheffy.herokuapp.com/plate/?page=${valuePage}&pageSize=${12}&priceRange=${
        value[0]
      }&priceRange=${value[1]}&near=${true}&lat=${locationUser[0]}&lon=${
        locationUser[1]
      }&radius=${100}`;

      api
        .get(url)
        .then((response) => {
          const data = response.data;

          console.log(data);
          setRestaurants(data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (typePlate === "PP") {
      setLoading(true);
      console.log(2);
      const url = `https://mycheffy.herokuapp.com/plate/popular/?page=${valuePage}&pageSize=${12}&priceRange=${
        value[0]
      }&priceRange=${value[1]}&near=${true}&lat=${locationUser[0]}&lon=${
        locationUser[1]
      }&radius=${100}`;

      api
        .get(url)
        .then((response) => {
          const data = response.data;

          console.log(data);
          setRestaurants(data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      enqueueSnackbar("Failed to filter.", {
        variant: "error",
      });
    }
  };

  return (
    <Container fluid id="page-home-grid-food">
      <Row className="content-header">
        <Col className="header" xl="12" lg="12" md="12" xs="12" sm="12">
          <PaginationChef />
        </Col>
        <Col className="header" xl="12" lg="12" md="12" xs="12" sm="12">
          <Hidden mdUp implementation="css">
            <Button
              className="button2"
              onClick={() => {
                setShowFilter(true);
                setCategoryBoolean(false);
                //console.log(showFilter);
                //console.log(categoryBoolean);
              }}
            >
              Filter
            </Button>
          </Hidden>
          <PaginationCategory
            setCategoryBoolean={setCategoryBoolean}
            setCategoryFiltered={setCategoryFiltered}
            setFilterBoolean={setFilterBoolean}
            setId={setId}
            valuePage={valuePage}
            showFilter={showFilter}
            categoryBoolean={categoryBoolean}
            locationUser={locationUser}
          />
        </Col>

        {showFilter && !categoryBoolean && (
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
                <Form className="range" onSubmit={FilterPlates}>
                  <Form.Label className="text">Filter plates</Form.Label>
                  <Form.Group>
                    <Form.Check
                      type="radio"
                      label="All plates"
                      id="formHorizontalRadios1"
                      name="frequence"
                      value=""
                      onChange={(e) => handleSelectedOption(e)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Check
                      type="radio"
                      label="Popular plates"
                      id="formHorizontalRadios1"
                      name="frequence"
                      value="PP"
                      onChange={(e) => handleSelectedOption(e)}
                    />
                  </Form.Group>
                  <Form.Label className="text">Filter price</Form.Label>
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
                    <Form.Label className="text2">Min: ${value[0]}</Form.Label>
                    <Form.Label className="text2">Max: ${value[1]}</Form.Label>
                  </Form.Group>
                  <Button
                    className="button"
                    type="submit"
                    onClick={FilterPlates}
                  >
                    Update view
                  </Button>
                </Form>
              </Col>
            </Row>
          </Hidden>
        )}
      </Row>
      <Row className="content-grid">
        <Col className="slider" xl="3" lg="3" md="3" xs="3" sm="3">
          <Hidden smDown implementation="css">
            <Form className="range" onSubmit={FilterPlates}>
              <Form.Label className="text">Filter plates</Form.Label>
              <Form.Group>
                <Form.Check
                  type="radio"
                  label="All plates"
                  name="frequence"
                  id="formHorizontalRadios1"
                  value=""
                  onChange={(e) => handleSelectedOption(e)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Check
                  type="radio"
                  label="Popular plates"
                  name="frequence"
                  id="formHorizontalRadios1"
                  value="PP"
                  onChange={(e) => handleSelectedOption(e)}
                />
              </Form.Group>
              <Form.Label className="text">Filter price</Form.Label>
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
                <Form.Label className="text2">Min: ${value[0]}</Form.Label>
                <Form.Label className="text2">Max: ${value[1]}</Form.Label>
              </Form.Group>
              <Button className="button" type="submit" onClick={FilterPlates}>
                Update view
              </Button>
            </Form>
          </Hidden>
        </Col>

        <Col className="grid" xl="9" lg="9" md="9" xs="9" sm="9">
          {loading && <Loading />}
          {!loading && restaurants.length === 0 && <PlateNotExist />}
          {!loading && restaurants.length > 0 && (
            <ul>
              {restaurants.map((restaurant: any) => (
                <li className="main-li " key={restaurant.id}>
                  <div className="main-box">
                    <Link
                      className="box1"
                      to={{
                        pathname: `/food/food/${restaurant.name}`,
                        state: {
                          detail: restaurant,
                        },
                      }}
                    >
                      <img
                        id={`id_${restaurant.id}`}
                        className="imgKitchen"
                        src={
                          !restaurant.PlateImages.length
                            ? foodNotFound
                            : restaurant.PlateImages[0]?.url
                        }
                        alt={restaurant.name}
                      />
                    </Link>

                    <div className="details">
                      {" "}
                      <Row className="title-food">
                        <Col
                          className="box-title"
                          xl="12"
                          lg="12"
                          md="12"
                          xs="12"
                          sm="12"
                        >
                          {restaurant.name}
                        </Col>
                      </Row>
                      <Row className="info-food">
                        <Col className="p-0" xl="9" lg="9" md="9" xs="9" sm="9">
                          <span className="review">
                            <BsFillStarFill />
                            &nbsp;&nbsp; {restaurant.rating || 0} reviews
                          </span>
                        </Col>
                        <Col className="p-0" xl="3" lg="3" md="3" xs="3" sm="3">
                          <span className="price">${restaurant.price}</span>
                        </Col>
                      </Row>
                      <Row className="info-chef">
                        <Col
                          className="p-0"
                          xl="12"
                          lg="12"
                          md="12"
                          xs="12"
                          sm="12"
                        >
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
                        </Col>
                      </Row>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Col>
      </Row>
      <Row style={{ display: "flex", justifyContent: "flex-end" }}>
        <Pagination setValuePage={setValuePage} />
      </Row>
    </Container>
  );
};
export default GridFood;
