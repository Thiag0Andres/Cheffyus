import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

// Redux e Auth
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import { removeCart } from "../../store/ducks/cart/actions";

// Types
import { UserDelivery } from "../../store/ducks/userDelivery/types";
import { TokenDelivery } from "../../store/ducks/tokenDelivery/types";
import { Cart } from "../../store/ducks/cart/types";

//Message
import { useSnackbar } from "notistack";

// Bootstrap
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

// leaflet
import { Map, TileLayer, Marker } from "react-leaflet";
import Leaflet, { LeafletMouseEvent } from "leaflet";
import "leaflet/dist/leaflet.css";

// Components
import PayPal from "../PayPal";
import Loading from "../../layout/Loading";

// Icons
import { MdDelete } from "react-icons/md";

// Images
import markerMap from "../../images/markerMap.png";

import api from "../../services/api";

import "./styles.scss";

const InfoFood: React.FC = () => {
  const user: UserDelivery = useSelector(
    (state: RootStateOrAny) => state.userDelivery.userDelivery
  );
  const cart: Cart[] = useSelector((state: RootStateOrAny) => state.cart.cart);
  const token: TokenDelivery = useSelector(
    (state: RootStateOrAny) => state.tokenDelivery.tokenDelivery.tokenDelivery
  );

  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  //States
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [subTotalPrice, setSubTotalPrice] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [transactionFee, setTransactionFee] = useState(0);
  const [items, setItems] = useState<Array<any>>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    Number(user.location_lat) ? Number(user.location_lat) : 0,
    Number(user.location_lon) ? Number(user.location_lon) : 0,
  ]);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    restaurant_name: "",
    password: "",
    user_type: "",
    token: "",
  });

  useEffect(() => {
    setLoading(true);
    const url = "https://mycheffy.herokuapp.com/basket/?deliveryType=driver";

    api
      .get(url, {
        headers: {
          "x-access-token": token,
          "content-type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        //console.log("basket", data);

        setItems(data.items);
        setTotalPrice(data.total);
        setSubTotalPrice(data.sub_total);
        setDeliveryFee(data.delivery_fee);
        setTransactionFee(data.transaction_fee);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [items]);

  // Marker do map
  const mapIcon = Leaflet.icon({
    iconUrl: markerMap,
    iconSize: [23, 33],
    iconAnchor: [11.5, 33],
  });

  const handleInputChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    //console.log(event.target);

    setFormData({ ...formData, [name]: value });
  };

  const handleDeleteItem = (id: number) => {
    const url = `https://mycheffy.herokuapp.com/basket/subtract/${id}`;

    const body = { deliveryType: "driver" };

    api
      .put(url, body, {
        headers: {
          "x-access-token": token,
          "content-type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        //console.log("subtract basket item", data);

        enqueueSnackbar("Food removed", {
          variant: "info",
        });
      })
      .catch((error) => {
        console.log(error);
      });

    dispatch(removeCart(id));
  };

  const ConfirmationOrder = () => {
    const url = "https://mycheffy.herokuapp.com/order";

    const body = {
      deliveryType: deliveryFee > 0 ? "driver" : "user",
      paymentType: "cod",
    };

    api
      .post(url, body, {
        headers: {
          "x-access-token": token,
          "content-type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        //console.log("Order", data);

        history.push("/success-payment");

        enqueueSnackbar(response.data.message, {
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

  const paymentHandler = (details: any, data: any) => {
    /** Here you can call your backend API
      endpoint and update the database */
    console.log(details, data);
    ConfirmationOrder();
  };

  return (
    <Container id="content-add-to-cart">
      <Col
        className="address"
        xl="auto"
        lg="auto"
        md="auto"
        xs="auto"
        sm="auto"
      >
        <Row className="row">
          <h2>Delivery Address</h2>
        </Row>
        <Card className="card">
          <Card.Body className="card-body">
            <div className="map">
              <Map center={initialPosition} zoom={14}>
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker icon={mapIcon} position={initialPosition}></Marker>
              </Map>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col className="body" xl="auto" lg="auto" md="auto" xs="auto" sm="auto">
        <Row className="row">
          <h2>Details</h2>
        </Row>
        <Row>{loading && <Loading />}</Row>

        {!loading && items.length === 0 && (
          <Row className="row">
            <div className="box1">
              <div className="price">
                <p style={{ display: "flex" }}>Price: </p>
                <p>$0</p>
              </div>
              <div className="price">
                Quantity:
                <p>0</p>
              </div>
              <div className="price">
                <p className="text">Subtotal:</p>
                <p>$0</p>
              </div>
            </div>
          </Row>
        )}

        {!loading &&
          items.length > 0 &&
          items.map((item: any) => (
            <div key={item.basketItemId}>
              <Row className="title">
                <p>
                  <Link
                    to={{
                      pathname: `/food/food/${item.plate.id}`,
                      state: {
                        detail: item.plate,
                      },
                    }}
                  >
                    {item.plate.name}
                  </Link>
                  &nbsp; by &nbsp;
                  <Link
                    to={{
                      pathname: `/food/profile-chef/${item.plate.chef.id}`,
                      state: {
                        detail: item.plate.chef,
                      },
                    }}
                  >
                    {item.plate.chef.restaurant_name}
                  </Link>
                </p>
                <MdDelete
                  className="icon"
                  size={18}
                  onClick={() => handleDeleteItem(item.basketItemId)}
                />
              </Row>
              <Row className="row">
                <div className="box1">
                  <div className="price">
                    <p style={{ display: "flex" }}>Price: </p>
                    <p>${item.plate.price}</p>
                  </div>
                  {item.quantity > 0 && (
                    <div className="price">
                      Quantity:
                      <p>{item.quantity}</p>
                    </div>
                  )}
                  {item.quantity > 0 && (
                    <div className="price">
                      <p className="text">Subtotal:</p>
                      <p>${item.plate.price * item.quantity}</p>
                    </div>
                  )}
                </div>
              </Row>
            </div>
          ))}
        <Row className="subtotal-price">
          <p className="text">Subtotal:</p>
          &nbsp;&nbsp;
          <p className="text">${subTotalPrice}</p>
        </Row>
        <Row className="delivery-price">
          <p className="text">Delivery fee:</p>
          &nbsp;&nbsp;
          <p className="text">${deliveryFee}</p>
        </Row>
        <Row className="delivery-price">
          <p className="text">Transaction fee:</p>
          &nbsp;&nbsp;
          <p className="text">${transactionFee}</p>
        </Row>
        <Row className="total-price">
          <p className="value">Total:</p>
          &nbsp;&nbsp;
          <span className="value">${totalPrice}</span>
        </Row>
      </Col>
      <Col
        className="payment"
        xl="auto"
        lg="auto"
        md="auto"
        xs="auto"
        sm="auto"
      >
        {totalPrice !== 0 && (
          <Form className="form">
            <Button className="button2">Payment with Stripe</Button>
            <PayPal
              amount={totalPrice}
              currency={"USD"}
              onSuccess={paymentHandler}
            />
            {/* 
          <Button className="button" type="submit">
            Checkout
          </Button> */}
          </Form>
        )}
      </Col>
    </Container>
  );
};

export default InfoFood;
