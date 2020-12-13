import React, { useState } from "react";
import { useLocation } from "react-router-dom";

// Components
import NavBar from "../../components/NavBar";
import Background2 from "../../components/Background2";
import FormConversation from "../../components/FormConversation";
import Footer from "../../components/Footer";

const Conversation: React.FC = () => {
  const location = useLocation();

  const detail = (location.state as any).detail;

  // States
  const [text, setText] = useState(
    `Inbox | Conversation with ${detail.sender.first_name}`
  );

  return (
    <>
      <NavBar />
      <Background2 text={text} />
      <FormConversation />
      <Footer />
    </>
  );
};

export default Conversation;
