import React, { useState } from "react";

// Components
import NavBarFood from "../../../components/NavBarFood";
import Background2 from "../../../components/Background2";
import FormAddPlate from "../../../components/FormAddPlate";
import Footer from "../../../components/Footer";

const AddPlate: React.FC = () => {
  // States
  const [text, setText] = useState("Post a Food");
  const [filter, setFilter] = useState("");
  const [foods, setFoods] = useState<Array<any>>([]);

  return (
    <>
      <NavBarFood foods={foods} setFilter={setFilter} />
      <Background2 text={text} />
      <FormAddPlate />
      <Footer />
    </>
  );
};

export default AddPlate;
