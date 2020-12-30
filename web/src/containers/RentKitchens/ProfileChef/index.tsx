import React, { useState } from "react";
import { useLocation } from "react-router-dom";

// Components
import NavBar from "../../../components/NavBar";
import Background2 from "../../../components/Background2";
import ChefProfile from "../../../components/ChefProfile";
import Footer from "../../../components/Footer";

const ProfileChef: React.FC = () => {
  const location = useLocation();

  const detail = (location.state as any).detail;

  // States
  const [text, setText] = useState(
    detail.user.first_name + " " + detail.user.last_name
  );

  return (
    <>
      <NavBar />
      <Background2 text={text} />
      <ChefProfile detail={detail} />
      <Footer />
    </>
  );
};

export default ProfileChef;
