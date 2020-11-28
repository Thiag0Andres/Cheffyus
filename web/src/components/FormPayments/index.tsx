import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useHistory } from "react-router-dom";

// Redux e Auth
import { useSelector, RootStateOrAny } from "react-redux";
import { useDispatch } from "react-redux";
import { updateUser, removeUser } from "../../store/ducks/user/actions";
import { removeToken } from "../../store/ducks/token/actions";

// Types
import { User } from "../../store/ducks/user/types";
import { Token } from "../../store/ducks/token/types";

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

const FormPayments: React.FC = () => {
  const user: User = useSelector((state: RootStateOrAny) => state.user.user);
  const token: Token = useSelector(
    (state: RootStateOrAny) => state.token.token.token
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  // States
  const [countries, setCountries] = useState([]);
  const [show, setShow] = useState(false);
  const [days, setDays] = useState<String[]>([
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
  ]);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    date_day: "00",
    date_month: "00",
    date_year: "0000",
    address_country: "",
    address_zipcode: "",
    address_state: "",
    address_city: "",
    address_street: "",
    phone_number: "",
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
        console.log(response.data);
        setCountries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleInputChangeCountry = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    //console.log(event.target);

    setFormData({ ...formData, [name]: value });
    setShow(true);
  };

  const handleInputChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    //console.log(event.target);

    setFormData({ ...formData, [name]: value });
  };

  const Preferences = (event: FormEvent) => {
    event.preventDefault();

    const {
      first_name,
      last_name,
      date_day,
      date_month,
      date_year,
      address_country,
      address_zipcode,
      address_state,
      address_city,
      address_street,
      phone_number,
      bank_code,
      branch_code,
      account_number,
    } = formData;

    const body = {
      first_name: first_name,
      last_name: last_name,
      birth_date: date_month + "/" + date_day + "/" + date_year,
      address_country: address_country,
      address_zipcode: address_zipcode,
      address_state: address_state,
      address_city: address_city,
      address_street: address_street,
      phone_number: phone_number,
      iban: bank_code + "," + branch_code + "," + account_number,
    };

    const proxyurl = "https://afternoon-brook-18118.herokuapp.com/";
    const url = "https://cheffyus-api.herokuapp.com/";

    api
      .post(proxyurl + url + "preferences", body, {
        headers: { Authorization: token },
      })
      .then((response) => {
        const data = response.data;

        const updatedUser = {
          user: { ...user, preferences_id: data.id },
        };

        dispatch(updateUser(updatedUser));

        enqueueSnackbar("Email added successfully!", {
          variant: "success",
        });
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar("Failed to add email.", { variant: "error" });
      });
  };

  return (
    <Col
      id="content-form-payments"
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
        <br />
        <p>We need some information about you to be able to send you money.</p>
        <Card className="card1">
          <Card.Body className="card-body1">
            <Form className="form">
              <Form.Group className="group1">
                <div className="box1">
                  <Form.Label className="text">First name*</Form.Label>
                  <Form.Control
                    className="input"
                    name="first_name"
                    type="text"
                    value={formData.first_name}
                    onChange={handleInputChange}
                  />
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div className="box2">
                  <Form.Label className="text">Last name*</Form.Label>
                  <Form.Control
                    className="input"
                    name="last_name"
                    type="text"
                    value={formData.last_name}
                    onChange={handleInputChange}
                  />
                </div>
              </Form.Group>

              <Form.Label className="text">Birth date*</Form.Label>
              <Form.Group className="date">
                <Form.Control
                  className="select-day"
                  as="select"
                  name="date_day"
                  value={formData.date_day}
                  onChange={handleInputChange}
                >
                  <option>Select a day</option>
                  {days.map((day) => (
                    <option>{day}</option>
                  ))}
                </Form.Control>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Form.Control
                  className="select-month"
                  as="select"
                  name="date_month"
                  value={formData.date_month}
                  onChange={handleInputChange}
                >
                  <option>Select a month</option>
                  <option>January</option>
                  <option>February</option>
                  <option>March</option>
                  <option>April</option>
                  <option>May</option>
                  <option>June</option>
                  <option>July</option>
                  <option>August</option>
                  <option>September</option>
                  <option>October</option>
                  <option>November</option>
                  <option>December</option>
                </Form.Control>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Form.Control
                  className="select-year"
                  as="select"
                  name="date_year"
                  value={formData.date_year}
                  onChange={handleInputChange}
                >
                  <option>Select a year</option>
                  <option>2020</option>
                  <option>2021</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="country">
                <Form.Label className="text">Country of residence*</Form.Label>
                <Form.Control
                  className="select-country"
                  as="select"
                  name="address_country"
                  value={formData.address_country}
                  onChange={handleInputChangeCountry}
                >
                  <option>Select a country</option>
                  {countries.map((country: any) => (
                    <option>{country.name}</option>
                  ))}
                </Form.Control>
              </Form.Group>

              {show && (
                <>
                  <Form.Group className="country">
                    <Form.Label className="text">Postal code*</Form.Label>
                    <Form.Control
                      className="input"
                      name="address_zipcode"
                      type="text"
                      value={formData.address_zipcode}
                      onChange={handleInputChange}
                    />
                    <p></p>
                    <Form.Label className="text">State*</Form.Label>
                    <Form.Control
                      className="input"
                      name="first_name"
                      type="text"
                      value={formData.address_state}
                      onChange={handleInputChange}
                    />
                    <p></p>
                    <Form.Label className="text">City*</Form.Label>
                    <Form.Control
                      className="input"
                      name="address_city"
                      type="text"
                      value={formData.address_city}
                      onChange={handleInputChange}
                    />
                    <p></p>
                    <Form.Label className="text">Street address*</Form.Label>
                    <Form.Control
                      className="input"
                      name="address_street"
                      type="text"
                      value={formData.address_street}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <br />
                  <Form.Group>
                    <Form.Label className="text">Phone number*</Form.Label>
                    <p>
                      <FaInfoCircle color="gray" />
                      &nbsp;&nbsp;The phone number should start with the country
                      code, for example "+81 8 1234 2345".
                    </p>
                    <Form.Control
                      className="input"
                      name="phone_number"
                      type="text"
                      value={formData.phone_number}
                      onChange={handleInputChange}
                    />
                    <p></p>
                    <Form.Label className="text">Bank code*</Form.Label>
                    <Form.Control
                      className="input"
                      name="bank_code"
                      type="text"
                      value={formData.bank_code}
                      onChange={handleInputChange}
                    />
                    <p></p>
                    <Form.Label className="text">Branch code*</Form.Label>
                    <Form.Control
                      className="input"
                      name="branch_code"
                      type="text"
                      value={formData.branch_code}
                      onChange={handleInputChange}
                    />
                    <p></p>
                    <Form.Label className="text">Account number*</Form.Label>
                    <Form.Control
                      className="input"
                      name="account_number"
                      type="text"
                      value={formData.account_number}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <p></p>
                  <p>
                    By adding your payout details you accept the Stripe
                    Connected Account Agreement.
                  </p>
                  <p></p>

                  <Button
                    className="button"
                    type="submit"
                    //onClick={handleSubmit}
                  >
                    Save details
                  </Button>
                </>
              )}
            </Form>
          </Card.Body>
        </Card>
      </Row>
    </Col>
  );
};

export default FormPayments;
