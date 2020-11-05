import React from "react";

// Components
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
