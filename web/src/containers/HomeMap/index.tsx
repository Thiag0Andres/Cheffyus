import React from "react";

//Component
import NavBar from "../../components/NavBar";
import Background from "../../components/Background";
import Mapa from "../../components/Mapa";

const HomeGrid: React.FC = () => {
  return (
    <>
      <NavBar />
      <Background />
      <Mapa />
    </>
  );
};

export default HomeGrid;
