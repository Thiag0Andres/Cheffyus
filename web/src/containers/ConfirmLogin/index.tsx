import React, { useState } from "react";

// Components
import NavBar from "../../components/NavBar";
import Background2 from "../../components/Background2";
import FormConfirmLogin from "../../components/FormConfirmLogin";

const ConfirmLogin: React.FC = () => {
  // States
  const [text, setText] = useState("Please confirm your email address");
  return (
    <>
      <NavBar />
      <Background2 text={text} />
      <FormConfirmLogin />
    </>
  );
};

export default ConfirmLogin;
