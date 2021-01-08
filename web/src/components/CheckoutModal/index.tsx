import React, { ChangeEvent, useEffect, useState } from "react";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// Redux e Auth
import { useSelector, RootStateOrAny } from "react-redux";

// Types
import { TokenDelivery } from "../../store/ducks/tokenDelivery/types";

// Message
import { useSnackbar } from "notistack";

import api from "../../services/api";

import "./styles.scss";

interface Props {
  show: boolean;
  onHide(): any;
}

const CheckoutModal: React.FC<Props> = (props) => {
  const token: TokenDelivery = useSelector(
    (state: RootStateOrAny) => state.tokenDelivery.tokenDelivery.tokenDelivery
  );
  const { enqueueSnackbar } = useSnackbar();

  // States
  const [cards, setCards] = useState<Array<any>>([]);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    restaurant_name: "",
    password: "",
    user_type: "",
    token: "",
  });

  // Chamada a api
  useEffect(() => {
    const url = "https://mycheffy.herokuapp.com/";

    api
      .get(url + "card", {
        headers: {
          "x-access-token": token,
          "content-type": "application/json",
        },
      })
      .then((response) => {
        //console.log(response.data);

        setCards(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Modal
      id="modal"
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="modal-header">
        <h4 className="text">Select a card</h4>
      </Modal.Header>
      <Modal.Body className="modal-body">
        {cards.length > 0 ? (
          <Card className="card">
            <Card.Body className="card-body">
              {cards?.map((card: any) => (
                <ul key={card.id}>
                  <li>
                    <Container className="details">
                      <Row className="infoTitle">
                        <h2 className="title"></h2>
                      </Row>
                      <Row className="infoCol"></Row>
                      <Row className="infoCol">
                        <h3>Address Line 2</h3>
                      </Row>
                      <Row className="infoRow">
                        <h3>Zipcode:</h3>&nbsp;&nbsp;
                      </Row>
                      <Row className="infoCol">
                        <h3>Delivery Note</h3>
                      </Row>
                    </Container>
                  </li>
                </ul>
              ))}
            </Card.Body>
          </Card>
        ) : (
          <h2
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#3c3c3c",
            }}
          >
            No card registered, you need to add one! <br /> Please go to
            Settings &nbsp;&gt;&nbsp; Payment and add one.
          </h2>
        )}
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button className="button" type="submit">
          Checkout
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CheckoutModal;
