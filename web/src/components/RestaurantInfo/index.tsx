import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import Form from "react-bootstrap/Form";

// Material UI
import Hidden from "@material-ui/core/Hidden";

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

// Icons
import { AiFillLike } from "react-icons/ai";
import { ImTwitter } from "react-icons/im";

// Images
import markerMap from "../../images/markerMap.png";
import userNotfound from "../../images/user.png";

import api from "../../services/api";

import "./styles.scss";

interface Props {
  detail: any;
}

const RestaurantInfo: React.FC<Props> = ({ detail }) => {
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
    likes: detail.kitchen.likes,
  });

  // Atualiza o estado de autenticação na mudança de usuário
  useEffect(() => {
    const response = isAuthenticated();
    setIsLogged(response);
  }, [user]);

  const handleNextPageContactChef = () => {
    if (isLogged) {
      history.push({
        pathname: `/contact-chef/${detail.user.username}`,
        state: {
          detail: detail,
        },
      });
    } else {
      history.push("/login");
      enqueueSnackbar("You must log in to Cheffy to contact a chef", {
        variant: "error",
      });
    }
  };

  const handleNextPageRequest = () => {
    if (isLogged) {
      history.push({
        pathname: `/request/${detail.kitchen.name}`,
        state: {
          detail: detail,
          formData: formData,
        },
      });
    } else {
      history.push("/login");
      enqueueSnackbar("You must log in to Cheffy to make a request", {
        variant: "error",
      });
    }
  };

  const handleInputChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    console.log(event.target.value);

    setFormData({ ...formData, [name]: Number(value) });
  };

  const UpdateKitchen = () => {
    if (isLogged) {
      formData.likes = formData.likes + 1;
      console.log(formData.likes);
    }

    const { likes } = formData;

    const body = {
      likes: likes,
    };

    const proxyurl = "https://afternoon-brook-18118.herokuapp.com/";
    const url = "https://cheffyus-api.herokuapp.com/";

    api
      .put(proxyurl + url + `/kitchens/${detail.kitchen.id}`, body, {
        headers: { Authorization: token },
      })
      .then((response) => {
        const data = response.data;
        //console.log(data);

        //dispatch(updateUser(data));

        /*         enqueueSnackbar("Kitchen updated successfully!", {
          variant: "success",
        }); */
      })
      .catch((error) => {
        /*         console.log(error);
        enqueueSnackbar("Failed to update.", { variant: "error" }); */
      });
  };

  //console.log(formData);

  // Marker do map
  const mapIcon = Leaflet.icon({
    iconUrl: markerMap,
    iconSize: [23, 33],
    iconAnchor: [11.5, 33],
  });

  const typeTime = () => {
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
  };

  return (
    <Row id="page-restaurant-info">
      <Col className="image" xl="auto" lg="auto" md="auto" xs="auto" sm="auto">
        <Carousel>
          <Carousel.Item>
            <img src={detail.kitchen.image_urls[0]} alt={detail.kitchen.name} />
          </Carousel.Item>
        </Carousel>
        <p>{detail.kitchen.description}</p>
        <div className="spans">
          <Button className="like" type="submit" onClick={UpdateKitchen}>
            <AiFillLike size={16} />
            &nbsp; Like {detail.kitchen.likes}
          </Button>
          <Button className="share">Share</Button>
          <Button className="tweet">
            <ImTwitter />
            &nbsp;Tweet
          </Button>
        </div>
      </Col>
      <Col className="info" xl="auto" lg="auto" md="auto" xs="auto" sm="auto">
        <Row className="box1">
          <div className="price">
            <span className="value">${detail.kitchen.price_per_time}</span>
            &nbsp;&nbsp;
            <p>per {detail.kitchen.time_type}</p>
          </div>
          <div className="input-price">
            <Form.Label className="text" style={{ display: "flex" }}>
              Number of&nbsp;{typeTime()}
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
              pathname: `/profile-chef/${detail.user.first_name}`,
              state: {
                detail: detail,
              },
            }}
          >
            <img
              src={
                detail.user.image_url === null
                  ? userNotfound
                  : detail.user.image_url
              }
              alt={detail.user.first_name}
            />
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <div>
            <Link
              to={{
                pathname: `/profile-chef/${detail.user.first_name}`,
                state: {
                  detail: detail,
                },
              }}
            >
              {detail.user.first_name}
            </Link>
            <Button
              className="button"
              type="submit"
              onClick={handleNextPageContactChef}
            >
              Contact
            </Button>
          </div>
        </Row>

        <Row className="box3">
          <Map
            center={[detail.kitchen.location_lat, detail.kitchen.location_lon]}
            zoom={12}
          >
            <TileLayer
              url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
            />
            <Marker
              icon={mapIcon}
              position={[
                detail.kitchen.location_lat,
                detail.kitchen.location_lon,
              ]}
            />
          </Map>
        </Row>
      </Col>
    </Row>
  );
};
export default RestaurantInfo;
