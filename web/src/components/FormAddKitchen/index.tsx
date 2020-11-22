import React, { useState, ChangeEvent, FormEvent } from "react";
import { useHistory } from "react-router-dom";

// Redux e Auth
import { useSelector, RootStateOrAny } from "react-redux";
import { useDispatch } from "react-redux";

// Types
import { User } from "../../store/ducks/user/types";
import { Token } from "../../store/ducks/token/types";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

//Message
import { useSnackbar } from "notistack";

// leaflet
import { Map, TileLayer, Marker } from "react-leaflet";
import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";

// Icons
import { FaInfoCircle } from "react-icons/fa";

// Images
import markerMap from "../../images/markerMap.png";

import api from "../../services/api";

import "./styles.scss";

const FormAddKitchen: React.FC = () => {
  const user: User = useSelector((state: RootStateOrAny) => state.user.user);
  const token: Token = useSelector(
    (state: RootStateOrAny) => state.token.token.token
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  // States
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [textSelect, setTextSelect] = useState("");
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [formData, setFormData] = useState({
    user_id: user.id,
    name: "",
    price_per_time: 0,
    time_type: "",
    description: "",
    image_urls: [],
    category_id: 1,
    expireDate: " ",
    status: "opened",
    likes: 0,
    location_lat: 0,
    location_lon: 0,
  });

  const text = [
    "Offering without online payment",
    "Offering with online payment",
  ];

  // Marker do map
  const mapIcon = Leaflet.icon({
    iconUrl: markerMap,
    iconSize: [23, 33],
    iconAnchor: [11.5, 33],
  });

  const handleInputChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    console.log(event.target);

    setFormData({ ...formData, [name]: value });
  };

  const AddKitchen = (event: FormEvent) => {
    event.preventDefault();

    const {
      user_id,
      name,
      price_per_time,
      time_type,
      description,
      image_urls,
      category_id,
      expireDate,
      status,
      likes,
      location_lat,
      location_lon,
    } = formData;

    const body = {
      user_id: user_id,
      name: name,
      description: description,
      image_urls: [image_urls],
      price_per_time: price_per_time,
      time_type: time_type,
      category_id: category_id,
      expireDate: expireDate,
      status: status,
      likes: likes,
      location_lat: location_lat,
      location_lon: location_lon,
    };

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://cheffyus-api.herokuapp.com/";

    api
      .post(proxyurl + url + "kitchens", body, {
        headers: { Authorization: token },
      })

      .then((response) => {
        const data = response.data;

        history.push("/");
        enqueueSnackbar("Kitchen successfully registered!", {
          variant: "success",
        });
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar("Failed to register.", { variant: "error" });
      });
  };

  return (
    <>
      <Row id="content-add-kitchen">
        <Col className="body" xl="auto" lg="auto" md="auto" xs="auto" sm="auto">
          {show2 && (
            <Button
              className="button2"
              type="submit"
              onClick={() => {
                setShow1(true);
                setShow2(false);
                setShow3(false);
              }}
            >
              Category: Default category
            </Button>
          )}
          {show3 && (
            <>
              <Button
                className="button2"
                type="submit"
                onClick={() => {
                  setShow2(true);
                  setShow3(false);
                  setShow1(true);
                }}
              >
                Listing type: {textSelect}
              </Button>
              <Form className="form" onSubmit={AddKitchen}>
                <Form.Label className="text">Listing title*</Form.Label>
                <Form.Control
                  className="input"
                  type="text"
                  name="name"
                  onChange={handleInputChange}
                />

                <Form.Label className="text">Price</Form.Label>
                <Form.Group className="price">
                  <Form.Control
                    className="input-price"
                    type="text"
                    placeholder="0"
                    name="price_per_time"
                    onChange={handleInputChange}
                  />
                  <div className="per">
                    <span>$</span>
                    <p>per</p>
                  </div>

                  <Form.Control
                    className="select"
                    as="select"
                    placeholder="hour"
                    name="time_type"
                    onChange={handleInputChange}
                  >
                    <option>hour</option>
                    <option>day</option>
                    <option>night</option>
                    <option>week</option>
                    <option>month</option>
                    <option>Year</option>
                  </Form.Control>
                </Form.Group>

                <Form.Label className="text">Detailed description</Form.Label>
                <div className="description">
                  <p>
                    <FaInfoCircle color="gray" />
                    &nbsp;&nbsp; You can
                    <Button className="button3">
                      format your description using Markdown.
                    </Button>
                    If your description contains YouTube links, the videos will
                    be shown below the description.
                  </p>
                </div>
                <Form.Control
                  className="textarea"
                  as="textarea"
                  rows={3}
                  name="description"
                  onChange={handleInputChange}
                />

                <Form.Label className="text">
                  Expiration date*
                  <Button className="button4">What's this?</Button>
                </Form.Label>
                <Form.Group className="date">
                  <Form.Control
                    className="select-year"
                    as="select"
                    name="expireDate"
                    onChange={handleInputChange}
                  >
                    <option>2020</option>
                    <option>2021</option>
                  </Form.Control>

                  <Form.Control
                    className="select-month"
                    as="select"
                    name="expireDate"
                    onChange={handleInputChange}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>

                  <Form.Control
                    className="select-day"
                    as="select"
                    name="expireDate"
                    onChange={handleInputChange}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                </Form.Group>

                <Form.Label className="text">Location*</Form.Label>
                <Form.Control
                  className="input"
                  type="loaction"
                  name="location"
                  onChange={handleInputChange}
                />

                <div className="map">
                  <Map center={initialPosition} zoom={12}>
                    <TileLayer
                      url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                    />
                  </Map>
                </div>

                <Form.Label className="text">Image</Form.Label>
                <div className="description">
                  <p>
                    <FaInfoCircle color="gray" />
                    &nbsp;&nbsp; For best results, use JPG, GIF or PNG images
                    that are 660x440 pixels
                  </p>
                </div>
                <Container className="images">
                  <Row>
                    <Col xs={6} md={4}>
                      <Form.Control
                        className="image"
                        type="file"
                        name="image_urls"
                        onChange={handleInputChange}
                      />
                    </Col>
                    <Col xs={6} md={4}>
                      <Form.Control
                        className="image"
                        type="file"
                        name="image_urls"
                        onChange={handleInputChange}
                      />
                    </Col>
                    <Col xs={6} md={4}>
                      <Form.Control
                        className="image"
                        type="file"
                        name="image_urls"
                        onChange={handleInputChange}
                      />
                    </Col>
                  </Row>
                </Container>

                <Button className="button5" type="submit" onClick={AddKitchen}>
                  Post listing
                </Button>
              </Form>
            </>
          )}
          {show1 && (
            <>
              <h2>Select listing type</h2>
              <Button
                className="button1"
                type="submit"
                onClick={() => {
                  setShow1(false);
                  setShow2(true);
                  setShow3(true);
                  setTextSelect(text[0]);
                }}
              >
                {text[0]}
              </Button>
              <Button
                className="button1"
                type="submit"
                onClick={() => {
                  setShow1(false);
                  setShow2(true);
                  setShow3(true);
                  setTextSelect(text[1]);
                }}
              >
                {text[1]}
              </Button>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default FormAddKitchen;
