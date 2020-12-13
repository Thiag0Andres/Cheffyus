import React, { useState } from "react";

// Components
import NavBarHome from "../../components/NavBarHome";
import Background2 from "../../components/Background2";
import InformationsAbout from "../../components/InformationsAbout";
import Footer from "../../components/Footer";

const About: React.FC = () => {
  // States
  const [text, setText] = useState("Information about Cheffy");

  return (
    <>
      <NavBarHome />
      <Background2 text={text} />
      <InformationsAbout />
      <Footer />
    </>
  );
};

export default About;
