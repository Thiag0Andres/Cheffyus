import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useHistory } from "react-router-dom";

// Redux e Auth
import { useSelector, RootStateOrAny } from "react-redux";
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/ducks/user/actions";

// Types
import { User } from "../../store/ducks/user/types";
import { Token } from "../../store/ducks/token/types";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import AsyncSelect from "react-select/async";

//Message
import { useSnackbar } from "notistack";

// leaflet
import { Map, TileLayer, Marker } from "react-leaflet";
import Leaflet, { LeafletMouseEvent } from "leaflet";
import "leaflet/dist/leaflet.css";

// Leaflet GeoSearch
import { OpenStreetMapProvider } from "leaflet-geosearch";

//Upload Images
import filesize from "filesize";
import UploadFile from "../../components/UploadFile";
import FileList from "../../components/FileList";

// Icons
import { FaInfoCircle } from "react-icons/fa";

// Images
import markerMap from "../../images/markerMap.png";

import api from "../../services/api";

import "./styles.scss";

interface UploadFile {
  file: any;
  name: string;
  readableSize: string;
  preview: string;
  progress: number;
  uploaded: boolean;
  error: boolean;
  url: string;
}

interface File {
  name: string;
  path: string;
  size: number;
}
interface result {
  x: number; // lon
  y: number; // lat
  label: string; // formatted address
  bounds: [
    [number, number], // south, west - lat, lon
    [number, number] // north, east - lat, lon
  ];
  raw: any; // raw provider result
}

const FormProfileInfo: React.FC = () => {
  const user: User = useSelector((state: RootStateOrAny) => state.user.user);
  const token: Token = useSelector(
    (state: RootStateOrAny) => state.token.token.token
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const provider = new OpenStreetMapProvider();

  // States
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    display_name:
      user.first_name[0].toUpperCase() + user.last_name[0].toUpperCase(),
    username: user.first_name.toLowerCase() + user.last_name[0].toLowerCase(),
    phone_number: user.phone_number ? user.phone_number : undefined,
    bio: user.bio ? user.bio : undefined,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
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

  const loadOptions = async (inputValue: string, callback: any) => {
    const results = await provider.search({ query: inputValue });

    callback(
      results.map((event) => {
        return {
          value: [event.y, event.x],
          label: event.label,
        };
      })
    );
  };

  const handleInputSelectChange = (event: any) => {
    //console.log(event);
    //setSelectedOption(event);
  };

  const handleInputChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSelectedOption = (e: any) => {
    if (e && e.value) {
      setSelectedPosition(e.value);
      setInitialPosition(e.value);
    }
  };

  const handleUpload = (files: []) => {
    if (files.length <= 1) {
      const upload: any = files.map((file: File) => ({
        file,
        name: file.name,
        readableSize: filesize(file.size),
        preview: URL.createObjectURL(file),
        progress: 0,
        uploaded: false,
        error: false,
        url: null,
      }));
      setUploadedFiles(upload);

      //processUpload(upload[0]);
    } else {
      enqueueSnackbar("You can only select one photo!", {
        variant: "warning",
      });
    }
  };

  const UpdateUser = (url_image: any) => {
    const {
      first_name,
      last_name,
      display_name,
      username,
      phone_number,
      bio,
    } = formData;

    const body = {
      first_name: first_name,
      last_name: last_name,
      display_name: display_name,
      username: username,
      bio: bio ? bio : undefined,
      image_url: url_image ? url_image : undefined,
      phone_number: String(phone_number),
      location_lat: selectedPosition[0],
      location_lon: selectedPosition[1],
    };

    const proxyurl = "https://afternoon-brook-18118.herokuapp.com/";
    const url = "https://cheffyus-api.herokuapp.com/";

    api
      .put(proxyurl + url + `/users/${user.id}`, body, {
        headers: { Authorization: token },
      })
      .then((response) => {
        const data = response.data;
        //console.log(data);

        dispatch(updateUser(data));

        enqueueSnackbar("User updated successfully!", {
          variant: "success",
        });
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar("Failed to update.", { variant: "error" });
      });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (uploadedFiles[0]) {
      const body = new FormData();

      body.append("file", uploadedFiles[0].file);

      const proxyurl = "https://afternoon-brook-18118.herokuapp.com/";
      const url = "https://cheffyus-api.herokuapp.com/";

      api
        .post(proxyurl + url + `/images/`, body, {
          headers: { Authorization: token },
        })
        .then((response) => {
          //console.log(response.data);

          const url_image = response.data.url;

          UpdateUser(url_image);
        })
        .catch((error) => {
          console.log(error);
          enqueueSnackbar("Failed to load image.", { variant: "error" });
        });
    } else {
      UpdateUser(null);
    }
  };

  return (
    <>
      <Row id="content-profile-info">
        <Col className="body" xl="auto" lg="auto" md="auto" xs="auto" sm="auto">
          <Form className="form" onSubmit={handleSubmit}>
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

              <AsyncSelect
                name="selectedOption"
                cacheOptions
                loadOptions={loadOptions}
                onChange={(e) => handleSelectedOption(e)}
                defaultOptions
                placeholder=" "
                onInputChange={handleInputSelectChange}
              />

              <div className="map">
                <Map
                  center={initialPosition}
                  zoom={13}
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
              <UploadFile onUpload={handleUpload} />
              {!!uploadedFiles.length && <FileList file={uploadedFiles[0]} />}
            </Form.Group>

            <Form.Group>
              <Form.Label className="text"> About you </Form.Label>
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

            <Button className="button2" type="submit" onClick={handleSubmit}>
              Save information
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default FormProfileInfo;
