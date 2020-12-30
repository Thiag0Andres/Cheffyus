import React, { useState } from "react";
import { useLocation } from "react-router-dom";

// Components
import NavBar from "../../../components/NavBar";
import Background2 from "../../../components/Background2";
import UserProfile from "../../../components/UserProfile";
import Footer from "../../../components/Footer";

const ProfileUser: React.FC = () => {
  const location = useLocation();

  const detail = (location.state as any).detail;

  // States
  const [text, setText] = useState(detail.first_name + " " + detail.last_name);

  return (
    <>
      <NavBar />
      <Background2 text={text} />
      <UserProfile detail={detail} />
      <Footer />
    </>
  );
};

export default ProfileUser;
