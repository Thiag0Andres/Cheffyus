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
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

//Message
import { useSnackbar } from "notistack";

// Icons
import { IoIosMail } from "react-icons/io";
import { ImLock } from "react-icons/im";
import { FaUserTimes } from "react-icons/fa";

import api from "../../services/api";

import "./styles.scss";

const FormAccount: React.FC = () => {
  const user: User = useSelector((state: RootStateOrAny) => state.user.user);
  const token: Token = useSelector(
    (state: RootStateOrAny) => state.token.token.token
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  // States
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    console.log(event.target);

    setFormData({ ...formData, [name]: value });
  };

  const AddEmail = (event: FormEvent) => {
    event.preventDefault();

    const { email } = formData;

    const body = {
      email: email,
    };

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://cheffyus-api.herokuapp.com/";

    api
      .put(proxyurl + url + `/add_email/${user.id}`, body, {
        headers: { Authorization: token },
      })
      .then((response) => {
        const data = response.data;
        console.log(data);

        dispatch(updateUser(data.user));

        enqueueSnackbar("Email added successfully!", {
          variant: "success",
        });
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar("Failed to add email.", { variant: "error" });
      });
  };

  const ChangePassword = (event: FormEvent) => {
    event.preventDefault();

    const { password } = formData;

    const body = {
      password: password,
    };

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://cheffyus-api.herokuapp.com/";

    api
      .put(proxyurl + url + `/users/${user.id}`, body, {
        headers: { Authorization: token },
      })
      .then((response) => {
        const data = response.data;
        console.log(data);

        //dispatch(updateUser(data.user));

        enqueueSnackbar("Password updated successfully!", {
          variant: "success",
        });
        //setFormData({ password: " " });
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar("Failed to update.", { variant: "error" });
      });
  };

  return (
    <Col
      id="content-form-account"
      xl="auto"
      lg="auto"
      md="auto"
      xs="auto"
      sm="auto"
    >
      <Row className="body">
        <Card className="card1">
          <Card.Body className="card-body1">
            <h3
              style={{
                display: "flex",
                alignItems: "center",
                color: "#3c3c3c",
              }}
            >
              <IoIosMail />
              &nbsp;&nbsp; Email addresses
            </h3>
            <Table striped bordered hover>
              <thead
                style={{
                  color: "#3c3c3c",
                }}
              >
                <tr>
                  <th>Address</th>
                  <th>Confirmation</th>
                  <th>Receive notifications</th>
                </tr>
              </thead>
              <tbody
                style={{
                  color: "#3c3c3c",
                }}
              >
                <tr>
                  <td>email</td>
                  <td>Mark</td>
                  <td>
                    <Form.Check type="checkbox" />
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
            <Button className="button1">+ Add new email address</Button>
            <Button className="button2" type="submit">
              Save
            </Button>
          </Card.Body>
        </Card>
        <Card className="card2">
          <Card.Body className="card-body2">
            <h3
              style={{
                display: "flex",
                alignItems: "center",
                color: "#3c3c3c",
              }}
            >
              <ImLock />
              &nbsp;&nbsp; Password: ******
            </h3>
            <Button className="button3">Change</Button>
          </Card.Body>
        </Card>
        <Card className="card3">
          <Card.Body className="card-body3">
            <h3
              style={{
                display: "flex",
                alignItems: "center",
                color: "#3c3c3c",
              }}
            >
              <FaUserTimes />
              &nbsp;&nbsp; Delete account
            </h3>
            <p>
              If you delete your account, your personal information (name, phone
              number, address, email, profile picture, etc.) will be deleted
              permanently and can't be recovered. All the listings you have
              created will be removed. You won't be able to reactivate your
              account.
            </p>
            <p></p>
            <p>
              Information where other members are involved (conversations with
              other people, transactions you've made, reviews you've given to
              others, etc) is not removed when you delete your account. However,
              your name will no longer be displayed next to this information.
            </p>
            <p></p>
            <Button className="button4" type="submit">
              Permanently delete my account
            </Button>
            <p></p>
            <p>
              Your account can't be deleted because you are the only
              administrator of the marketplace.
            </p>
          </Card.Body>
        </Card>
      </Row>
    </Col>
  );
};

export default FormAccount;
