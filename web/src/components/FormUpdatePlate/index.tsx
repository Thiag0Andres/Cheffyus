import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useHistory } from "react-router-dom";

// Redux e Auth
import { useSelector, RootStateOrAny } from "react-redux";
import { ApplicationState } from "../../store";

// Types
import { UserDelivery } from "../../store/ducks/userDelivery/types";
import { TokenDelivery } from "../../store/ducks/tokenDelivery/types";

// Bootstrap
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

//Message
import { useSnackbar } from "notistack";

//Upload Images
import filesize from "filesize";
import UploadFile from "../../components/UploadFile";
import FileList from "../../components/FileList";

// Icons
import { FaInfoCircle } from "react-icons/fa";

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

interface Props {
  detail: any;
}

const FormUpdatePlate: React.FC<Props> = ({ detail }) => {
  const user: UserDelivery = useSelector(
    (state: ApplicationState) => state.userDelivery.userDelivery
  );
  const token: TokenDelivery = useSelector(
    (state: RootStateOrAny) => state.tokenDelivery.tokenDelivery.tokenDelivery
  );
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  // States
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);
  const [categories, setCategories] = useState<Array<any>>([]);
  const [selectedItems, setSelectedItems] = useState<Array<string>>([]);
  const [deliveryType, setDeliveryType] = useState<Array<any>>([
    { id: 1, description: "Free Delivery", value: "free" },
    { id: 2, description: "Paid Delivery", value: "paid" },
  ]);
  const [formData, setFormData] = useState({
    name: detail.name,
    description: detail.description,
    price: detail.price,
    delivery_time: detail.delivery_time,
    delivery_time_max: "",
    categoryId: detail.category.id,
  });

  useEffect(() => {
    setSelectedItems(detail.delivery_type);
  }, []);

  console.log(detail);

  // Chamada a api
  useEffect(() => {
    const url = "https://mycheffy.herokuapp.com/category";

    api
      .get(url)
      .then((response) => {
        const data = response.data.data;
        //console.log(data);

        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    //console.log(event.target.value);

    setFormData({ ...formData, [name]: value });
  };

  const handleSelectItem = (value: string) => {
    //console.log("teste", value);
    setSelectedItems([value]);
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

  const UpdatePlate = (url_image: any) => {
    const { name, description, price, delivery_time, categoryId } = formData;

    const body = {
      name: String(name),
      description: String(description),
      price: String(price),
      delivery_time: String(delivery_time),
      delivery_type: String(selectedItems[0]),
      categoryId: Number(categoryId),
      // Ingredients: [{}],
      PlateImages: [
        {
          name: String(name),
          url: String(url_image),
        },
      ],
      // KitchenImages: [{}],
      // ReceiptImages: [{}],
    };

    const url = `https://mycheffy.herokuapp.com/plate/edit/${detail.id}`;

    api
      .post(url, body, {
        headers: {
          "x-access-token": token,
          "content-type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        //console.log("edit plate", data);

        history.push({
          pathname: `/food/profile-chef/${detail.chef.id}`,
          state: {
            detail: detail.chef,
          },
        });
        enqueueSnackbar(response.data.message, {
          variant: "success",
        });
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar(error.response.data.message, { variant: "error" });
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
        .post(proxyurl + url + `/images/`, body)
        .then((response) => {
          //console.log(response.data);

          const url_image = response.data.url;

          UpdatePlate(url_image);
        })
        .catch((error) => {
          console.log(error);
          enqueueSnackbar("Failed to load image.", { variant: "error" });
        });
    } else {
      UpdatePlate(null);
    }
  };

  return (
    <Container id="content-add-plate">
      <Col className="body" xl="auto" lg="auto" md="auto" xs="auto" sm="auto">
        <Form className="form" onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label className="text">Name of your food</Form.Label>
            <Form.Control
              className="input"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label className="text">Food Description</Form.Label>
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
          </Form.Group>

          <Form.Group>
            <Form.Label className="text">Price:</Form.Label>
            <div className="price">
              <Form.Control
                className="input-price"
                type="number"
                placeholder="$"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>
          </Form.Group>

          <Form.Group>
            <Form.Label className="text">Time:</Form.Label>
            <div className="description">
              <p>
                <FaInfoCircle color="gray" />
                &nbsp;&nbsp;Example 20min to 30min.
              </p>
            </div>
            <div className="price">
              <Form.Control
                className="input-price"
                type="text"
                placeholder="20 min"
                name="delivery_time"
                value={formData.delivery_time}
                onChange={handleInputChange}
                required
              />
              &nbsp;&nbsp;&nbsp;
              <div className="per">
                <span> to </span>
              </div>
              &nbsp;&nbsp;&nbsp;
              <Form.Control
                className="input-price"
                type="number"
                placeholder="30 min"
                name="delivery_time_max"
                value={formData.delivery_time_max}
                onChange={handleInputChange}
                required
              />
            </div>
          </Form.Group>

          <Form.Group>
            <Form.Label className="text">Food Category</Form.Label>
            <Form.Control
              className="input-category"
              as="select"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleInputChange}
              required
            >
              <option>Select Food Category</option>
              {categories.map((category: any) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label className="text">Delivery</Form.Label>
            <div className="delivery">
              {deliveryType.map((type: any) => (
                <div
                  key={type.id}
                  onClick={() => handleSelectItem(type.value)}
                  className={
                    selectedItems.includes(type.value)
                      ? "input-selected"
                      : "input"
                  }
                >
                  <span>{type.description}</span>
                </div>
              ))}
            </div>
          </Form.Group>

          <Form.Group>
            <Form.Label className="text">Upload Your Food Image</Form.Label>
            <div className="description">
              <p>
                <FaInfoCircle color="gray" />
                &nbsp;&nbsp; For best results, use JPG, GIF or PNG images that
                are 660x440 pixels
              </p>
            </div>
            <UploadFile onUpload={handleUpload} />
            {!!uploadedFiles.length && <FileList file={uploadedFiles[0]} />}
          </Form.Group>

          {/*           <Form.Group>
            <Form.Label className="text">Ingredients</Form.Label>
            <Form.Control
              className="input"
              type="text"
              name="description"
              onChange={handleInputChange}
              required
            />
          </Form.Group> */}

          <Button className="button" type="submit" onClick={handleSubmit}>
            Update plate
          </Button>
        </Form>
      </Col>
    </Container>
  );
};

export default FormUpdatePlate;
