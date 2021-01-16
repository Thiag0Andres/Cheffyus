import React, { useState } from "react";
import { useLocation } from "react-router-dom";

// Components
import NavBarFood from "../../../components/NavBarFood";
import Background2 from "../../../components/Background2";
import FormUpdatePlate from "../../../components/FormUpdatePlate";
import Footer from "../../../components/Footer";

const UpdatePlate: React.FC = () => {
  const location = useLocation();

  const detail = (location.state as any).detail;

  // States
  const [text, setText] = useState("Edit a Food");
  const [filter, setFilter] = useState("");
  const [foods, setFoods] = useState<Array<any>>([]);

  return (
    <>
      <NavBarFood foods={foods} setFilter={setFilter} />
      <Background2 text={text} />
      <FormUpdatePlate detail={detail} />
      <Footer />
    </>
  );
};

export default UpdatePlate;
