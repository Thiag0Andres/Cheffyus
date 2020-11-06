import React, { useState } from "react";
import { useLocation } from "react-router-dom";

// Components
import NavBar from "../../components/NavBar";
import Background2 from "../../components/Background2";
import ChefProfile from "../../components/ChefProfile";

interface Props {
  detail: any;
}

const ProfileChef: React.FC<Props> = () => {
  const location = useLocation();

  const detail = (location.state as Props).detail;

  // States
  const [text, setText] = useState(detail.name);

  return (
    <>
      <NavBar />
      <Background2 text={text} />
      <ChefProfile detail={detail} />
    </>
  );
};

export default ProfileChef;
