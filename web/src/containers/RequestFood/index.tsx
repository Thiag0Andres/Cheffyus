import React, { useState } from "react";
import { useLocation } from "react-router-dom";

// Components
import NavBar from "../../components/NavBar";
import Background2 from "../../components/Background2";
import Info from "../../components/Info";
import Footer from "../../components/Footer";

const RequestFood: React.FC = () => {
  const location = useLocation();

  const detail = (location.state as any).detail;
  const formData = (location.state as any).formData;

  //console.log(formData);

  // States
  const [text, setText] = useState(`Request ${detail.name}`);

  return (
    <>
      <NavBar />
      <Background2 text={text} />
      <Info detail={detail} formData={formData} />
      <Footer />
    </>
  );
};

export default RequestFood;
