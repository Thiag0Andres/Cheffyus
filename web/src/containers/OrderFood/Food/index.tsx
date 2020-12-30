import React, { useState } from "react";
import { useLocation } from "react-router-dom";

// Components
import NavBarFood from "../../../components/NavBarFood";
import Background2 from "../../../components/Background2";
import FoodInfo from "../../../components/FoodInfo";
import Footer from "../../../components/Footer";

interface Props {
  detail: any;
}

const Food: React.FC<Props> = () => {
  const location = useLocation();

  const detail = (location.state as Props).detail;

  // States
  const [text, setText] = useState(detail.name);
  const [filter, setFilter] = useState([]);
  const [page, setPage] = useState();

  return (
    <>
      <NavBarFood setFilter={setFilter} />
      <Background2 text={text} />
      <FoodInfo detail={detail} />
      <Footer />
    </>
  );
};

export default Food;
