import React, { useEffect, useState } from "react";
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

// leaflet
import { Map, TileLayer, Marker } from "react-leaflet";
import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";

// Icons
import { AiFillLike } from "react-icons/ai";
import { ImTwitter } from "react-icons/im";

// Images
import markerMap from "../../images/markerMap.png";

import "./styles.scss";

interface Props {
  detail: any;
}

const RestaurantInfo: React.FC<Props> = ({ detail }) => {
  const user: User = useSelector((state: RootStateOrAny) => state.user.user);
  const history = useHistory();

  //States
  const [isLogged, setIsLogged] = useState(false);

  // Atualiza o estado de autenticação na mudança de usuário
  useEffect(() => {
    const response = isAuthenticated();
    setIsLogged(response);
  }, [user]);

  const handleNextPageContactChef = () => {
    if (isLogged) {
      history.push({
        pathname: `/contact-chef/${detail.name}`,
        state: {
          detail: detail,
        },
      });
    } else {
      history.push({
        pathname: "/login",
        state: {
          message:
            "You must log in to Cheffy to create a new listing. If you don't have an account you can",
        },
      });
    }
  };

  const handleNextPageRequest = () => {
    if (isLogged) {
      history.push({
        pathname: `/request/${detail.title}`,
        state: {
          detail: detail,
        },
      });
    } else {
      history.push("/login");
    }
  };

  // Marker do map
  const mapIcon = Leaflet.icon({
    iconUrl: markerMap,
    iconSize: [23, 33],
    iconAnchor: [11.5, 33],
  });

  return (
    <Container fluid id="page-restaurant-info">
      <Row className="body">
        <Col className="image" xl="8">
          <Carousel>
            <Carousel.Item>
              <img src={detail.image_url_restaurant} alt={detail.title} />
            </Carousel.Item>
            <Carousel.Item>
              <img src={detail.image_url_restaurant} alt={detail.title} />
            </Carousel.Item>
          </Carousel>
          <p>{detail.description}</p>
          <div className="spans">
            <Button className="like" type="submit">
              <AiFillLike size={16} />
              Like 0
            </Button>
            <Button className="share" type="submit">
              Share
            </Button>
            <Button className="tweet" type="submit">
              <ImTwitter />
              Tweet
            </Button>
          </div>
        </Col>
        <Col className="info" xl="4">
          <Row className="box1">
            <div className="price">
              <span className="value">${detail.price}</span>
              <p>per hour</p>
            </div>
            <div className="input-price">
              <Form.Label className="text">Number of hours:</Form.Label>
              <Form.Control
                className="input"
                type="number"
                min={1}
                placeholder="Quantity"
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
                pathname: `/profile-chef/${detail.name}`,
                state: {
                  detail: detail,
                },
              }}
            >
              <img src={detail.image_url_chef_medium} alt={detail.name} />
            </Link>
            <div>
              <Link
                to={{
                  pathname: `/profile-chef/${detail.name}`,
                  state: {
                    detail: detail,
                  },
                }}
              >
                {detail.name}
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
            <Map center={detail.location} zoom={12}>
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
              <Marker icon={mapIcon} position={detail.location} />
            </Map>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
export default RestaurantInfo;
