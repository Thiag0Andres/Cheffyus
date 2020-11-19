import React, { useState } from "react";

// Components
import NavBar from "../../components/NavBar";
import Background2 from "../../components/Background2";
import InformationsAbout from "../../components/InformationsAbout";

const About: React.FC = () => {
  // States
  const [text, setText] = useState("Information about Cheffy");

  return (
    <>
      <NavBar />
      <Background2 text={text} />
      <InformationsAbout />
    </>
  );
};

export default About;
