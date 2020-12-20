import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useHistory } from "react-router-dom";

// Redux e Auth
import { useSelector, RootStateOrAny } from "react-redux";
import { useDispatch } from "react-redux";
import { updateUser, removeUser } from "../../store/ducks/user/actions";
import { removeToken } from "../../store/ducks/token/actions";

// Types
import { UserDelivery } from "../../store/ducks/userDelivery/types";
import { TokenDelivery } from "../../store/ducks/tokenDelivery/types";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

//Message
import { useSnackbar } from "notistack";

// Icons
import { FaInfoCircle } from "react-icons/fa";

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
  const [countries, setCountries] = useState([]);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [formData, setFormData] = useState({
    address_code: 0,
    phone_number: user.phone_no ? user.phone_no : undefined,
    bank_code: "",
    branch_code: "",
    account_number: "",
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

  console.log(countries);

  const handleInputChangeCountry = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    console.log(event.target.value);

    setFormData({ ...formData, [name]: value });
    setShow(true);
  };

  const handleInputChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    //console.log(event.target);

    setFormData({ ...formData, [name]: value });
  };

  const VerifyPhone = () => {
    const { phone_number } = formData;

    const body = {
      phone_no: String(phone_number),
    };

    //const proxyurl = "https://afternoon-brook-18118.herokuapp.com/";
    const url = "https://mycheffy.herokuapp.com/";

    api
      .put(url + `/user/verify-phone/?userId=${user.id}`, body, {
        headers: { Authorization: token },
      })
      .then((response) => {
        const data = response.data;
        //console.log(data);

        //dispatch(updateUser(data));
        setShow(false);
        setShow1(true);

        enqueueSnackbar("User updated successfully!", {
          variant: "success",
        });
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar("Failed to update.", { variant: "error" });
      });
  };

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
        <h2
          style={{
            display: "flex",
            alignItems: "center",
            color: "#3c3c3c",
          }}
        >
          Payout preferences
        </h2>
        <Card className="card1">
          <Card.Body className="card-body1">
            <Form className="form">
              {user.verification_phone_status === "pending" && (
                <>
                  <Form.Group className="country">
                    <Form.Label className="text">Phone number*</Form.Label>
                    <p>
                      <FaInfoCircle color="gray" />
                      &nbsp;&nbsp;The phone number should start with the country
                      code, for example "+81 8 1234 2345".
                    </p>
                    <div className="camp">
                      <Form.Control
                        className="select-country"
                        as="select"
                        name="address_code"
                        value={formData.address_code}
                        onChange={handleInputChangeCountry}
                      >
                        <option>Select a country code</option>
                        {countries.map((country: any) => (
                          <option
                            key={country.name}
                            value={country.callingCodes[0]}
                          >
                            {country.name}&nbsp;(
                            {country.alpha2Code}
                            )&nbsp;&nbsp;&nbsp;&nbsp;+{country.callingCodes[0]}
                          </option>
                        ))}
                      </Form.Control>
                      <Form.Control
                        className="input-phone"
                        name="phone_number"
                        type="text"
                        value={formData.phone_number}
                        onChange={handleInputChange}
                      />
                    </div>
                  </Form.Group>
                  {show && <Button className="button">Verify phone</Button>}
                  {show1 && (
                    <>
                      <Form.Group>
                        <Form.Label className="text">Access Token </Form.Label>
                        <Form.Control
                          className="input"
                          name="token"
                          type="text"
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                      <Button className="button">Verify token</Button>
                    </>
                  )}
                </>
              )}

              {show2 && (
                <>
                  <Form.Group>
                    <Form.Label className="text">Cardholder Names </Form.Label>
                    <Form.Control
                      className="input"
                      name="token"
                      type="text"
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="text">Card Number </Form.Label>
                    <Form.Control
                      className="input"
                      name="token"
                      type="text"
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="text">Expirition Date </Form.Label>
                    <Form.Control
                      className="input"
                      name="token"
                      type="text"
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="text">CVV/CVC </Form.Label>
                    <Form.Control
                      className="input"
                      name="token"
                      type="text"
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Button className="button2">Save my credentials</Button>
                </>
              )}
            </Form>
          </Card.Body>
        </Card>
      </Row>
    </Col>
  );
};

export default FormPayment;
