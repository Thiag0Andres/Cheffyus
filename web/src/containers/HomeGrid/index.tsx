import React from "react";

//Component
import NavBar from "../../components/NavBar";
import Background from "../../components/Background";
import Grid from "../../components/Grid";

const HomeGrid: React.FC = () => {
  return (
    <>
      <NavBar />
      <Background />
      <Grid />
    </>
  );
};

export default HomeGrid;
