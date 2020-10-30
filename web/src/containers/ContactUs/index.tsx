import React, { useState } from "react";

//Components
import NavBar from "../../components/NavBar";
import Background2 from "../../components/Background2";
import FormTextArea from "../../components/FormTextArea";

const ContactUs: React.FC = () => {
  //Estado
  const [text, setText] = useState("Contact the Cheffy team");
  return (
    <>
      <NavBar />
      <Background2 text={text} />
      <FormTextArea />
    </>
  );
};

export default ContactUs;
