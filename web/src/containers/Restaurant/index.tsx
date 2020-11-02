import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Components
import NavBar from "../../components/NavBar";
import Background2 from "../../components/Background2";
import RestaurantInfo from "../../components/RestaurantInfo";

interface Props {
  match: any;
  detail: any;
}

const Restaurant: React.FC<Props> = ({ match }) => {
  const restaurantName = match.params.restaurant;

  // Estado
  const [text, setText] = useState(restaurantName);

  const location = useLocation();

  const detail = (location.state as Props).detail;
  console.log(detail.name);

  return (
    <>
      <NavBar />
      <Background2 text={text} />
      <RestaurantInfo detail={detail} />
    </>
  );
};

export default Restaurant;
