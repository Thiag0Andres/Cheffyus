import React, { useState } from "react";

// Components
import NavBarFood from "../../../components/NavBarFood";
import Background2 from "../../../components/Background2";
import FormSignup from "../../../components/OrderFood/FormSignup";
import Footer from "../../../components/Footer";

const SignUp: React.FC = () => {
  // States
  const [text, setText] = useState("Create a new Cheffy account");
  const [filter, setFilter] = useState([]);
  const [page, setPage] = useState();

  return (
    <>
      <NavBarFood setFilter={setFilter} page={page} />
      <Background2 text={text} />
      <FormSignup />
      <Footer />
    </>
  );
};

export default SignUp;
