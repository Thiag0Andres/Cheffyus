import React, { useState } from "react";

// Components
import NavBar from "../../components/NavBar";
import Background2 from "../../components/Background2";

const ContactChef: React.FC = () => {
  // States
  const [text, setText] = useState("");
  return (
    <>
      <NavBar />
      <Background2 text={text} />
    </>
  );
};

export default ContactChef;
