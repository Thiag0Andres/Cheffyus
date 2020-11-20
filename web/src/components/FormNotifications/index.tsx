import React from "react";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./styles.scss";

const FormTransactions: React.FC = () => {
  return (
    <>
      <Col
        id="content-form-transactions"
        xl="auto"
        lg="auto"
        md="auto"
        xs="auto"
        sm="auto"
      >
        <Row className="body">
          <Form className="form">
            <Form.Group className="group">
              <h2>Newsletters</h2>
              <Form.Check
                type="radio"
                label="Send me a daily newsletter if there are new listings"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
              />
              <Form.Check
                type="radio"
                label="Send me a weekly newsletter if there are new listings"
                name="formHorizontalRadios"
                id="formHorizontalRadios2"
              />
              <Form.Check
                type="radio"
                label="Don't send me newsletters"
                name="formHorizontalRadios"
                id="formHorizontalRadios3"
              />
            </Form.Group>
            <p></p>

            <Form.Group className="group">
              <h2>Emails from administrators</h2>
              <Form.Check
                type="checkbox"
                label="I agree to receive occasional emails from the Cheffy Test team"
              />
            </Form.Group>
            <p></p>

            <Form.Group className="group">
              <h2>I want to get an email notification when...</h2>
              <Form.Check
                type="checkbox"
                label="...someone sends me a message"
              />
              <Form.Check
                type="checkbox"
                label="...someone comments on my listing"
              />
              <Form.Check
                type="checkbox"
                label="...someone accepts my offer or request"
              />
              <Form.Check
                type="checkbox"
                label="...someone rejects my offer or request"
              />
              <Form.Check
                type="checkbox"
                label="...someone gives me feedback"
              />
              <Form.Check
                type="checkbox"
                label="...I have forgotten to confirm an order as completed"
              />
              <Form.Check
                type="checkbox"
                label="...I have forgotten to give feedback on an order"
              />
              <Form.Check
                type="checkbox"
                label="...someone marks my order as completed"
              />
              <Form.Check type="checkbox" label="...I receive a new payment" />
              <Form.Check
                type="checkbox"
                label="...someone I follow posts a new listing"
              />
            </Form.Group>

            <Button className="button" type="submit">
              Save information
            </Button>
          </Form>
        </Row>
      </Col>
    </>
  );
};

export default FormTransactions;
