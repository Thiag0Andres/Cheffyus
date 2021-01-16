import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

// Redux e Auth
import { RootStateOrAny, useSelector } from "react-redux";
import { ApplicationState } from "../../store";

// Types
import { UserDelivery } from "../../store/ducks/userDelivery/types";
import { TokenDelivery } from "../../store/ducks/tokenDelivery/types";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

//Message
import { useSnackbar } from "notistack";

// Components
import PlateNotExist from "../../layout/PlateNotExist";
import Loading from "../../layout/Loading";

// Images
import userNotfound from "../../images/user.png";
import foodNotFound from "../../images/foodNotFound.jpg";
import DeliveryMan from "../../images/DeliveryMan.png";

// Icons
import { BsFillStarFill } from "react-icons/bs";
import { TiPencil } from "react-icons/ti";
import { MdDelete } from "react-icons/md";

import api from "../../services/api";

import "./styles.scss";

interface Props {
  detail: any;
}

const ChefProfileFood: React.FC<Props> = ({ detail }) => {
  const user: UserDelivery = useSelector(
    (state: ApplicationState) => state.userDelivery.userDelivery
  );
  const token: TokenDelivery = useSelector(
    (state: RootStateOrAny) => state.tokenDelivery.tokenDelivery.tokenDelivery
  );
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  // States
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [plates, setPlates] = useState<Array<any>>([]);

  // Chamada a api
  useEffect(() => {
    setLoading(true);
    const url = `https://mycheffy.herokuapp.com/plate/chef/${detail.id}`;

    api
      .get(url)
      .then((response) => {
        const data = response.data;
        //console.log("chef plates", data.data);

        setPlates(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [refresh]);

  const filterAddress: any = () => {
    return detail.address?.map((address: any) => {
      if (address?.isDefaultAddress) {
        return !address ? (
          "----"
        ) : (
          <p key={address?.id}>
            {address?.addressLine1},&nbsp;{address?.state},&nbsp;{address?.city}
          </p>
        );
      }
    });
  };

  const handleFoodInfoPage = (object: any, id: any) => {
    history.push({
      pathname: `/food/food/${id}`,
      state: {
        detail: object,
      },
    });
  };

  const handleEditFood = (object: any, id: any) => {
    history.push({
      pathname: `/food/update-plate/${id}`,
      state: {
        detail: object,
      },
    });
  };

  const handleDeleteFood = (id: number) => {
    const url = `https://mycheffy.herokuapp.com/plate/${id}`;

    api
      .delete(url, {
        headers: {
          "x-access-token": token,
          "content-type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        //console.log("remove plate", data);

        setRefresh(refresh + 1);
        enqueueSnackbar(response.data.message, {
          variant: "info",
        });
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar(error.response.data.message, {
          variant: "error",
        });
      });
  };

  const typeDelivery = (delivery_type: string) => {
    if (delivery_type == "free") {
      return (
        <p className="delivery_free">
          <img className="delivery-man" src={DeliveryMan} />
          &nbsp; {delivery_type}
        </p>
      );
    } else if (delivery_type == "paid") {
      return (
        <p className="delivery_paid">
          <img className="delivery-man" src={DeliveryMan} />
          &nbsp; {delivery_type}
        </p>
      );
    }
  };

  return (
    <Container fluid id="page-chef-profile-food">
      <Row className="header">
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
          <span className="title">Chef {detail.name}</span>
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
      <Row className="body">
        {loading && <Loading />}
        {!loading && !plates.length ? (
          <>
            {user.user_type === "chef" ? (
              <PlateNotExist text={"You have no food at the moment"} />
            ) : (
              <PlateNotExist
                text={"This chef doesn't have any food at the moment"}
              />
            )}
          </>
        ) : (
          <>
            <ul>
              {plates.map((plate: any) => (
                <li className="main-li" key={plate.id}>
                  <Card className="main-box shadow-sm">
                    <Link
                      className="box1"
                      to={{
                        pathname: `/food/food/${plate.id}`,
                        state: {
                          detail: plate,
                        },
                      }}
                    >
                      <img
                        id={`id_${plate.id}`}
                        className="imgKitchen"
                        src={
                          !plate.PlateImages.length
                            ? foodNotFound
                            : plate.PlateImages[0]?.url
                        }
                        alt={plate.name}
                      />
                    </Link>

                    <Card.Body>
                      <Card.Title
                        className="title"
                        onClick={() => handleFoodInfoPage(plate, plate.id)}
                      >
                        {plate.name}
                      </Card.Title>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Card.Text style={{ color: "#cb2f28" }}>
                          {plate.category.name}
                        </Card.Text>
                        <Card.Text className="price">${plate.price}</Card.Text>
                      </div>
                    </Card.Body>
                    <Card.Footer
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      {typeDelivery(plate.delivery_type)}
                      <span className="review">
                        <BsFillStarFill />
                        &nbsp;&nbsp; {plate.rating || 0} reviews
                      </span>
                      {user.user_type === "chef" && user.id === detail.id && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <TiPencil
                            className="icon"
                            size={20}
                            onClick={() => handleEditFood(plate, plate.id)}
                          />
                          &nbsp; &nbsp;
                          <MdDelete
                            className="icon"
                            size={20}
                            onClick={() => handleDeleteFood(plate.id)}
                          />
                        </div>
                      )}
                    </Card.Footer>
                  </Card>
                </li>
              ))}
            </ul>
          </>
        )}
      </Row>
    </Container>
  );
};
export default ChefProfileFood;
