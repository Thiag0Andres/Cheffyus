import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

// Redux e Auth
import { useSelector, RootStateOrAny } from "react-redux";

// Types
import { Token } from "../../../store/ducks/token/types";

// Message
import { useSnackbar } from "notistack";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";

// Icons
import { TiPencil } from "react-icons/ti";

import api from "../../../services/api";

import "./styles.scss";

const FormUsersListings: React.FC = () => {
  const token: Token = useSelector(
    (state: RootStateOrAny) => state.token.token.token
  );
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  // States
  const [users, setUsers] = useState([]);

  // Chamada a api
  useEffect(() => {
    const proxyurl = "https://afternoon-brook-18118.herokuapp.com/";
    const url = "http://cheffyus-api.herokuapp.com/";

    api
      .get(proxyurl + url + "users", {
        headers: { Authorization: token },
      })
      .then((response) => {
        setUsers(response.data);
        //console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Col
        id="content-form-listings"
        xl="auto"
        lg="auto"
        md="auto"
        xs="auto"
        sm="auto"
      >
        <Row className="body">
          <h2>Users</h2>
          <Form className="form">
            <Form.Control
              className="input"
              type="text"
              placeholder="Search for a name, email or display name"
            />
            <Dropdown>
              <Dropdown.Toggle className="input-dropdown">
                All statues
              </Dropdown.Toggle>
              <Dropdown.Menu className="input-dropdown">
                <Dropdown.Item className="input-item">Chef</Dropdown.Item>
                <Dropdown.Item>Admin</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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
                <th>Name</th>
                <th>Email</th>
                <th>Joined</th>
                <th>User Type</th>
                <th></th>
              </tr>
            </thead>
            <tbody
              style={{
                color: "#3c3c3c",
              }}
            >
              {users.map((userL: any) => (
                <tr>
                  <td>
                    <Link
                      to={{
                        pathname: `/chef-profile/${userL.first_name}`,
                        state: {
                          detail: userL,
                        },
                      }}
                    >
                      {userL.first_name}
                    </Link>
                  </td>
                  <td>{userL.defaultEmail}</td>
                  <td>{userL.created_at}</td>
                  <td>{userL.user_type}</td>
                  <td></td>
                  <td>
                    <TiPencil className="icon" />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      </Col>
    </>
  );
};

export default FormUsersListings;
