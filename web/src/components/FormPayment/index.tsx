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
import { TiPencil } from "react-icons/ti";

import axios from "axios";
import api from "../../services/api";

import "./styles.scss";

const FormPayment: React.FC = () => {
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
  const [cards, setCards] = useState<Array<any>>([]);
  const [countries, setCountries] = useState([]);
  const [show, setShow] = useState(true);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(true);
  const [show4, setShow4] = useState(false);
  const [formData, setFormData] = useState({
    country_code: "",
    phone_no: user.phone_no ? user.phone_no : undefined,
    sms_token: "",
    number: "",
    exp_month: 0,
    exp_year: 0,
    holder: "",
    cvc: 0,
  });

  // Chamada a api
  useEffect(() => {
    const url = "https://restcountries.eu/rest/v2/";
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
  }, []);

  //console.log(countries);

  // Chamada a api
  useEffect(() => {
    const url = "https://mycheffy.herokuapp.com/";

    api
      .get(url + "card", {
        headers: {
          "x-access-token": token,
          "content-type": "application/json",
        },
      })
      .then((response) => {
        //console.log(response.data);

        setCards(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    //console.log(event.target);

    setFormData({ ...formData, [name]: value });
  };

  const VerifyPhone = (event: FormEvent) => {
    event.preventDefault();

    const { country_code, phone_no } = formData;

    const body = {
      country_code: `+${String(country_code)}`,
      phone_no: String(phone_no),
    };

    const url = "https://mycheffy.herokuapp.com/";

    api
      .post(url + "user/verify-phone", body, {
        headers: {
          "x-access-token": token,
          "content-type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        console.log(data);

        //dispatch(updateUserDelivery(data));

        setShow(false);
        setShow2(true);
        setShow3(false);
        setShow4(true);
        enqueueSnackbar(response.data.message, { variant: "success" });
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      });
  };

  const ConfirmPhone = (event: FormEvent) => {
    event.preventDefault();

    const { sms_token } = formData;

    const body = {
      sms_token: String(sms_token),
    };

    const url = "https://mycheffy.herokuapp.com/";

    api
      .post(url + "user/confirmphone", body, {
        headers: {
          "x-access-token": token,
          "content-type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        console.log(data);

        //dispatch(updateUserDelivery(data));

        setShow(false);
        setShow2(true);
        setShow3(true);
        setShow4(false);
        enqueueSnackbar(response.data.message, { variant: "success" });
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      });
  };

  const AddUserCard = (event: FormEvent) => {
    event.preventDefault();

    const { holder, number, exp_month, exp_year, cvc } = formData;

    const body = {
      holder: String(holder),
      number: String(number),
      exp_month: Number(exp_month),
      exp_year: Number(exp_year),
      cvc: Number(cvc),
    };

    const url = "https://mycheffy.herokuapp.com/";

    api
      .post(url + "card", body, {
        headers: {
          "x-access-token": token,
          "content-type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        console.log(data);

        //dispatch(updateUserDelivery(data));
        setShow(true);
        setShow2(false);
        setShow3(true);
        setShow4(false);
        enqueueSnackbar(response.data.message, { variant: "success" });
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      });
  };

  //console.log(user);

  return (
    <Col
      id="content-form-payment"
      xl="auto"
      lg="auto"
      md="auto"
      xs="auto"
      sm="auto"
    >
      <Row className="body">
        {show && (
          <>
            <div className="header">
              <h2
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "#3c3c3c",
                }}
              >
                Payout preferences
              </h2>
              <Button
                className="button"
                onClick={() => {
                  setShow(false);
                  setShow2(true);
                }}
              >
                + Add card
              </Button>
            </div>
            {cards.length > 0 ? (
              <Card className="card">
                <Card.Body className="card-body">
                  {cards?.map((card: any) => (
                    <ul key={card.id}>
                      <li>
                        <Container className="details">
                          <Row className="infoTitle">
                            <h2 className="title"></h2>
                          </Row>
                          <Row className="infoCol"></Row>
                          <Row className="infoCol">
                            <h3>Address Line 2</h3>
                          </Row>
                          <Row className="infoRow">
                            <h3>Zipcode:</h3>&nbsp;&nbsp;
                          </Row>
                          <Row className="infoCol">
                            <h3>Delivery Note</h3>
                          </Row>
                        </Container>
                      </li>
                    </ul>
                  ))}
                </Card.Body>
              </Card>
            ) : (
              <h2
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#3c3c3c",
                }}
              >
                No card registered, you need to add one!
              </h2>
            )}
          </>
        )}

        {show2 && (
          <>
            <div className="header">
              <h2
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "#3c3c3c",
                }}
              >
                Payout preferences
              </h2>
              <Button
                className="button"
                onClick={() => {
                  setShow(true);
                  setShow2(false);
                }}
              >
                Cancel
              </Button>
            </div>

            <Card className="card">
              <Card.Body className="card-body">
                <Form className="form">
                  {user.verification_phone_status === "pending" && (
                    <>
                      <Form.Group className="country">
                        <Form.Label className="text">Phone number*</Form.Label>
                        <p>
                          <FaInfoCircle color="gray" />
                          &nbsp;&nbsp;The phone number should start with the
                          country code, for example "+81 8 1234 2345".
                        </p>
                        <div className="camp">
                          <Form.Control
                            className="select-country"
                            as="select"
                            name="country_code"
                            onChange={handleInputChange}
                            required
                          >
                            <option>Select a country code</option>
                            {countries.map((country: any) => (
                              <option
                                key={country.name}
                                value={country.callingCodes[0]}
                              >
                                {country.name}&nbsp;(
                                {country.alpha2Code}
                                )&nbsp;&nbsp;&nbsp;&nbsp;+
                                {country.callingCodes[0]}
                              </option>
                            ))}
                          </Form.Control>
                          <Form.Control
                            className="input-phone"
                            name="phone_no"
                            type="text"
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </Form.Group>
                      {show3 && (
                        <Button
                          className="button2"
                          type="submit"
                          onClick={VerifyPhone}
                        >
                          Verify phone
                        </Button>
                      )}
                      {show4 && (
                        <>
                          <Form.Group>
                            <p>
                              You will soon receive an SMS with a confirmation
                              token. After confirming your cell phone number,
                              you can add a card. Cheffy Group.
                            </p>
                            <Form.Label className="text">
                              Access Token{" "}
                            </Form.Label>
                            <Form.Control
                              className="input"
                              name="sms_token"
                              type="text"
                              onChange={handleInputChange}
                              required
                            />
                          </Form.Group>
                          <Button
                            className="button2"
                            type="submit"
                            onClick={ConfirmPhone}
                          >
                            Verify token
                          </Button>
                        </>
                      )}
                    </>
                  )}

                  {user.verification_phone_status === "verified" && (
                    <>
                      <Form.Group>
                        <Form.Label className="text">
                          Cardholder Names
                        </Form.Label>
                        <Form.Control
                          className="input"
                          name="holder"
                          type="text"
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label className="text">Card Number</Form.Label>
                        <Form.Control
                          className="input"
                          name="number"
                          type="number"
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>

                      <Form.Group>
                        <Form.Label className="text">
                          Expiration date
                        </Form.Label>
                        <div className="date">
                          <Form.Control
                            className="select-month"
                            as="select"
                            name="exp_month"
                            onChange={handleInputChange}
                            required
                          >
                            <option>Select a month</option>
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                            <option>04</option>
                            <option>05</option>
                            <option>06</option>
                            <option>07</option>
                            <option>08</option>
                            <option>09</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                          </Form.Control>

                          <Form.Control
                            className="select-year"
                            as="select"
                            name="exp_year"
                            onChange={handleInputChange}
                            required
                          >
                            <option>Select a year</option>
                            <option>2020</option>
                            <option>2021</option>
                            <option>2022</option>
                            <option>2023</option>
                            <option>2024</option>
                            <option>2025</option>
                            <option>2026</option>
                            <option>2027</option>
                            <option>2028</option>
                            <option>2029</option>
                            <option>2030</option>
                          </Form.Control>
                        </div>
                      </Form.Group>

                      <Form.Group>
                        <Form.Label className="text">CVV/CVC</Form.Label>
                        <Form.Control
                          className="input"
                          name="cvc"
                          type="password"
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>

                      <Button
                        className="button3"
                        type="submit"
                        onClick={AddUserCard}
                      >
                        Save my credentials
                      </Button>
                    </>
                  )}
                </Form>
              </Card.Body>
            </Card>
          </>
        )}
      </Row>
    </Col>
  );
};

export default FormPayment;
