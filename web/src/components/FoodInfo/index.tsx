import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import Form from "react-bootstrap/Form";

// Redux e Auth
import { useSelector, RootStateOrAny } from "react-redux";
import { isAuthenticated } from "../../services/auth";

// Types
import { User } from "../../store/ducks/user/types";
import { Token } from "../../store/ducks/token/types";

//Message
import { useSnackbar } from "notistack";

// leaflet
import { Map, TileLayer, Marker } from "react-leaflet";
import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";

// Images
import markerMap from "../../images/markerMap.png";
import foodNotFound from "../../images/foodNotFound.jpg";
import userNotfound from "../../images/user.png";

import "./styles.scss";

interface Props {
  detail: any;
}

const FoodInfo: React.FC<Props> = ({ detail }) => {
  const token: Token = useSelector(
    (state: RootStateOrAny) => state.token.token.token
  );
  const user: User = useSelector((state: RootStateOrAny) => state.user.user);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  //States
  const [isLogged, setIsLogged] = useState(false);
  const [formData, setFormData] = useState({
    time: 1,
  });

  // Atualiza o estado de autenticação na mudança de usuário
  useEffect(() => {
    const response = isAuthenticated();
    setIsLogged(response);
  }, [user]);

  /*   const handleNextPageContactChef = () => {
    if (isLogged) {
      history.push({
        pathname: `/food/contact-chef/${detail.chef.name}`,
        state: {
          detail: detail,
        },
      });
    } else {
      history.push("/food/login");
      enqueueSnackbar("You must log in to Cheffy to contact a chef", {
        variant: "error",
      });
    }
  }; */

  const handleNextPageRequest = () => {
    /*     if (isLogged) {
      history.push({
        pathname: `/food/request/${detail.name}`,
        state: {
          detail: detail,
          formData: formData,
        },
      });
    } else {
      history.push("/food/login");
      enqueueSnackbar("You must log in to Cheffy to make a request", {
        variant: "error",
      });
    } */

    history.push({
      pathname: `/food/request/${detail.name}`,
      state: {
        detail: detail,
        formData: formData,
      },
    });
  };

  const handleInputChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    console.log(event.target.value);

    setFormData({ ...formData, [name]: Number(value) });
  };

  //console.log(formData);

  // Marker do map
  const mapIcon = Leaflet.icon({
    iconUrl: markerMap,
    iconSize: [23, 33],
    iconAnchor: [11.5, 33],
  });

  /*   const typeTime = () => {
    if (detail.kitchen.time_type == "hour") {
      return <p>hours:</p>;
    } else if (detail.kitchen.time_type == "day") {
      return <p>days:</p>;
    } else if (detail.kitchen.time_type == "week") {
      return <p>weeks:</p>;
    } else if (detail.kitchen.time_type == "month") {
      return <p>months:</p>;
    } else if (detail.kitchen.time_type == "year") {
      return <p>years:</p>;
    }
  }; */

  return (
    <Row id="page-restaurant-info">
      <Col className="image" xl="auto" lg="auto" md="auto" xs="auto" sm="auto">
        <Carousel>
          <Carousel.Item>
            <img
              src={
                detail.PlateImages.length === 0
                  ? foodNotFound
                  : detail.PlateImages[0]?.url
              }
              alt={detail.name}
            />
          </Carousel.Item>
        </Carousel>
        <p>{detail.description}</p>
      </Col>
      <Col className="info" xl="auto" lg="auto" md="auto" xs="auto" sm="auto">
        <Row className="box1">
          <div className="price">
            <span className="value">${detail.price}</span>
            &nbsp;&nbsp;
            {/*  <p>per {detail.kitchen.time_type}</p> */}
          </div>
          <div className="input-price">
            <Form.Label className="text" style={{ display: "flex" }}>
              Number {/* of&nbsp;{typeTime()} */}
            </Form.Label>
            <Form.Control
              className="input"
              type="number"
              min={1}
              placeholder="Quantity"
              name="time"
              onChange={handleInputChange}
            />
          </div>
          <Button
            className="button"
            type="submit"
            onClick={handleNextPageRequest}
          >
            Request
          </Button>
        </Row>
        <Row className="box2">
          <Link
            to={{
              pathname: `/food/profile-chef/${detail.chef.name}`,
              state: {
                detail: detail,
              },
            }}
          >
            <img
              src={
                detail.chef.imagePath === null
                  ? userNotfound
                  : detail.chef.imagePath
              }
              alt={detail.chef.name}
            />
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <div>
            <Link
              to={{
                pathname: `/food/profile-chef/${detail.chef.name}`,
                state: {
                  detail: detail,
                },
              }}
            >
              {detail.chef.name}
            </Link>
            <Button
              className="button"
              type="submit"
              /* onClick={handleNextPageContactChef} */
            >
              Contact
            </Button>
          </div>
        </Row>

        <Row className="box3">
          <Map
            center={[detail.chef.location_lat, detail.chef.location_lon]}
            zoom={12}
          >
            <TileLayer
              url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
            />
            <Marker
              icon={mapIcon}
              position={[detail.chef.location_lat, detail.chef.location_lon]}
            />
          </Map>
        </Row>
      </Col>
    </Row>
  );
};
export default FoodInfo;
