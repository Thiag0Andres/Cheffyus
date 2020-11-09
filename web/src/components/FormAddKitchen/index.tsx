import React, { useState } from "react";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

// leaflet
import { Map, TileLayer, Marker } from "react-leaflet";
import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";

// Icons
import { FaInfoCircle } from "react-icons/fa";

// Images
import markerMap from "../../images/markerMap.png";

import "./styles.scss";

const FormAddKitchen: React.FC = () => {
  // States
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [textSelect, setTextSelect] = useState("");
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

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

  return (
    <>
      <Row id="content-add-kitchen">
        <Col className="body">
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
              <Form className="form">
                <Form.Label className="text">Listing title*</Form.Label>
                <Form.Control className="input" type="title" />

                <Form.Label className="text">Price</Form.Label>
                <Form.Group className="price">
                  <Form.Control
                    className="input-price"
                    type="price"
                    placeholder="0"
                  />
                  <div className="per">
                    <span>$</span>
                    <p>per</p>
                  </div>

                  <Form.Control
                    className="select"
                    as="select"
                    placeholder="hour"
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
                  <FaInfoCircle color="gray" />
                  <p>
                    You can{" "}
                    <Button className="button3">
                      format your description using Markdown.
                    </Button>
                    If your description contains YouTube links, the videos will
                    be shown below the description.
                  </p>
                </div>
                <Form.Control className="textarea" as="textarea" rows={3} />

                <Form.Label className="text">
                  Expiration date*{" "}
                  <Button className="button4">What's this?</Button>
                </Form.Label>
                <Form.Group className="date">
                  <Form.Control className="select-year" as="select">
                    <option>2020</option>
                    <option>2021</option>
                  </Form.Control>

                  <Form.Control className="select-month" as="select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>

                  <Form.Control className="select-day" as="select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                </Form.Group>

                <Form.Label className="text">Location*</Form.Label>
                <Form.Control className="input" type="loaction" />

                <div className="map">
                  <Map center={initialPosition} zoom={12}>
                    <TileLayer
                      url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                    />
                  </Map>
                </div>

                <Form.Label className="text">Image</Form.Label>
                <div className="description-image">
                  <FaInfoCircle color="gray" />
                  <p>
                    For best results, use JPG, GIF or PNG images that are
                    660x440 pixels
                  </p>
                </div>
                <Container className="images">
                  <Row>
                    <Col xs={6} md={4}>
                      <Form.Control className="image" type="file" />
                    </Col>
                    <Col xs={6} md={4}>
                      <Form.Control className="image" type="file" />
                    </Col>
                    <Col xs={6} md={4}>
                      <Form.Control className="image" type="file" />
                    </Col>
                  </Row>
                </Container>

                <Button className="button5" type="submit">
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
