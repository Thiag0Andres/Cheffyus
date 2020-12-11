import React, { ChangeEvent, FormEvent, useState } from "react";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// leaflet
import { Map, TileLayer, Marker } from "react-leaflet";
import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";

// Icons
import { MdPhoneIphone } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";

// Images
import markerMap from "../../images/markerMap.png";

import "./styles.scss";

const FormContact: React.FC = () => {
  // Marker do map
  const mapIcon = Leaflet.icon({
    iconUrl: markerMap,
    iconSize: [23, 33],
    iconAnchor: [11.5, 33],
  });

  return (
    <Row id="content-contact-us">
      <Col className="body">
        <div className="information">
          <MdPhoneIphone size={50} className="icon" />
          <p className="text">(+1) 703 909 3859 (USA)</p>
          <FaMapMarkedAlt size={50} className="icon" />
          <p className="text">
            8133 Leesburg Pike Old Courthouse <br /> Providence, VA <br />
            Cheffy Group
          </p>
        </div>
        <div className="map">
          <Map center={[38.9153279, -77.2288846]} zoom={15}>
            <TileLayer
              url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
            />
            <Marker icon={mapIcon} position={[38.9153279, -77.2288846]} />
          </Map>
        </div>
      </Col>
    </Row>
  );
};

export default FormContact;
