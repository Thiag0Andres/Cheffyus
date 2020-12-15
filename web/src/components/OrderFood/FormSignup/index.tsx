import React, { useState, ChangeEvent, FormEvent } from "react";
import { useHistory } from "react-router-dom";

// Redux e Auth
import { checkAuth } from "../../../services/validation";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { updateUserDelivery } from "../../../store/ducks/userDelivery/actions";
import { updateTokenDelivery } from "../../../store/ducks/tokenDelivery/actions";

// Types
import { UserDelivery } from "../../../store/ducks/userDelivery/types";

//Message
import { useSnackbar } from "notistack";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Facebook login
import FacebookLogin from "react-facebook-login";

// Icons
import { IoLogoFacebook } from "react-icons/io";

import api from "../../../services/api";

import "./styles.scss";

const FormSignup: React.FC = () => {
  const userDelivery: UserDelivery = useSelector(
    (state: RootStateOrAny) => state.userDelivery.userDelivery
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  // State
  const [show, setShow] = useState(true);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    restaurant_name: "",
    password: "",
    user_type: "",
    token: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    //console.log(event.target);

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitEmail = (event: FormEvent) => {
    event.preventDefault();

    const { email } = formData;

    const body = {
      email: email,
    };

    //const proxyurl = "https://afternoon-brook-18118.herokuapp.com/";
    const url = "https://mycheffy.herokuapp.com/";

    api
      .post(url + "user/", body)
      .then((response) => {
        const data = response.data.result;
        //console.log(data);

        dispatch(updateUserDelivery(data));

        setShow(false);
        setShow2(true);
        setShow3(false);
      })
      .catch((error) => {
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  const handleSubmitVerifyEmail = (event: FormEvent) => {
    event.preventDefault();

    const { email, token } = formData;

    const body = {
      email: email,
      email_token: token,
    };

    //const proxyurl = "https://afternoon-brook-18118.herokuapp.com/";
    const url = "https://mycheffy.herokuapp.com/";

    api
      .post(url + "user/verify-email-token", body)
      .then((response) => {
        const data = response.data.result;
        //console.log(data);

        dispatch(updateUserDelivery(data));

        setShow(false);
        setShow2(false);
        setShow3(true);
      })
      .catch((error) => {
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const { email, name, user_type, restaurant_name, password } = formData;

    const body = {
      email: email,
      name: name,
      password: password,
      restaurant_name: restaurant_name,
      user_type: user_type,
    };

    //const proxyurl = "https://afternoon-brook-18118.herokuapp.com/";
    const url = "https://mycheffy.herokuapp.com/";

    api
      .post(url + "user/complete-registration", body)
      .then((response) => {
        const data = response.data.result;
        console.log(response);

        dispatch(updateUserDelivery(data));
        //dispatch(updateTokenDelivery());

        history.push("/food/grid-foods");

        enqueueSnackbar("User successfully registered!", {
          variant: "success",
        });
      })
      .catch((error) => {
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <>
      <Row id="contentSignupFood">
        <Col className="body" xl="12" lg="12" md="12" xs="12" sm="12">
          <Form className="form">
            {/*             <FacebookLogin
              icon={<IoLogoFacebook size={25} />}
              appId="1293792574327500"
              fields="name,email,picture"
              textButton="&nbsp;&nbsp;Sign up with Facebook"
              callback={responseFacebook}
            /> */}
            {/* <h3>Sign up with email</h3> */}
            <Form.Group controlId="formBasicEmail">
              <Form.Label className="text">Email address</Form.Label>
              <Form.Control
                className="input"
                name="email"
                type="text"
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            {show && (
              <Button
                className="button"
                type="submit"
                onClick={handleSubmitEmail}
              >
                Confirm Email
              </Button>
            )}
            {show2 && (
              <>
                <Form.Group>
                  <p>
                    You will soon receive an email with a link to confirm your
                    email address. Don't forget to check your spam folder! After
                    confirming your address, you can join Cheffy.
                  </p>
                  <Form.Label className="text">Access Token </Form.Label>
                  <Form.Control
                    className="input"
                    name="token"
                    type="text"
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Button className="button" onClick={handleSubmitVerifyEmail}>
                  Verify token
                </Button>
              </>
            )}
            {show3 && (
              <>
                <Form.Group>
                  <Form.Label className="text">Name</Form.Label>
                  <Form.Control
                    className="input"
                    name="name"
                    type="text"
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="text">User type</Form.Label>
                  <Form.Control
                    className="select-user-type"
                    as="select"
                    name="user_type"
                    onChange={handleInputChange}
                    required
                  >
                    <option>Select a user type</option>
                    <option value="user">User</option>
                    <option value="chef">Chef</option>
                    <option value="driver">Driver</option>
                  </Form.Control>
                </Form.Group>
                {formData.user_type === "chef" && (
                  <Form.Group>
                    <Form.Label className="text">Restaurant Name</Form.Label>
                    <Form.Control
                      className="input"
                      name="restaurant_name"
                      type="text"
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                )}
                <Form.Group controlId="formBasicPassword">
                  <Form.Label className="text">Password</Form.Label>
                  <Form.Control
                    className="input"
                    name="password"
                    type="password"
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label className="text">Confirm Password</Form.Label>
                  <Form.Control
                    className="input"
                    name="confirm_password"
                    type="password"
                    required
                  />
                </Form.Group>

                <Form.Check
                  className="text2"
                  type="checkbox"
                  label="I accept the Terms of Use and Privacy policy"
                  required
                />
                <Form.Check
                  className="text2"
                  type="checkbox"
                  label="I agree to receive occasional emails from the Cheffy team and understand that I can change my mind at any time"
                  required
                />
                <Button className="button" type="submit" onClick={handleSubmit}>
                  Create account
                </Button>
              </>
            )}
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default FormSignup;

/* 
&& userDelivery.verification_email_status === "pending"
&& userDelivery.verification_email_status === "verified"


 */
