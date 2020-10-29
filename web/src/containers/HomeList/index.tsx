import React from "react";

//Component
import NavBar from "../../components/NavBar";
import Background from "../../components/Background";
import List from "../../components/List";

const HomeGrid: React.FC = () => {
  return (
    <>
      <NavBar />
      <Background />
      <List />
    </>
  );
};

export default HomeGrid;
