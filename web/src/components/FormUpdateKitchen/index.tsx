import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
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

interface CategoriesItems {
  id: number;
  description: string;
  title: string;
  createdAt: string;
  updatedAt: string;
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

interface Props {
  detail: any;
}

const FormUpdateKitchen: React.FC<Props> = ({ detail }) => {
  const user: User = useSelector((state: RootStateOrAny) => state.user.user);
  const token: Token = useSelector(
    (state: RootStateOrAny) => state.token.token.token
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const provider = new OpenStreetMapProvider();

  // States
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [categorySelect, setCategorySelect] = useState("");
  const [category_id, setCategoryId] = useState(Number());
  const [categories, setCategories] = useState<CategoriesItems[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    Number(detail.kitchen.location_lat),
    Number(detail.kitchen.location_lon),
  ]);
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    Number(detail.kitchen.location_lat),
    Number(detail.kitchen.location_lon),
  ]);
  const [formData, setFormData] = useState({
    user_id: detail.user.id,
    name: detail.kitchen.name,
    price_per_time: detail.kitchen.price_per_time,
    time_type: detail.kitchen.time_type,
    description: detail.kitchen.description,
    image_urls: [String(detail.kitchen.image_urls)],
    date_month: "00",
    date_day: "00",
    date_year: "0000",
    status: detail.kitchen.status,
    likes: detail.kitchen.likes,
  });

  useEffect(() => {
    const proxyurl = "https://afternoon-brook-18118.herokuapp.com/";
    const url = "https://cheffyus-api.herokuapp.com/";

    api
      .get(proxyurl + url + "/categories/", {
        headers: { Authorization: token },
      })
      .then((response) => {
        const data = response.data;

        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar("Failed to get categories.", { variant: "error" });
      });
  }, []);

  useEffect(() => {
    sliceDate();
  }, []);

  const sliceDate = () => {
    const month = detail.kitchen.expireDate.slice(0, 2);
    //console.log(month);
    const day = detail.kitchen.expireDate.slice(3, 5);
    //console.log(day);
    const year = detail.kitchen.expireDate.slice(6, 10);
    //console.log(year);

    setFormData({
      ...formData,
      date_month: month,
      date_day: day,
      date_year: year,
    });
  };

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
    //console.log(event.target.value);

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

  const AddKitchen = () => {
    const {
      user_id,
      name,
      price_per_time,
      time_type,
      description,
      image_urls,
      date_month,
      date_day,
      date_year,
      status,
      likes,
    } = formData;

    const body = {
      user_id: user_id,
      name: name,
      description: description,
      image_urls: image_urls,
      price_per_time: price_per_time,
      time_type: time_type,
      category_id: category_id,
      expireDate: date_month + "/" + date_day + "/" + date_year,
      status: status,
      likes: likes,
      location_lat: selectedPosition[0],
      location_lon: selectedPosition[1],
    };

    const proxyurl = "https://afternoon-brook-18118.herokuapp.com/";
    const url = "https://cheffyus-api.herokuapp.com/";

    api
      .put(proxyurl + url + `kitchens/${detail.kitchen.id}`, body, {
        headers: { Authorization: token },
      })
      .then(() => {
        history.push("/settings");
        enqueueSnackbar("Kitchen successfully updated!", {
          variant: "success",
        });
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar("Failed to updated.", { variant: "error" });
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

          const url_image = String(response.data.url);

          setFormData({
            ...formData,
            image_urls: [url_image],
          });

          AddKitchen();
        })
        .catch((error) => {
          console.log(error);
          enqueueSnackbar("Failed to load image.", { variant: "error" });
        });
    } else {
      AddKitchen();
    }
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
                Listing type: {categorySelect}
              </Button>
              <Form className="form" onSubmit={handleSubmit}>
                <Form.Label className="text">Kitchen title*</Form.Label>
                <Form.Control
                  className="input"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />

                <Form.Label className="text">Price</Form.Label>
                <Form.Group className="price">
                  <Form.Control
                    className="input-price"
                    type="text"
                    placeholder="0"
                    name="price_per_time"
                    value={formData.price_per_time}
                    onChange={handleInputChange}
                  />
                  &nbsp;&nbsp;&nbsp;
                  <div className="per">
                    <span>$</span>
                    &nbsp;&nbsp;&nbsp;
                    <p>per</p>
                  </div>
                  &nbsp;&nbsp;&nbsp;
                  <Form.Control
                    className="select"
                    as="select"
                    placeholder="hour"
                    name="time_type"
                    value={formData.time_type}
                    onChange={handleInputChange}
                  >
                    <option>hour</option>
                    <option>day</option>
                    <option>week</option>
                    <option>month</option>
                    <option>Year</option>
                  </Form.Control>
                </Form.Group>

                <Form.Label className="text">Detailed description</Form.Label>
                <div className="description">
                  <p>
                    <FaInfoCircle color="gray" />
                    &nbsp;&nbsp;If your description contains YouTube links, the
                    videos will be shown below the description.
                  </p>
                </div>
                <Form.Control
                  className="textarea"
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />

                <Form.Label className="text">
                  Expiration date*
                  <Button className="button4">What's this?</Button>
                </Form.Label>
                <Form.Group className="date">
                  <Form.Control
                    className="select-month"
                    as="select"
                    name="date_month"
                    value={formData.date_month}
                    onChange={handleInputChange}
                  >
                    <option>Select a month</option>
                    <option>01</option>
                    <option>02</option>
                    <option>03</option>
                    <option>04</option>
                    <option>05</option>
                    <option>06</option>
                    <option>07</option>
                    <option>08</option>
                    <option>09</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                  </Form.Control>

                  <Form.Control
                    className="select-day"
                    as="select"
                    name="date_day"
                    value={formData.date_day}
                    onChange={handleInputChange}
                  >
                    <option>Select a day</option>
                    <option>01</option>
                    <option>02</option>
                    <option>03</option>
                    <option>04</option>
                    <option>05</option>
                    <option>06</option>
                    <option>07</option>
                    <option>08</option>
                    <option>09</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                    <option>17</option>
                    <option>18</option>
                    <option>19</option>
                    <option>20</option>
                    <option>21</option>
                    <option>22</option>
                    <option>23</option>
                    <option>24</option>
                    <option>25</option>
                    <option>26</option>
                    <option>27</option>
                    <option>28</option>
                    <option>29</option>
                    <option>30</option>
                    <option>31</option>
                  </Form.Control>

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

                <Form.Group>
                  <Form.Label className="text">Location*</Form.Label>

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
                      <Marker
                        icon={mapIcon}
                        position={selectedPosition}
                      ></Marker>
                    </Map>
                  </div>
                </Form.Group>

                <Form.Label className="text">Image</Form.Label>
                <div className="description">
                  <p>
                    <FaInfoCircle color="gray" />
                    &nbsp;&nbsp; For best results, use JPG, GIF or PNG images
                    that are 660x440 pixels
                  </p>
                </div>
                <UploadFile onUpload={handleUpload} />
                {!!uploadedFiles.length && <FileList file={uploadedFiles[0]} />}
                <Button
                  className="button5"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Post listing
                </Button>
              </Form>
            </>
          )}
          {show1 && (
            <>
              <br />
              <h2>Select listing type</h2>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  className="button1"
                  type="submit"
                  onClick={() => {
                    setShow1(false);
                    setShow2(true);
                    setShow3(true);
                    setCategorySelect(category.title);
                    setCategoryId(category.id);
                  }}
                >
                  {category.title}
                </Button>
              ))}
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default FormUpdateKitchen;
