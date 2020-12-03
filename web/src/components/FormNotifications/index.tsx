import React, { FormEvent, useEffect, useState } from "react";

// Redux e Auth
import { RootStateOrAny, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/ducks/user/actions";
import { ApplicationState } from "../../store";

// Types
import { User } from "../../store/ducks/user/types";
import { Token } from "../../store/ducks/token/types";

//Message
import { useSnackbar } from "notistack";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import api from "../../services/api";

import "./styles.scss";

const FormTransactions: React.FC = () => {
  const user: User = useSelector((state: ApplicationState) => state.user.user);
  const token: Token = useSelector(
    (state: RootStateOrAny) => state.token.token.token
  );
  const { enqueueSnackbar } = useSnackbar();

  // States
  const [notifications, setNotifications] = useState([]);
  const [newsletter, setNewsletter] = useState();
  const [frequence, setFrequence] = useState("none");
  const [admin_email, setAdmin_email] = useState(false);
  const [action_ids, setAction_ids] = useState<Array<any>>([]);

  // Chamada a api
  useEffect(() => {
    const proxyurl = "https://afternoon-brook-18118.herokuapp.com/";
    const url = "http://cheffyus-api.herokuapp.com/";

    api
      .get(proxyurl + url + "actions", {
        headers: { Authorization: token },
      })
      .then((response) => {
        setNotifications(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    api
      .get(proxyurl + url + "newsletter", {
        headers: { Authorization: token },
      })
      .then((response) => {
        response.data.map((rd: any) => {
          rd.user_id == user.id && setNewsletter(rd);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //console.log(newsletter);

  const handleSelectedOption1 = (e: any) => {
    setFrequence(e.target.value);
  };

  const handleSelectedOption2 = () => {
    setAdmin_email(!admin_email);
  };

  const handleSelectedOption3 = (e: any) => {
    const action = e.target.value;
    //console.log(event.target);

    var i = action_ids.includes(action);

    if (i) {
      var pos = action_ids.indexOf(action);
      action_ids.splice(pos, 1);
    } else {
      action_ids.push(action);
    }

    //console.log(action_id);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const body = {
      user_id: user.id,
      frequence: frequence,
      admin: admin_email,
      actions_ids: action_ids,
    };

    const proxyurl = "https://afternoon-brook-18118.herokuapp.com/";
    const url = "https://cheffyus-api.herokuapp.com/";

    api
      .post(proxyurl + url + "newsletter", body, {
        headers: { Authorization: token },
      })
      .then(() => {
        enqueueSnackbar("Notifications updated successfully!", {
          variant: "success",
        });
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar("Failed to update notifications.", {
          variant: "error",
        });
      });
  };

  //console.log(frequence);
  //console.log(admin_email);

  return (
    <>
      <Col
        id="content-form-notifications"
        xl="auto"
        lg="auto"
        md="auto"
        xs="auto"
        sm="auto"
      >
        <Row className="body">
          <Form className="form">
            <Form.Group className="group" onSubmit={handleSubmit}>
              <h2>Newsletters</h2>
              <p></p>
              <Form.Check
                type="radio"
                label="Send me a daily newsletter if there are new listings"
                name="frequence"
                id="formHorizontalRadios1"
                value="daily"
                onChange={(e) => handleSelectedOption1(e)}
              />
              <p></p>
              <Form.Check
                type="radio"
                label="Send me a weekly newsletter if there are new listings"
                name="frequence"
                id="formHorizontalRadios2"
                value="weekly"
                onChange={(e) => handleSelectedOption1(e)}
              />
              <p></p>
              <Form.Check
                type="radio"
                label="Don't send me newsletters"
                name="frequence"
                id="formHorizontalRadios3"
                defaultChecked
                value="none"
                onChange={(e) => handleSelectedOption1(e)}
              />
            </Form.Group>
            <p></p>

            <Form.Group className="group">
              <h2>Emails from administrators</h2>
              <p></p>
              <Form.Check
                type="checkbox"
                label="I agree to receive occasional emails from the Cheffy Test team"
                onChange={handleSelectedOption2}
              />
            </Form.Group>
            <p></p>

            <Form.Group className="group">
              <h2>I want to get an email notification when...</h2>
              <p></p>

              {notifications.map((notification: any) => (
                <>
                  <Form.Check
                    key={notification.id}
                    type="checkbox"
                    label={notification.action}
                    name="action_id"
                    value={notification.id}
                    onChange={(e) => handleSelectedOption3(e)}
                  />
                  <p></p>
                </>
              ))}
            </Form.Group>

            <Button className="button" type="submit" onClick={handleSubmit}>
              Save information
            </Button>
          </Form>
        </Row>
      </Col>
    </>
  );
};

export default FormTransactions;
