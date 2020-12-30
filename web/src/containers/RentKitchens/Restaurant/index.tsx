import React, { useState } from "react";
import { useLocation } from "react-router-dom";

// Components
import NavBar from "../../../components/NavBar";
import Background2 from "../../../components/Background2";
import RestaurantInfo from "../../../components/RestaurantInfo";
import Footer from "../../../components/Footer";
interface Props {
  detail: any;
}

const Restaurant: React.FC<Props> = () => {
  const location = useLocation();

  const detail = (location.state as Props).detail;

  // States
  const [text, setText] = useState(detail.kitchen.name);

  return (
    <>
      <NavBar />
      <Background2 text={text} />
      <RestaurantInfo detail={detail} />
      <Footer />
    </>
  );
};

export default Restaurant;
