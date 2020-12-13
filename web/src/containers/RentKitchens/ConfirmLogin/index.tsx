import React, { useState } from "react";

// Components
import NavBar from "../../../components/NavBar";
import Background2 from "../../../components/Background2";
import FormConfirmLogin from "../../../components/RentKitchen/FormConfirmLogin";
import Footer from "../../../components/Footer";

const ConfirmLogin: React.FC = () => {
  // States
  const [text, setText] = useState("Please confirm your email address");

  return (
    <>
      <NavBar />
      <Background2 text={text} />
      <FormConfirmLogin />
      <Footer />
    </>
  );
};

export default ConfirmLogin;
