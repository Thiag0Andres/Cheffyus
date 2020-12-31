import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useHistory } from "react-router-dom";

// Redux e Auth
import { useSelector, RootStateOrAny } from "react-redux";
import { useDispatch } from "react-redux";
import { updateUserDelivery } from "../../store/ducks/userDelivery/actions";

// Types
import { UserDelivery } from "../../store/ducks/userDelivery/types";
import { TokenDelivery } from "../../store/ducks/tokenDelivery/types";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

//Message
import { useSnackbar } from "notistack";

// Icons
import { FaInfoCircle } from "react-icons/fa";

import axios from "axios";
import api from "../../services/api";

import "./styles.scss";

interface Order {
  OrderItems: any;
  basketId: number;
  chefId: number;
  id: number;
  order_total: number;
  state_type: string;
  total_items: number;
}

interface Chef {
  name: string;
}

const FormOrderDetailsFood: React.FC = () => {
  const user: UserDelivery = useSelector(
    (state: RootStateOrAny) => state.userDelivery.userDelivery
  );
  const token: TokenDelivery = useSelector(
    (state: RootStateOrAny) => state.tokenDelivery.tokenDelivery.tokenDelivery
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  // States
  const [countries, setCountries] = useState([]);
  const [show, setShow] = useState(true);
  const [show2, setShow2] = useState(false);
  const [ordersList, setOrdersList] = useState<Array<any>>([]);
  const [selectOrder, setSelectOrder] = useState<Order>();
  const [chef, setChef] = useState<Chef>();

  const [formData, setFormData] = useState({});

  // Chamada a api
  useEffect(() => {
    const url = "https://restcountries.eu/rest/v2/";
    const ordersUrl = "https://mycheffy.herokuapp.com/order/list";
    //console.log("oi");
    axios
      .get(url + "all")
      .then((response) => {
        //console.log(response.data);

        setCountries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    //API to get the all orders for this user and will show that order list below
    api
      .get(ordersUrl, {
        headers: {
          "x-access-token": token,
          "content-type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        //console.log(data.data);
        setOrdersList(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const GetChefInformations = (id: any) => {
    const url = "https://mycheffy.herokuapp.com/";

    api
      .get(url + `user/details/${id}`)
      .then((response) => {
        const data = response.data;
        //console.log(data);

        setChef(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //console.log(chef);

  const handleInputChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    //console.log(event.target);

    setFormData({ ...formData, [name]: value });
  };

  return (
    <Col
      id="content-order-detail"
      xl="auto"
      lg="auto"
      md="auto"
      xs="auto"
      sm="auto"
    >
      <Row className="body">
        <h2
          style={{
            display: "flex",
            alignItems: "center",
            color: "#3c3c3c",
          }}
        >
          Orders Details
        </h2>
        <Card className="card">
          <Card.Body className="card-body">
            {show && (
              <Form className="form">
                <Form.Group className="country">
                  <Form.Label className="text">Order*</Form.Label>
                  <p>
                    <FaInfoCircle color="gray" />
                    &nbsp;&nbsp;Select order to track the status.
                  </p>
                  <div className="camp">
                    <Form.Control
                      className="select-country"
                      as="select"
                      name="country_code"
                      onChange={handleInputChange}
                      required
                    >
                      <option>Select a Order</option>
                      {ordersList &&
                        ordersList.length > 0 &&
                        ordersList.map((order: any) => (
                          <option
                            key={order.id}
                            value={order.id}
                            onClick={() => {
                              setSelectOrder(order);
                              GetChefInformations(order.chefId);
                            }}
                          >
                            Order {selectOrder?.basketId}
                          </option>
                        ))}
                    </Form.Control>
                  </div>
                </Form.Group>
                <Button
                  className="button"
                  type="button"
                  onClick={() => {
                    setShow(false);
                    setShow2(true);
                  }}
                >
                  Search
                </Button>
              </Form>
            )}
            {show2 && selectOrder && (
              <Card.Body className="card-body">
                <Container className="details">
                  <Row className="infoTitle">
                    <h2 className="title">Order {selectOrder?.basketId}</h2>
                    <Row className="infoRow">
                      <h3>Status:</h3>&nbsp;&nbsp;
                      <p className="status">{selectOrder?.state_type}</p>
                    </Row>
                  </Row>

                  <Row className="infoRow">
                    <h3>Chef Name:</h3>&nbsp;&nbsp;
                    <p>{chef?.name}</p>
                  </Row>
                  <Row className="infoRow">
                    <h3>Price: </h3>&nbsp;&nbsp; ${selectOrder?.order_total}
                  </Row>
                  <Row className="infoCol">
                    <h3>Items:</h3>
                    {selectOrder?.OrderItems.map((item: any) => (
                      <div className="item">
                        <Row className="infoRow">
                          <h3>Name:</h3>&nbsp;&nbsp;
                          <p>{item.name}</p>
                        </Row>
                        <Row className="infoCol">
                          <h3>Description: </h3>
                          {item.description}
                        </Row>
                        <Row className="infoRow">
                          <h3>Quantity:</h3>&nbsp;&nbsp;
                          <p>{item.quantity}</p>
                        </Row>
                        <Row className="infoRow">
                          <h3>Amount:</h3>&nbsp;&nbsp;
                          <p>{item.amount}</p>
                        </Row>
                      </div>
                    ))}
                  </Row>
                  <Button
                    className="button2"
                    onClick={() => {
                      setShow(true);
                      setShow2(false);
                    }}
                  >
                    Select other order
                  </Button>
                </Container>
              </Card.Body>
            )}
          </Card.Body>
        </Card>
      </Row>
    </Col>
  );
};

export default FormOrderDetailsFood;
