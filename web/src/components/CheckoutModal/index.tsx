import React, { ChangeEvent, useEffect, useState } from "react";

// Redux e Auth
import { useSelector, RootStateOrAny } from "react-redux";

// Types
import { TokenDelivery } from "../../store/ducks/tokenDelivery/types";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// Components
import Loading from "../../layout/Loading";

// Message
import { useSnackbar } from "notistack";

// Icons
import { AiOutlineLock, AiOutlineCalendar } from "react-icons/ai";

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
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
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
        setLoading(false);
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
        {loading && <Loading />}
        {!loading && !cards.length ? (
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
        ) : (
          cards?.map((card: any) => (
            <ul key={card.id}>
              <li>
                <Card className="card">
                  <Card.Body className="card-body">
                    <Container className="details">
                      <Row className="infoTitle">
                        <h2 className="title">{card.holder}</h2>
                      </Row>
                      <Row className="infoTitle"></Row>
                      <Row className="infoTitle">
                        <h2 className="title">Card Number: </h2>
                        ...&nbsp;XXXX&nbsp;
                        {card.last4}
                      </Row>
                      <Row className="infoTitle">
                        <h2 className="title">
                          <AiOutlineCalendar />
                          &nbsp;&nbsp;Expiration date:
                        </h2>
                        {card.exp_month + "/" + card.exp_year}
                      </Row>
                      <Row className="infoTitle">
                        <h2 className="title">
                          <AiOutlineLock />
                          &nbsp;&nbsp;CVV/CVC:
                        </h2>
                        ***
                      </Row>
                      <Row className="infoTitle">
                        <h2 className="title">Type:</h2>
                        {!card.type ? "----" : card.type}
                      </Row>
                    </Container>
                  </Card.Body>
                </Card>
              </li>
            </ul>
          ))
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
