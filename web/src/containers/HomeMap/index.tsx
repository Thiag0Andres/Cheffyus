import React from "react";

//Component
import NavBar from "../../components/NavBar";
import Background from "../../components/Background";
import Map from "../../components/Map";

const HomeGrid: React.FC = () => {
  return (
    <>
      <NavBar />
      <Background />
      <Map />
    </>
  );
};

export default HomeGrid;
