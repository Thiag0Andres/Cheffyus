import React, { useState, ChangeEvent, FormEvent } from "react";
import { useHistory } from "react-router-dom";

// Redux e Auth
import { useSelector, RootStateOrAny } from "react-redux";
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/ducks/user/actions";

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

const FormProfileInfo: React.FC = () => {
  const user: User = useSelector((state: RootStateOrAny) => state.user.user);
  const token: Token = useSelector(
    (state: RootStateOrAny) => state.token.token.token
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  // States
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    display_name:
      user.first_name[0].toUpperCase() + user.last_name[0].toUpperCase(),
    username: user.first_name.toLowerCase() + user.last_name[0].toLowerCase(),
    location: [user.location_lat, user.location_lon],
    phone_number: user.phone_number,
    image_url: user.image_url,
    bio: user.bio,
  });

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

  const UpdateUser = (event: FormEvent) => {
    event.preventDefault();

    const {
      first_name,
      last_name,
      display_name,
      username,
      location,
      phone_number,
      image_url,
      bio,
    } = formData;

    const body = {
      first_name: first_name,
      last_name: last_name,
      display_name: display_name,
      username: username,
      bio: bio,
      image_url: image_url,
      phone_number: phone_number,
      location_lat: 0,
      location_lon: 0,
    };

    const proxyurl = "https://afternoon-brook-18118.herokuapp.com/";
    const url = "https://cheffyus-api.herokuapp.com/";

    api
      .put(proxyurl + url + `/users/${user.id}`, body, {
        headers: { Authorization: token },
      })
      .then((response) => {
        const data = response.data;
        console.log(data);

        dispatch(updateUser(data));

        history.push("/settings");
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
    <>
      <Row id="content-profile-info">
        <Col className="body" xl="auto" lg="auto" md="auto" xs="auto" sm="auto">
          <Form className="form" onSubmit={UpdateUser}>
            <Form.Group>
              <Form.Label className="text">First name</Form.Label>
              <Form.Control
                className="input"
                name="first_name"
                type="text"
                value={formData.first_name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="text">
                Last name &nbsp;&nbsp;
                <p>(only first letter shown to other users)</p>
              </Form.Label>
              <Form.Control
                className="input"
                name="last_name"
                type="text"
                value={formData.last_name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="text">Display name</Form.Label>
              <p>
                <FaInfoCircle color="#3c3c3c" />
                &nbsp; If you represent an organization, you can use its name as
                your display name. Display name is shown to other users instead
                of your first and last name.
              </p>
              <Form.Control
                className="input"
                name="display_name"
                type="text"
                value={formData.display_name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="text">Username</Form.Label>
              <p>
                <FaInfoCircle color="#3c3c3c" />
                &nbsp; Your username is used as part of the unique URL of your
                profile page. You can only use letters and numbers for your
                username, without spaces. When you change your username, your
                URL will automatically change and your previous URL will not be
                redirected. The old username will become available for other
                users.
              </p>
              <Form.Control
                className="input"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="text">
                Location &nbsp;&nbsp;
                <p> (used only as a default when creating a new listing) </p>
              </Form.Label>
              <p>
                <FaInfoCircle color="#3c3c3c" />
                &nbsp; You can provide either your street address or only a city
                or zip/postal code. It’s good to also add your country when
                adding your location. Examples: "10117 Berlin, Germany" or "2000
                Sand Hill Road, CA, USA".
              </p>
              <Form.Control
                className="input"
                name="loacation"
                type="text"
                onChange={handleInputChange}
              />
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
              <Form.Control
                className="input"
                name="phone_number"
                type="text"
                value={formData.phone_number}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="text"> Profile picture </Form.Label>
              <p>
                <FaInfoCircle color="#3c3c3c" />
                &nbsp; The profile picture should be in a square format (1:1
                ratio), for example, 800x800 pixels. Otherwise, it will be
                cropped to fit.
              </p>
              <Container className="images">
                <Row>
                  <Col xs={6} md={4}>
                    <Form.Control
                      className="image"
                      type="file"
                      name="image_url"
                      onChange={handleInputChange}
                    />
                  </Col>
                </Row>
              </Container>
            </Form.Group>

            <Form.Group>
              <Form.Label className="text"> About you </Form.Label>
              <p style={{ display: "flex", alignItems: "center" }}>
                <FaInfoCircle size={16} color="#3c3c3c" />
                &nbsp; You can
                <Button className="button1">
                  format your description using Markdown.
                </Button>
              </p>
              <Form.Control
                className="textarea"
                as="textarea"
                rows={3}
                name="bio"
                type="text"
                value={formData.bio}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button className="button2" type="submit" onClick={UpdateUser}>
              Save information
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default FormProfileInfo;
