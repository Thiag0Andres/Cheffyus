import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

// Redux e Auth
import { useSelector, RootStateOrAny } from "react-redux";
import { isAuthenticated } from "../../services/auth";

// Types
import { User } from "../../store/ducks/user/types";

// Message
import { useSnackbar } from "notistack";

// Images
import userNotfound from "../../images/user.png";

import "./styles.scss";

interface Props {
  detail: any;
}

const ChefProfile: React.FC<Props> = ({ detail }) => {
  const user: User = useSelector((state: RootStateOrAny) => state.user.user);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  //States
  const [isLogged, setIsLogged] = useState(false);

  // Atualiza o estado de autenticação na mudança de usuário
  useEffect(() => {
    const response = isAuthenticated();
    setIsLogged(response);
  }, [user]);

  const handleNextPage = () => {
    if (isLogged) {
      history.push({
        pathname: `/contact-chef/${detail.user.first_name}`,
        state: {
          detail: detail,
        },
      });
    } else {
      history.push("/login");
      enqueueSnackbar("You must log in to Cheffy to contact a chef", {
        variant: "error",
      });
    }
  };

  return (
    <Container fluid id="page-chef-profile">
      <Col className="info" xl="auto" lg="auto" md="auto" xs="auto" sm="auto">
        <h2>1 open listing</h2>
        <div className="box-image">
          <div className="opacity"></div>
          <img src={detail.kitchen.image_urls[0]} alt={detail.kitchen.name} />
          <Link
            className="box1"
            to={{
              pathname: `/restaurant/${detail.kitchen.name}`,
              state: {
                detail: detail,
              },
            }}
          >
            <div className="price">
              <span className="value">${detail.kitchen.price_per_time}</span>
              <span className="hour">/ {detail.kitchen.time_type}</span>
            </div>
            <p>{detail.kitchen.name}</p>
          </Link>
        </div>

        <h2>No followed people</h2>

        <h2>No reviews</h2>
      </Col>
      <Col className="image" xl="auto" lg="auto" md="auto" xs="auto" sm="auto">
        <img
          src={
            detail.user.image_url === null
              ? userNotfound
              : detail.user.image_url
          }
          alt={detail.user.first_name}
        />
        <Button className="button" type="submit" onClick={handleNextPage}>
          Contact {detail.user.first_name}
        </Button>
      </Col>
    </Container>
  );
};
export default ChefProfile;
