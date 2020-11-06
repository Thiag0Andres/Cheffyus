import React, { useState } from "react";
import { useLocation } from "react-router-dom";

// Components
import NavBar from "../../components/NavBar";
import Background2 from "../../components/Background2";
import Info from "../../components/Info";
import FormContact from "../../components/FormContact";

interface Props {
  detail: any;
}

const Request: React.FC<Props> = () => {
  const location = useLocation();

  const detail = (location.state as Props).detail;

  // States
  const [text, setText] = useState(`Request ${detail.title}`);

  return (
    <>
      <NavBar />
      <Background2 text={text} />
      <Info detail={detail} />
      <FormContact detail={detail} />
    </>
  );
};

export default Request;
