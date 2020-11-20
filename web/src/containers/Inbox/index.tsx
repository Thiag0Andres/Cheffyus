import React, { useState } from "react";

// Components
import NavBar from "../../components/NavBar";
import Background2 from "../../components/Background2";
import FormInbox from "../../components/FormInbox";

const Inbox: React.FC = () => {
  // States
  const [text, setText] = useState("Inbox");

  return (
    <>
      <NavBar />
      <Background2 text={text} />
      <FormInbox />
    </>
  );
};

export default Inbox;
