import React, { useState } from "react";
import { useLocation } from "react-router-dom";

// Components
import NavBar from "../../components/NavBar";
import Background2 from "../../components/Background2";
import FormContact from "../../components/FormContact";

interface Props {
  detail: any;
}

const ContactChef: React.FC<Props> = () => {
  const location = useLocation();

  const detail = (location.state as Props).detail;

  // States
  const [text, setText] = useState(
    detail.user.first_name + " " + detail.user.last_name
  );
  const [verification, setVerification] = useState(true);

  return (
    <>
      <NavBar />
      <Background2 text={`Message to ${text}`} />
      <FormContact detail={detail} verification={verification} />
    </>
  );
};

export default ContactChef;
