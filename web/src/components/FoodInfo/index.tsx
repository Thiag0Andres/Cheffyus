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
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { isAuthenticatedDelivery } from "../../services/auth";
import { addCart } from "../../store/ducks/cart/actions";

// Types
import { UserDelivery } from "../../store/ducks/userDelivery/types";
import { TokenDelivery } from "../../store/ducks/tokenDelivery/types";
import { Cart } from "../../store/ducks/cart/types";

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
import DeliveryMan from "../../images/DeliveryMan.png";

import api from "../../services/api";

import "./styles.scss";

interface Props {
  detail: any;
}

const FoodInfo: React.FC<Props> = ({ detail }) => {
  const token: TokenDelivery = useSelector(
    (state: RootStateOrAny) => state.tokenDelivery.tokenDelivery.tokenDelivery
  );
  const userDelivery: UserDelivery = useSelector(
    (state: RootStateOrAny) => state.userDelivery.userDelivery
  );
  const cart: Cart[] = useSelector((state: RootStateOrAny) => state.cart.cart);
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  //States
  const [isLogged, setIsLogged] = useState(false);
  const [plate, setPlate] = useState("");
  const [typeDel, setTypeDel] = useState("");
  const [click, setClick] = useState(0);
  const [click2, setClick2] = useState(0);
  const [formData, setFormData] = useState({
    quantity: 1,
  });

  //console.log(cart);

  // Atualiza o estado de autenticação na mudança de usuário
  useEffect(() => {
    const response = isAuthenticatedDelivery();
    setIsLogged(response);
  }, [userDelivery]);

  useEffect(() => {
    const typeD = () => {
      if (detail.delivery_type == "free") {
        setTypeDel("user");
      } else if (detail.delivery_type == "paid") {
        setTypeDel("driver");
      }
    };

    typeD();
  }, []);

  useEffect(() => {
    const L = () => {
      cart.map((item: any) => {
        if (
          item.plate.chef.id === detail.chef.id &&
          item.plate.id === detail.id
        ) {
          return setPlate("CASE1");
        } else if (
          item.plate.chef.id === detail.chef.id &&
          item.id !== detail.id
        ) {
          return setPlate("CASE2");
        } else if (item.plate.chef.id !== detail.chef.id) {
          return setPlate("CASE3");
        }
      });
    };

    /*     cart.map((item: any) => {
      console.log(
        "chefID:",
        item.plate.chef.id,
        "detailChefID:",
        detail.chef.id,
        "itemID:",
        item.plate.id,
        "detailID:",
        detail.id
      );
    }); */

    L();
  }, [click]);

  const handleSubmit = () => {
    const body = {
      deliveryType: String(typeDel),
      plates: [
        {
          quantity: Number(formData.quantity),
          plateId: detail.id,
        },
      ],
    };

    const url = "https://mycheffy.herokuapp.com/basket";

    api
      .post(url, body, {
        headers: {
          "x-access-token": token,
          "content-type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        //console.log("basket", data);

        const lestElement = data.items.pop();
        //console.log("oi", lestElement);

        dispatch(addCart(lestElement));
        enqueueSnackbar("Food add to cart", {
          variant: "success",
        });
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar(error.response.data.message, {
          variant: "error",
        });
      });
  };

  const handleNextPageRequest = () => {
    if (isLogged) {
      if (cart.length === 0) {
        if (userDelivery.address.length !== 0) {
          handleSubmit();
        } else {
          enqueueSnackbar("Please add an address", {
            variant: "error",
          });
        }
      } else if (plate === "CASE1") {
        handleSubmit();
      } else if (plate === "CASE2") {
        if (userDelivery.address.length !== 0) {
          handleSubmit();
        } else {
          enqueueSnackbar("Please add an address", {
            variant: "error",
          });
        }
      } else if (plate === "CASE3") {
        enqueueSnackbar("You can only order food from the same Chef", {
          variant: "error",
        });
      }
      setClick(click + 1);
    } else {
      enqueueSnackbar("You must log in to Cheffy to add to cart", {
        variant: "error",
      });
    }
  };

  const handleInputChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    //console.log(event.target.value);

    setFormData({ ...formData, [name]: Number(value) });
  };

  // Marker do map
  const mapIcon = Leaflet.icon({
    iconUrl: markerMap,
    iconSize: [23, 33],
    iconAnchor: [11.5, 33],
  });

  const typeDelivery = () => {
    if (detail.delivery_type == "free") {
      return (
        <p
          className="text"
          style={{ display: "flex", alignItems: "center", color: "#4c9e4c" }}
        >
          <img
            src={DeliveryMan}
            alt="Delivery Man"
            style={{ width: "30px", height: "30px" }}
          />
          &nbsp; delivery:&nbsp; ${detail.delivery_type}
        </p>
      );
    } else if (detail.delivery_type == "paid") {
      return (
        <p
          className="text"
          style={{ display: "flex", alignItems: "center", color: " #cb2f28" }}
        >
          <img
            src={DeliveryMan}
            alt="Delivery Man"
            style={{ width: "30px", height: "30px" }}
          />
          &nbsp; delivery:&nbsp; ${detail.delivery_type}
        </p>
      );
    }
  };

  //console.log(detail);
  //console.log("cart", cart);

  return (
    <Row id="page-food-info">
      <Col className="image" xl="auto" lg="auto" md="auto" xs="auto" sm="auto">
        <Row className="carousel-image shadow-sm rounded-sm">
          <Carousel>
            <Carousel.Item>
              <img
                className="shadow-sm rounded-sm"
                src={
                  detail.PlateImages.length === 0
                    ? foodNotFound
                    : detail.PlateImages[0]?.url
                }
                alt={detail.name}
              />
            </Carousel.Item>
          </Carousel>
        </Row>
        <Row className="about shadow-sm rounded-sm">
          <h5>About</h5>
          <p>{detail.description}</p>
        </Row>
      </Col>
      <Col className="info" xl="auto" lg="auto" md="auto" xs="auto" sm="auto">
        <Row className="box1 shadow-sm rounded-sm">
          <div className="price">
            <span className="value">${detail.price}</span>
            &nbsp;&nbsp;
            <p className="text">{detail.delivery_time} min</p>
          </div>
          <div className="input-price">
            {typeDelivery()}
            <Form.Control
              className="input"
              type="number"
              min={1}
              placeholder="Quantity"
              name="quantity"
              onChange={handleInputChange}
            />
          </div>
          <Button
            className="button"
            type="submit"
            onClick={handleNextPageRequest}
          >
            Add to cart
          </Button>
        </Row>
        <Row className="box2 shadow-sm rounded-sm">
          <div className="info-chef">
            <Link
              to={{
                pathname: `/food/profile-chef/${detail.chef.id}`,
                state: {
                  detail: detail.chef,
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
            <Link
              className="name-chef"
              to={{
                pathname: `/food/profile-chef/${detail.chef.id}`,
                state: {
                  detail: detail.chef,
                },
              }}
            >
              <h6>Meet your chef</h6>

              {detail.chef.name}
            </Link>
          </div>
          <div className="details-chef">
            <p>{detail.bio || "This chef does not contain any description."}</p>
          </div>
        </Row>
        <Row className="box3 shadow-sm rounded-sm">
          <Map
            center={[detail.chef.location_lat, detail.chef.location_lon]}
            zoom={15}
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
