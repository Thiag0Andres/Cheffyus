import React, { useState } from "react";

// Components
import NavBar from "../../../components/NavBar";
import Background2 from "../../../components/Background2";
import InboxMessage from "../../../components/InboxMessage";
import Footer from "../../../components/Footer";

const Inbox: React.FC = () => {
  // States
  const [text, setText] = useState("Inbox");

  return (
    <>
      <NavBar />
      <Background2 text={text} />
      <InboxMessage />
      <Footer />
    </>
  );
};

export default Inbox;
