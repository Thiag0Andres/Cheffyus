import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

//Components
import NavBar from "../../components/NavBar";
import Background2 from "../../components/Background2";

interface Props {
  match: any;
}

interface lo {
  detail: any;
}

interface Restaurant {
  id: number;
  title: string;
  image_url_restaurant: string;
  price: number;
  location: [number, number];
  name: string;
  image_url_chef: string;
}

const Profile: React.FC<Props> = ({ match }) => {
  const chefName = match.params.profile;

  //Estado
  const [text, setText] = useState(chefName);
  const [info, setInfo] = useState("");

  /*   const location = useLocation();

  const detail = (location.state as lo).detail;
  console.log(detail);

  const handle = () => {
    detail.map((deta: Restaurant) => {
      setInfo(deta.name);
    });
  };

  useEffect(() => {
    handle();
  }, [info]);

  console.log(info); */

  return (
    <>
      <NavBar />
      <Background2 text={text} />
    </>
  );
};

export default Profile;
