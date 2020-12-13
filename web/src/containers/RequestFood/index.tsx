import React, { useState } from "react";
import { useLocation } from "react-router-dom";

// Components
import NavBarFood from "../../components/NavBarFood";
import Background2 from "../../components/Background2";
import InfoFood from "../../components/InfoFood";
import Footer from "../../components/Footer";

const RequestFood: React.FC = () => {
  const location = useLocation();

  const detail = (location.state as any).detail;
  const formData = (location.state as any).formData;

  //console.log(formData);

  // States
  const [text, setText] = useState(`Request ${detail.name}`);
  const [filter, setFilter] = useState([]);

  return (
    <>
      <NavBarFood setFilter={setFilter} />
      <Background2 text={text} />
      <InfoFood detail={detail} formData={formData} />
      <Footer />
    </>
  );
};

export default RequestFood;
