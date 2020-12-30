import React, { useState } from "react";

// Components
import NavBar from "../../../components/NavBar";
import Background2 from "../../../components/Background2";
import FormAddKitchen from "../../../components/FormAddKitchen";
import Footer from "../../../components/Footer";

const AddKitchen: React.FC = () => {
  // States
  const [text, setText] = useState("Add Your Kitchen");

  return (
    <>
      <NavBar />
      <Background2 text={text} />
      <FormAddKitchen />
      <Footer />
    </>
  );
};

export default AddKitchen;
