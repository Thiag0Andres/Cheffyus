import React, { useState } from "react";
import { useLocation } from "react-router-dom";

// Components
import NavBar from "../../components/NavBar";
import Background2 from "../../components/Background2";
import FormUpdateKitchen from "../../components/FormUpdateKitchen";

const UpdateKitchen: React.FC = () => {
  const location = useLocation();

  const detail = (location.state as any).detail;

  // States
  const [text, setText] = useState("Edit Kitchen");

  return (
    <>
      <NavBar />
      <Background2 text={text} />
      <FormUpdateKitchen detail={detail} />
    </>
  );
};

export default UpdateKitchen;
