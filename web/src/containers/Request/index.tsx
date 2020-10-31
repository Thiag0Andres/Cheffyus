import React, { useState } from "react";

//Components
import NavBar from "../../components/NavBar";
import Background2 from "../../components/Background2";

const Request: React.FC = () => {
  //Estado
  const [text, setText] = useState("");
  return (
    <>
      <NavBar />
      <Background2 text={text} />
    </>
  );
};

export default Request;
