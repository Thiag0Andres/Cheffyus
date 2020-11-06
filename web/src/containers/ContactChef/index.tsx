import React, { useState } from "react";

// Components
import NavBar from "../../components/NavBar";
import Background2 from "../../components/Background2";
import FormContact from "../../components/FormContact";

interface Props {
  match: any;
}

const ContactChef: React.FC<Props> = ({ match }) => {
  // States
  const [text, setText] = useState("");

  return (
    <>
      <NavBar />
      <Background2 text={text} />
      <FormContact match={match} />
    </>
  );
};

export default ContactChef;
