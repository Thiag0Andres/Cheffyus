import React, { useState } from "react";

// Components
import NavBar from "../../../components/NavBar";
import Background2 from "../../../components/Background2";
import FormSignup from "../../../components/RentKitchen/FormSignup";
import Footer from "../../../components/Footer";

const SignUp: React.FC = () => {
  // States
  const [text, setText] = useState("Create a new Cheffy account");

  return (
    <>
      <NavBar />
      <Background2 text={text} />
      <FormSignup />
      <Footer />
    </>
  );
};

export default SignUp;
