import React, { useState } from "react";
import { useLocation } from "react-router-dom";

// Components
import NavBar from "../../components/NavBar";
import Background2 from "../../components/Background2";
import FormUpdateUser from "../../components/FormUpdateUser";
import Footer from "../../components/Footer";

const UpdateUser: React.FC = () => {
  const location = useLocation();

  const detail = (location.state as any).detail;

  // States
  const [text, setText] = useState(
    `Edit ${detail.first_name + " " + detail.last_name}`
  );

  return (
    <>
      <NavBar />
      <Background2 text={text} />
      <FormUpdateUser detail={detail} />
      <Footer />
    </>
  );
};

export default UpdateUser;
