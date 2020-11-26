import React, { useState } from "react";

// Components
import NavBar from "../../components/NavBar";
import Background2 from "../../components/Background2";
import InformationsAdministrator from "../../components/InformationsAdministrator";

const Administrator: React.FC = () => {
  // States
  const [text, setText] = useState("Cheffy Administrator panel");

  return (
    <>
      <NavBar />
      <Background2 text={text} />
      <InformationsAdministrator />
    </>
  );
};

export default Administrator;
