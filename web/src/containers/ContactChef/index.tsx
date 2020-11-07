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
  // States
  const [text, setText] = useState("");
  const [message, setMessage] = useState(true);

  const location = useLocation();

  const detail = (location.state as Props).detail;

  return (
    <>
      <NavBar />
      <Background2 text={text} />
      <FormContact detail={detail} message={message} />
    </>
  );
};

export default ContactChef;
