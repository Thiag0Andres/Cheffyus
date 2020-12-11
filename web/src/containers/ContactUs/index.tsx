import React, { useState } from "react";

// Components
import NavBar from "../../components/NavBar";
import Background2 from "../../components/Background2";
import InfoContacUs from "../../components/InfoContacUs";
import FormTextArea from "../../components/FormTextArea";

const ContactUs: React.FC = () => {
  // States
  const [text, setText] = useState("Contact the Cheffy team");

  return (
    <>
      <NavBar />
      <Background2 text={text} />
      <InfoContacUs />
      <FormTextArea />
    </>
  );
};

export default ContactUs;
