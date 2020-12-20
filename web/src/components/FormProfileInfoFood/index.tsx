import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useHistory } from "react-router-dom";

// Redux e Auth
import { useSelector, RootStateOrAny } from "react-redux";
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/ducks/user/actions";

// Types
import { UserDelivery } from "../../store/ducks/userDelivery/types";
import { TokenDelivery } from "../../store/ducks/tokenDelivery/types";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

//Message
import { useSnackbar } from "notistack";

//Upload Images
import filesize from "filesize";
import UploadFile from "../../components/UploadFile";
import FileList from "../../components/FileList";

// Images
import userNotfound from "../../images/user.png";

// Icons
import { FaInfoCircle } from "react-icons/fa";

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

const FormProfileInfoFood: React.FC = () => {
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
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    display_name: user.name[0].toUpperCase(),
    phone_no: user.phone_no ? user.phone_no : undefined,
    bio: user.bio ? user.bio : undefined,
  });

  const handleInputChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
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

  //console.log(uploadedFiles[0]);

  const UpdateUser = (url_image: any) => {
    const { name, email, phone_no, bio } = formData;

    const body = {
      name: name,
      email: email,
      bio: bio ? bio : undefined,
      imagePath: url_image ? url_image : undefined,
      phone_no: String(phone_no),
    };

    const url = "https://mycheffy.herokuapp.com/";

    api
      .put(url + `users/edit/?userId=${user.id}`, body, {
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
        .post(proxyurl + url + `/images/`)
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
      <Row id="content-profile-info-food">
        <Col className="body" xl="auto" lg="auto" md="auto" xs="auto" sm="auto">
          <Form className="form" onSubmit={handleSubmit}>
            <Form.Group className="image-profile">
              <img
                src={user.imagePath === null ? userNotfound : user.imagePath}
                alt={user.name}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="text">Name</Form.Label>
              <Form.Control
                className="input"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="text">Email</Form.Label>
              <Form.Control
                className="input"
                name="email"
                type="text"
                value={formData.email}
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
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="text"> Phone number </Form.Label>
              <Form.Control
                className="input"
                name="phone_number"
                type="text"
                value={formData.phone_no}
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

export default FormProfileInfoFood;
