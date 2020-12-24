import React, { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

// Redux e Auth
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import { removeCart } from "../../store/ducks/cart/actions";

// Types
import { Cart } from "../../store/ducks/cart/types";

//Message
import { useSnackbar } from "notistack";

// Bootstrap
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

// Components
import PayPal from "../PayPal";

// Icons
import { MdDelete } from "react-icons/md";

import "./styles.scss";

const InfoFood: React.FC = () => {
  const cart: Cart[] = useSelector((state: RootStateOrAny) => state.cart.cart);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  //States
  const [totalPrice, setTotalPrice] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    restaurant_name: "",
    password: "",
    user_type: "",
    token: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    //console.log(event.target);

    setFormData({ ...formData, [name]: value });
  };

  const handleDeleteItem = (id: number) => {
    dispatch(removeCart(id));
    enqueueSnackbar("Food removed", {
      variant: "info",
    });
  };

  const AmountPrice = () => {};

  const paymentHandler = (details: any, data: any) => {
    /** Here you can call your backend API
      endpoint and update the database */

    console.log(details, data);
  };

  return (
    <Container id="content-add-to-cart">
      <Col className="body" xl="auto" lg="auto" md="auto" xs="auto" sm="auto">
        <Row className="row">
          <h2>Details</h2>
        </Row>
        {cart.length === 0 && (
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

        {cart.length > 0 &&
          cart.map((item: any) => (
            <>
              <Row className="title">
                <p>
                  <Link
                    to={{
                      pathname: `/food/food/${item.name}`,
                      state: {
                        detail: item,
                      },
                    }}
                  >
                    {item.name}
                  </Link>
                  &nbsp; by &nbsp;
                  <Link
                    to={{
                      pathname: `/food/profile-chef/${item.chef.name}`,
                      state: {
                        detail: item,
                      },
                    }}
                  >
                    {item.chef.restaurant_name}
                  </Link>
                </p>
                <MdDelete
                  className="icon"
                  size={18}
                  onClick={() => handleDeleteItem(item.id)}
                />
              </Row>
              <Row className="row">
                <div className="box1">
                  <div className="price">
                    <p style={{ display: "flex" }}>Price: </p>
                    <p>${item.price}</p>
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
                      <p>${item.price * item.quantity}</p>
                    </div>
                  )}
                </div>
              </Row>
            </>
          ))}
        <Row className="total-price">
          <p className="value">Total:</p>
          &nbsp;&nbsp;
          <span className="value">${totalPrice}</span>
        </Row>
      </Col>
      <Col className="payment" xl="6" lg="6" md="6" xs="6" sm="6">
        <Form className="form">
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="text">Address 1</Form.Label>
            <Form.Control
              className="input"
              name="email"
              type="text"
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label className="text">Address 2 </Form.Label>
            <Form.Control
              className="input"
              name="token"
              type="text"
              onChange={handleInputChange}
            />
          </Form.Group>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Form.Group>
              <Form.Label className="text">Country</Form.Label>
              <Form.Control
                className="input"
                name="name"
                type="text"
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label className="text">State</Form.Label>
              <Form.Control
                className="input"
                name="password"
                type="password"
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </div>

          <PayPal amount={200} currency={"USD"} onSuccess={paymentHandler} />

          <Button className="button" type="submit">
            Checkout
          </Button>
        </Form>
      </Col>
    </Container>
  );
};

export default InfoFood;
