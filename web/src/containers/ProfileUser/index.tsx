import React, { useState } from "react";
import { useLocation } from "react-router-dom";

//Components
import NavBar from "../../components/NavBar";
import Background2 from "../../components/Background2";
import UserProfile from "../../components/UserProfile";

interface Props {
  match: any;
  detail: any;
}

const ProfileUser: React.FC<Props> = ({ match }) => {
  const userName = match.params.profileUser;

  //Estado
  const [text, setText] = useState(userName);

  const location = useLocation();

  const detail = (location.state as Props).detail;
  console.log(detail.name);

  return (
    <>
      <NavBar />
      <Background2 text={text} />
      <UserProfile detail={detail} />
    </>
  );
};

export default ProfileUser;
