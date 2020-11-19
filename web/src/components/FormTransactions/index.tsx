import React, { useState } from "react";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";

// leaflet
import { Map, TileLayer, Marker } from "react-leaflet";
import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";

// Icons
import { FaInfoCircle } from "react-icons/fa";

// Images
import markerMap from "../../images/markerMap.png";

import "./styles.scss";

const FormTransactions: React.FC = () => {
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
      <Col
        id="content-form-transactions"
        xl="auto"
        lg="auto"
        md="auto"
        xs="auto"
        sm="auto"
      >
        <Row className="body">
          <h2>Transactions</h2>
          <Form className="form">
            <Form.Control
              className="input"
              type="text"
              placeholder="Search for a transaction title or other party involved"
            />
            <Dropdown className="input-dropdown">
              <Dropdown.Toggle id="dropdown-basic">All statues</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Open</Dropdown.Item>
                <Dropdown.Item>Closed</Dropdown.Item>
                <Dropdown.Item>Expired</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <div className="buttons">
              <Button className="button1" type="submit">
                Search
              </Button>
              <Button className="button2">Show all</Button>
            </div>
          </Form>
        </Row>
      </Col>
    </>
  );
};

export default FormTransactions;
