import React, { useState } from "react";
import { useLocation } from "react-router-dom";

// Components
import NavBar from "../../components/NavBar";
import Background2 from "../../components/Background2";
import ChefProfile from "../../components/ChefProfile";

interface Props {
  match: any;
  detail: any;
}

const ProfileChef: React.FC<Props> = ({ match }) => {
  const chefName = match.params.profileChef;

  // States
  const [text, setText] = useState(chefName);

  const location = useLocation();

  const detail = (location.state as Props).detail;

  return (
    <>
      <NavBar />
      <Background2 text={text} />
      <ChefProfile detail={detail} />
    </>
  );
};

export default ProfileChef;
