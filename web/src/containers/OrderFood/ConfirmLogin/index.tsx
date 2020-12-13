import React, { useState } from "react";

// Components
import NavBarFood from "../../../components/NavBarFood";
import Background2 from "../../../components/Background2";
import FormConfirmLogin from "../../../components/OrderFood/FormConfirmLogin";
import Footer from "../../../components/Footer";

const ConfirmLogin: React.FC = () => {
  // States
  const [text, setText] = useState("Please confirm your email address");
  const [filter, setFilter] = useState([]);

  return (
    <>
      <NavBarFood setFilter={setFilter} />
      <Background2 text={text} />
      <FormConfirmLogin />
      <Footer />
    </>
  );
};

export default ConfirmLogin;
