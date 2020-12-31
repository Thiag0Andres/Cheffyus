import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

// Images
import userNotfound from "../../images/user.png";

// Icons
import { BsFillStarFill } from "react-icons/bs";

import "./styles.scss";

interface Props {
  detail: any;
}

const ChefProfileFood: React.FC<Props> = ({ detail }) => {
  const filterAddress: any = () => {
    return detail.address?.map((address: any) => {
      if (address?.isDefaultAddress) {
        return (
          <p key={address?.id}>
            {address?.addressLine1},&nbsp;{address?.state},&nbsp;{address?.city}
          </p>
        );
      }
    });
  };

  return (
    <Container fluid id="page-chef-profile-food">
      <Row className="body">
        <Col className="p-0" xl="1" lg="1" md="1" xs="1" sm="1"></Col>
        <Col className="image p-0" xl="3" lg="3" md="3" xs="3" sm="3">
          <Image
            id={`id_${detail.id}`}
            src={detail.imagePath === null ? userNotfound : detail.imagePath}
            alt={detail.name}
            roundedCircle
          />
        </Col>
        <Col className="description p-0" xl="7" lg="7" md="7" xs="7" sm="7">
          <span className="title">{detail.name}</span>
          <span className="review">
            <BsFillStarFill />
            &nbsp;&nbsp; {detail.rating || 0} reviews
          </span>
          <p></p>
          <p>{detail.bio || "This chef does not contain any description."}</p>
          <p>
            <strong style={{ color: " #474747" }}>Address: </strong>
            &nbsp;
            {filterAddress()}
          </p>
        </Col>
        <Col className="p-0" xl="1" lg="1" md="1" xs="1" sm="1"></Col>
      </Row>
    </Container>
  );
};
export default ChefProfileFood;
