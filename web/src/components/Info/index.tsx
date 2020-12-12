import React from "react";
import { Link } from "react-router-dom";

// Bootstrap
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import "./styles.scss";

interface Props {
  detail: any;
  formData: any;
}

const Info: React.FC<Props> = ({ detail, formData }) => {
  const typeTime = () => {
    if (detail.kitchen.time_type == "hour") {
      return <p>Hours:</p>;
    } else if (detail.kitchen.time_type == "day") {
      return <p>Days:</p>;
    } else if (detail.kitchen.time_type == "week") {
      return <p>Weeks:</p>;
    } else if (detail.kitchen.time_type == "month") {
      return <p>Months:</p>;
    } else if (detail.kitchen.time_type == "year") {
      return <p>Years:</p>;
    }
  };

  const typeTime2 = () => {
    if (detail.kitchen.time_type == "hour") {
      return <p>hour</p>;
    } else if (detail.kitchen.time_type == "day") {
      return <p>day</p>;
    } else if (detail.kitchen.time_type == "week") {
      return <p>week</p>;
    } else if (detail.kitchen.time_type == "month") {
      return <p>month</p>;
    } else if (detail.kitchen.time_type == "year") {
      return <p>year</p>;
    }
  };

  return (
    <Container id="content-info">
      <Col className="body" xl="auto" lg="auto" md="auto" xs="auto" sm="auto">
        <Row className="row">
          <h2>Details</h2>
        </Row>
        <Row className="row">
          <p>
            <Link
              to={{
                pathname: `/kitchen/restaurant/${detail.kitchen.name}`,
                state: {
                  detail: detail,
                },
              }}
            >
              {detail.kitchen.name}
            </Link>
            &nbsp; by &nbsp;
            <Link
              to={{
                pathname: `/kitchen/profile-chef/${detail.user.first_name}`,
                state: {
                  detail: detail,
                },
              }}
            >
              {detail.user.first_name}
            </Link>
          </p>
        </Row>
        <Row className="row">
          <div className="box1">
            <div className="price">
              <p style={{ display: "flex" }}>Price per&nbsp;{typeTime2()}:</p>
              <p>${detail.kitchen.price_per_time}</p>
            </div>
            {formData.time > 1 && (
              <div className="price">
                {typeTime()}
                <p>{formData.time}</p>
              </div>
            )}
            {formData.time > 1 && (
              <div className="price">
                <p>Subtotal:</p>
                <p>${detail.kitchen.price_per_time * formData.time}</p>
              </div>
            )}
            <div className="price">
              <p className="text">Price:</p>
              {formData.time > 1 ? (
                <p className="text">
                  ${detail.kitchen.price_per_time * formData.time}
                </p>
              ) : (
                <p className="text">${detail.kitchen.price_per_time}</p>
              )}
            </div>
          </div>
        </Row>
      </Col>
    </Container>
  );
};

export default Info;
