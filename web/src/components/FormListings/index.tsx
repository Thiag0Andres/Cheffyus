import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

// Redux e Auth
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { updateFilterName } from "../../store/ducks/filterName/actions";

// Types
import { User } from "../../store/ducks/user/types";
import { FilterName } from "../../store/ducks/filterName/types";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";

import api from "../../services/api";

// Icons
import { TiPencil } from "react-icons/ti";

import "./styles.scss";

const FormListings: React.FC = () => {
  const user: User = useSelector((state: RootStateOrAny) => state.user.user);
  const filterName: FilterName[] = useSelector(
    (state: RootStateOrAny) => state.filterName.filterName
  );
  const dispatch = useDispatch();

  // States
  const [restaurants, setRestaurants] = useState<Array<any>>([]);
  const [kitchensIds, setKitchensIds] = useState(user.kitchen_ids);
  const [kitchensUser, setKitchensUser] = useState<Array<any>>([]);
  const [formData, setFormData] = useState({
    search: "",
  });

  useEffect(() => {
    setRestaurants(filterName);
    //console.log(restaurants);
  }, [filterName]);

  const AllkitchensTypes = () => {
    const proxyurl = "https://afternoon-brook-18118.herokuapp.com/";
    const url = `https://cheffyus-api.herokuapp.com/kitchens/?min_price=${0}&max_price=${10000}`;

    api
      .get(proxyurl + url)
      .then((response) => {
        const data = response.data;
        dispatch(updateFilterName(data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    //console.log(event.target.value);

    setFormData({ ...formData, [name]: value });
  };

  const filteredKitchens = () => {
    const kitchens: any = [];

    kitchensUser.filter((restaurant: any) => {
      return (
        restaurant.kitchen.name
          .toLowerCase()
          .indexOf(formData.search.toLowerCase()) !== -1 &&
        kitchens.push(restaurant)
      );
    });
    setRestaurants(kitchens);
  };

  const KitchensUser = () => {
    const kitchens: any = [];

    if (kitchensIds !== null) {
      restaurants.filter((restaurant: any) => {
        kitchensIds.map((kitchenId: any) => {
          restaurant.kitchen.id == kitchenId && kitchens.push(restaurant);
        });
      });
    }

    setKitchensUser(kitchens);
  };

  const StatusOpened = () => {
    const kitchens: any = [];

    kitchensUser.filter((restaurant: any) => {
      if (restaurant.kitchen.status === "opened") {
        kitchens.push(restaurant);
      }
    });
    setKitchensUser(kitchens);
  };

  const StatusClosed = () => {
    const kitchens: any = [];

    kitchensUser.filter((restaurant: any) => {
      if (restaurant.kitchen.status === "closed") {
        kitchens.push(restaurant);
      }
    });
    setKitchensUser(kitchens);
  };

  const StatusExpired = () => {
    const kitchens: any = [];

    kitchensUser.filter((restaurant: any) => {
      if (restaurant.kitchen.status === "expired") {
        kitchens.push(restaurant);
      }
    });
    setKitchensUser(kitchens);
  };

  useEffect(() => {
    //filteredKitchens();
    KitchensUser();
  }, [restaurants]);

  return (
    <Col
      id="content-form-listings"
      xl="auto"
      lg="auto"
      md="auto"
      xs="auto"
      sm="auto"
    >
      <Row className="body">
        <h2>Kitchens</h2>
        <Form className="form">
          <Form.Control
            className="input"
            type="text"
            placeholder="Search for a kitchen name"
            name="search"
            onChange={handleInputChange}
          />
          &nbsp;&nbsp;&nbsp;
          <div className="groupFilter">
            <Dropdown>
              <Dropdown.Toggle className="input-dropdown">
                All statues
              </Dropdown.Toggle>
              <Dropdown.Menu className="input-dropdown">
                <Dropdown.Item className="input-item" onClick={StatusOpened}>
                  Opened
                </Dropdown.Item>
                <Dropdown.Item className="input-item" onClick={StatusClosed}>
                  Closed
                </Dropdown.Item>
                <Dropdown.Item onClick={StatusExpired}>Expired</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            &nbsp;&nbsp;&nbsp;
            <div className="buttons">
              <Button className="button1">Search</Button>
              <Button className="button2" onClick={AllkitchensTypes}>
                Show all
              </Button>
            </div>
          </div>
        </Form>
        <Table striped bordered hover responsive>
          <thead
            style={{
              color: "#3c3c3c",
            }}
          >
            <tr>
              <th>Title</th>
              <th>Created</th>
              <th>Updated</th>
              <th>Category</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody
            style={{
              color: "#3c3c3c",
            }}
          >
            {user.kitchen_ids != null &&
              user.kitchen_ids.length > 0 &&
              kitchensUser.map((restaurant: any) => (
                <tr>
                  <td>
                    <Link
                      to={{
                        pathname: `/restaurant/${restaurant.kitchen.name}`,
                        state: {
                          detail: restaurant,
                        },
                      }}
                    >
                      {restaurant.kitchen.name}
                    </Link>
                  </td>
                  <td>{restaurant.kitchen.createdAt}</td>
                  <td>{restaurant.kitchen.updatedAt}</td>
                  <td>{restaurant.kitchen.category_id}</td>
                  <td>{restaurant.kitchen.status}</td>
                  <td>
                    <Link
                      to={{
                        pathname: `/update-kitchen/${restaurant.kitchen.name}`,
                        state: {
                          detail: restaurant,
                        },
                      }}
                    >
                      <TiPencil className="icon" />
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Row>
    </Col>
  );
};

export default FormListings;
