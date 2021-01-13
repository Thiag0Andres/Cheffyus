import React, { useState } from "react";
import { useLocation } from "react-router-dom";

// Components
import NavBarFood from "../../../components/NavBarFood";
import Background2 from "../../../components/Background2";
import ChefProfileFood from "../../../components/ChefProfileFood";
import Footer from "../../../components/Footer";

const ProfileChef: React.FC = () => {
  const location = useLocation();

  const detail = (location.state as any).detail;

  // States
  const [text, setText] = useState(detail.name);
  const [filter, setFilter] = useState<Array<any>>([]);
  const [foods, setFoods] = useState<Array<any>>([]);

  return (
    <>
      <NavBarFood foods={foods} setFilter={setFilter} />
      <Background2 text={text} />
      <ChefProfileFood detail={detail} />
      <Footer />
    </>
  );
};

export default ProfileChef;
