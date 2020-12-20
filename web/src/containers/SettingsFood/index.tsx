import React, { useState } from "react";

// Components
import NavBarFood from "../../components/NavBarFood";
import Background2 from "../../components/Background2";
import InformationsSettingsFood from "../../components/InformationsSettingsFood";
import Footer from "../../components/Footer";

const SettingsFood: React.FC = () => {
  // States
  const [text, setText] = useState("Settings");
  const [filter, setFilter] = useState([]);
  const [page, setPage] = useState();

  return (
    <>
      <NavBarFood setFilter={setFilter} page={page} />
      <Background2 text={text} />
      <InformationsSettingsFood />
      <Footer />
    </>
  );
};

export default SettingsFood;
