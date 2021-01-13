import React, { useState } from "react";

// Components
import NavBarFood from "../../../components/NavBarFood";
import Background2 from "../../../components/Background2";
import AddToCart from "../../../components/AddToCart";
import Footer from "../../../components/Footer";

const Cart: React.FC = () => {
  // States
  const [text, setText] = useState("Cart");
  const [filter, setFilter] = useState("");
  const [foods, setFoods] = useState<Array<any>>([]);
  const [page, setPage] = useState();

  return (
    <>
      <NavBarFood foods={foods} setFilter={setFilter} />
      <Background2 text={text} />
      <AddToCart />
      <Footer />
    </>
  );
};

export default Cart;
