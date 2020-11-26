import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

// Redux e Auth
import { useSelector, RootStateOrAny } from "react-redux";

// Types
import { User } from "../../../store/ducks/user/types";

// Message
import { useSnackbar } from "notistack";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

// Icons
import { TiPencil } from "react-icons/ti";

import api from "../../../services/api";

import "./styles.scss";

const FormConversationsListings: React.FC = () => {
  const user: User = useSelector((state: RootStateOrAny) => state.user.user);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  // States
  const [restaurants, setRestaurants] = useState([]);
  const [kitchensIds, setKitchensIds] = useState(user.kitchen_ids);

  // Chamada a api
  useEffect(() => {
    const proxyurl = "https://afternoon-brook-18118.herokuapp.com/";
    const url = "http://cheffyus-api.herokuapp.com/";

    api
      .get(proxyurl + url + "kitchens")
      .then((response) => {
        setRestaurants(response.data);
        //console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Col
        id="content-form-conversations"
        xl="auto"
        lg="auto"
        md="auto"
        xs="auto"
        sm="auto"
      >
        <Row className="body">
          <h2>Conversations</h2>
          <Form className="form">
            <Form.Control
              className="input"
              type="text"
              placeholder="Search for a name, email or keyword"
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="buttons">
              <Button className="button1">Search</Button>
              <Button className="button2">Show all</Button>
            </div>
          </Form>
          <Table striped bordered hover>
            <thead
              style={{
                color: "#3c3c3c",
              }}
            >
              <tr>
                <th>Started from</th>
                <th>Status</th>
                <th>Started</th>
                <th>Latest Activity</th>
                <th>Starter</th>
                <th>Seller</th>
              </tr>
            </thead>
            <tbody
              style={{
                color: "#3c3c3c",
              }}
            >
              {user.kitchen_ids != null &&
                user.kitchen_ids.length > 0 &&
                restaurants.map((restaurant: any) =>
                  kitchensIds.map(
                    (KitchenId: any) =>
                      restaurant.kitchen.id == KitchenId && (
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
                            <TiPencil className="icon" />
                          </td>
                        </tr>
                      )
                  )
                )}
            </tbody>
          </Table>
        </Row>
      </Col>
    </>
  );
};

export default FormConversationsListings;
