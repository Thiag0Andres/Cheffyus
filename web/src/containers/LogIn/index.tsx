import React, { useState } from "react";

//Components
import NavBar from "../../components/NavBar";
import Background2 from "../../components/Background2";

const LogIn: React.FC = () => {
  //Estado
  const [text, setText] = useState("Log in to Cheffy");
  return (
    <>
      <NavBar />
      <Background2 text={text} />
    </>
  );
};

export default LogIn;
