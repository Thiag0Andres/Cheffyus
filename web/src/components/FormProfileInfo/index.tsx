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

const FormProfileInfo: React.FC = () => {
  // States
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  // Marker do map
  const mapIcon = Leaflet.icon({
    iconUrl: markerMap,
    iconSize: [23, 33],
    iconAnchor: [11.5, 33],
  });

  return (
    <>
      <Row id="content-profile-info">
        <Col className="body" xl="auto" lg="auto" md="auto" xs="auto" sm="auto">
          <Form className="form">
            <Form.Group>
              <Form.Label className="text">First name</Form.Label>
              <Form.Control className="input" type="text" />
            </Form.Group>

            <Form.Group>
              <Form.Label className="text">
                Last name <p>(only first letter shown to other users)</p>
              </Form.Label>
              <Form.Control className="input" type="text" />
            </Form.Group>

            <Form.Group>
              <Form.Label className="text">Display name</Form.Label>
              <p>
                <FaInfoCircle size={16} color="#3c3c3c" /> If you represent an
                organization, you can use its name as your display name. Display
                name is shown to other users instead of your first and last
                name.
              </p>
              <Form.Control className="input" type="text" />
            </Form.Group>

            <Form.Group>
              <Form.Label className="text">Username</Form.Label>
              <p>
                <FaInfoCircle size={16} color="#3c3c3c" />
                Your username is used as part of the unique URL of your profile
                page. You can only use letters and numbers for your username,
                without spaces. When you change your username, your URL will
                automatically change and your previous URL will not be
                redirected. The old username will become available for other
                users.
              </p>
              <Form.Control className="input" type="text" />
            </Form.Group>

            <Form.Group>
              <Form.Label className="text">
                Location
                <p> (used only as a default when creating a new listing) </p>
              </Form.Label>
              <p>
                <FaInfoCircle color="#3c3c3c" />
                You can provide either your street address or only a city or
                zip/postal code. It’s good to also add your country when adding
                your location. Examples: "10117 Berlin, Germany" or "2000 Sand
                Hill Road, CA, USA".
              </p>
              <Form.Control className="input" type="text" />
              <div className="map">
                <Map center={initialPosition} zoom={12}>
                  <TileLayer
                    url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                  />
                </Map>
              </div>
            </Form.Group>

            <Form.Group>
              <Form.Label className="text"> Phone number </Form.Label>
              <Form.Control className="input" type="text" />
            </Form.Group>
            <Form.Group>
              <Form.Label className="text"> Profile picture </Form.Label>
              <p>
                <FaInfoCircle size={16} color="#3c3c3c" />
                The profile picture should be in a square format (1:1 ratio),
                for example, 800x800 pixels. Otherwise, it will be cropped to
                fit.
              </p>
              <Container className="images">
                <Row>
                  <Col xs={6} md={4}>
                    <Form.Control className="image" type="file" />
                  </Col>
                </Row>
              </Container>
            </Form.Group>

            <Form.Group>
              <Form.Label className="text"> About you </Form.Label>
              <p style={{ display: "flex", alignItems: "center" }}>
                <FaInfoCircle size={16} color="#3c3c3c" /> You can
                <Button className="button1">
                  format your description using Markdown.
                </Button>
              </p>
              <Form.Control className="textarea" as="textarea" rows={3} />
            </Form.Group>

            <Button className="button2" type="submit">
              Save information
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default FormProfileInfo;
