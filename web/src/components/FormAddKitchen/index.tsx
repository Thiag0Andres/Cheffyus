import React, { useState } from "react";
import { Link } from "react-router-dom";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Icons
import { FaInfoCircle } from "react-icons/fa";

import "./styles.scss";

const FormAddKitchen: React.FC = () => {
  // States
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(false);
  const [textSelect, setTextSelect] = useState("");

  const text = [
    "Offering without online payment",
    "Offering with online payment",
  ];

  return (
    <>
      <Row id="content-add-kitchen">
        <Col className="body">
          {show1 && (
            <>
              <h2>Select listing type</h2>
              <Button
                className="button1"
                type="submit"
                onClick={() => {
                  setShow1(false);
                  setShow2(true);
                  setTextSelect(text[0]);
                }}
              >
                {text[0]}
              </Button>
              <Button
                className="button1"
                type="submit"
                onClick={() => {
                  setShow1(false);
                  setShow2(true);
                  setTextSelect(text[1]);
                }}
              >
                {text[1]}
              </Button>
            </>
          )}

          {show2 && (
            <Container className="container-form">
              <Button
                className="button2"
                type="submit"
                onClick={() => {
                  setShow1(true);
                  setShow2(false);
                }}
              >
                Category: Default category
              </Button>
              <Button
                className="button2"
                type="submit"
                onClick={() => {
                  setShow1(true);
                }}
              >
                Listing type: {textSelect}
              </Button>
              <Form className="form">
                <Form.Label>Listing title*</Form.Label>
                <Form.Control className="input" type="title" />

                <Form.Label className="text">Price</Form.Label>
                <Form.Group className="price">
                  <Form.Control
                    className="input-price"
                    type="price"
                    placeholder="0"
                  />
                  <Form.Control
                    className="select"
                    as="select"
                    placeholder="hour"
                  >
                    <option>hour</option>
                    <option>day</option>
                    <option>night</option>
                    <option>week</option>
                    <option>month</option>
                    <option>Year</option>
                  </Form.Control>
                </Form.Group>

                <Form.Label className="text">Detailed description</Form.Label>
                <p></p>
                <Form.Control className="textarea" as="textarea" rows={3} />

                <Form.Label className="text">Expiration date*</Form.Label>
                <Form.Group className="date">
                  <Form.Control className="select-year" as="select">
                    <option>2020</option>
                    <option>2021</option>
                  </Form.Control>

                  <Form.Control className="select-month" as="select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>

                  <Form.Control className="select-day" as="select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                </Form.Group>

                <Form.Label className="text">Location*</Form.Label>
                <Form.Control className="input" type="loaction" />
              </Form>
            </Container>
          )}
        </Col>
      </Row>
    </>
  );
};

export default FormAddKitchen;
