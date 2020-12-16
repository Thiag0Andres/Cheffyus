import React, { useState } from "react";

// Components
import NavBarFood from "../../../components/NavBarFood";
import Background2 from "../../../components/Background2";
import FormLogin from "../../../components/OrderFood/FormLogin";
import Footer from "../../../components/Footer";

const LogIn: React.FC = () => {
  // States
  const [text, setText] = useState("Log in to Cheffy");
  const [filter, setFilter] = useState([]);
  const [page, setPage] = useState();

  return (
    <>
      <NavBarFood setFilter={setFilter} page={page} />
      <Background2 text={text} />
      <FormLogin />
      <Footer />
    </>
  );
};

export default LogIn;
