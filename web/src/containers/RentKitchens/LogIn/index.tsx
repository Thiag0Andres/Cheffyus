import React, { useState } from "react";

// Components
import NavBar from "../../../components/NavBar";
import Background2 from "../../../components/Background2";
import FormLogin from "../../../components/RentKitchen/FormLogin";

const LogIn: React.FC = () => {
  // States
  const [text, setText] = useState("Log in to Cheffy");

  return (
    <>
      <NavBar />
      <Background2 text={text} />
      <FormLogin />
    </>
  );
};

export default LogIn;
