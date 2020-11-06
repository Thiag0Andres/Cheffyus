import React, { useState } from "react";

// Components
import NavBar from "../../components/NavBar";
import Background2 from "../../components/Background2";
import Informations from "../../components/Informations";

const About: React.FC = () => {
  // States
  const [text, setText] = useState("Information about Cheffy");

  return (
    <>
      <NavBar />
      <Background2 text={text} />
      <Informations />
    </>
  );
};

export default About;
