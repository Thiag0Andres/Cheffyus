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
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// leaflet
import { Map, TileLayer, Marker } from "react-leaflet";
import Leaflet, { LeafletMouseEvent } from "leaflet";
import "leaflet/dist/leaflet.css";

//Message
import { useSnackbar } from "notistack";

// Icons
import { FaInfoCircle } from "react-icons/fa";

// Images
import markerMap from "../../images/markerMap.png";

import axios from "axios";
import api from "../../services/api";

import "./styles.scss";

const FormShipping: React.FC = () => {
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
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [formData, setFormData] = useState({
    addressLine1: "",
    addressLine2: "",
    country: "",
    state: "",
    city: "",
    zipcode: "",
    deliveryNote: "",
  });

  // Chamada a api
  useEffect(() => {
    const url = "https://restcountries.eu/rest/v2/";

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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setSelectedPosition([latitude, longitude]);
    });
  }, []);

  // Marker do map
  const mapIcon = Leaflet.icon({
    iconUrl: markerMap,
    iconSize: [23, 33],
    iconAnchor: [11.5, 33],
  });

  const handleMapClick = (event: LeafletMouseEvent) => {
    setSelectedPosition([event.latlng.lat, event.latlng.lng]);
  };

  const handleInputChangeCountry = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    //console.log(event.target);

    setFormData({ ...formData, [name]: value });
  };

  const handleInputChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    console.log(event.target.value);

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const {
      addressLine1,
      addressLine2,
      state,
      city,
      zipcode,
      deliveryNote,
    } = formData;

    const body = {
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      city: city,
      state: state,
      zipCode: zipcode,
      lat: selectedPosition[0],
      lon: selectedPosition[1],
      deliveryNote: deliveryNote,
      isDefaultAddress: true,
    };

    if (body.lat !== 0 && body.lat !== 0) {
      const url = "https://mycheffy.herokuapp.com/";

      api
        .post(url + "shipping", body, {
          headers: {
            "x-access-token": token,
            "content-type": "application/json",
          },
        })
        .then((response) => {
          const data = response.data;

          console.log(data);

          enqueueSnackbar(response.data.message, { variant: "success" });
          setFormData({
            addressLine1: "",
            addressLine2: "",
            country: "",
            state: "",
            city: "",
            zipcode: "",
            deliveryNote: "",
          });
        })
        .catch((error) => {
          console.log(error);
          enqueueSnackbar(error.response.data.message, { variant: "error" });
        });
    } else {
      enqueueSnackbar("You must select a location on the map.", {
        variant: "error",
      });
    }
  };

  return (
    <Col
      id="content-form-shipping"
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
          Delivery address
        </h2>
        <Card className="card1">
          <Card.Body className="card-body1">
            <Form className="form" onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label className="text">Address 1*</Form.Label>
                <Form.Control
                  className="input"
                  name="addressLine1"
                  type="text"
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="text">Address 2</Form.Label>
                <Form.Control
                  className="input"
                  name="addressLine2"
                  type="text"
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="text">Country*</Form.Label>
                <Form.Control
                  className="select-country"
                  as="select"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChangeCountry}
                  required
                >
                  <option>Select a country</option>
                  {countries.map((country: any) => (
                    <option>{country.name}</option>
                  ))}
                </Form.Control>
              </Form.Group>

              <div className="groupSC">
                <Form.Group>
                  <Form.Label className="text">State*</Form.Label>
                  <Form.Control
                    className="input-state"
                    name="state"
                    type="text"
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="text">City*</Form.Label>
                  <Form.Control
                    className="input-city"
                    name="city"
                    type="text"
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </div>

              <Form.Group>
                <Form.Label className="text">Zipcode*</Form.Label>
                <Form.Control
                  className="input"
                  name="zipcode"
                  type="text"
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="text">Location</Form.Label>
                <p>
                  <FaInfoCircle color="#3c3c3c" />
                  &nbsp; To complete the registration of the address you must
                  select / click on the map your location for greater precision
                  at the time of delivery.
                </p>

                <div className="map">
                  <Map
                    center={selectedPosition}
                    zoom={12}
                    onClick={handleMapClick}
                  >
                    <TileLayer
                      url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                    />
                    <Marker icon={mapIcon} position={selectedPosition}></Marker>
                  </Map>
                </div>
              </Form.Group>

              <Form.Group>
                <Form.Label className="text">Add delivery note:</Form.Label>
                <Form.Control
                  className="textarea"
                  as="textarea"
                  rows={3}
                  name="deliveryNote"
                  type="text"
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Button className="button" type="submit" onClick={handleSubmit}>
                Save
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Row>
    </Col>
  );
};

export default FormShipping;
