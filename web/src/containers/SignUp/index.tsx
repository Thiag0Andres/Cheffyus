import React, { useState } from "react";

//Components
import NavBar from "../../components/NavBar";
import Background2 from "../../components/Background2";

const SignUp: React.FC = () => {
  //Estado
  const [text, setText] = useState("Create a new Cheffy account");
  return (
    <>
      <NavBar />
      <Background2 text={text} />
    </>
  );
};

export default SignUp;
