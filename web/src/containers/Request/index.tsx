import React, { useState } from "react";
import { useLocation } from "react-router-dom";

// Components
import NavBar from "../../components/NavBar";
import Background2 from "../../components/Background2";
import Info from "../../components/Info";
import FormContact from "../../components/FormContact";

const Request: React.FC = () => {
  const location = useLocation();

  const detail = (location.state as any).detail;

  // States
  const [text, setText] = useState(`Request ${detail.kitchen.name}`);
  const [verification, setVerification] = useState(false);

  return (
    <>
      <NavBar />
      <Background2 text={text} />
      <Info detail={detail} />
      <FormContact detail={detail} verification={verification} />
    </>
  );
};

export default Request;
