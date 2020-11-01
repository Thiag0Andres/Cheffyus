import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Components
import NavBar from "../../components/NavBar";
import Background2 from "../../components/Background2";

interface Props {
  match: any;
}

const Restaurant: React.FC<Props> = ({ match }) => {
  const restaurantName = match.params.restaurant;

  // Estado
  const [text, setText] = useState(restaurantName);

  const location = useLocation();

  useEffect(() => {
    console.log(location.state);
  }, [location]);

  return (
    <>
      <NavBar />
      <Background2 text={text} />
    </>
  );
};

export default Restaurant;
