import React, { useState } from "react";

// Components
import NavBar from "../../components/NavBar";
import Background2 from "../../components/Background2";

const Inbox: React.FC = () => {
  // States
  const [text, setText] = useState("Inbox");
  return (
    <>
      <NavBar />
      <Background2 text={text} />
    </>
  );
};

export default Inbox;
