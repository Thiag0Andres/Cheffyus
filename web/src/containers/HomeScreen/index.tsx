import React from "react";

// Components
import NavBarHome from "../../components/NavBarHome";
import MenuScreen from "../../components/MenuScreen";
import Footer from "../../components/Footer";

const HomeScreen: React.FC = () => {
  return (
    <>
      <NavBarHome />
      <MenuScreen />
      <Footer />
    </>
  );
};

export default HomeScreen;
