import React, { useEffect, useState } from "react";

// Redux e Auth
import { useSelector } from "react-redux";
import { ApplicationState } from "../../../store";
import { isAuthenticatedDelivery } from "../../../services/auth";

// Types
import { UserDelivery } from "../../../store/ducks/userDelivery/types";

// Components
import NavBarFood from "../../../components/NavBarFood";
import Background from "../../../components/BackgroundFood";
import GridFood from "../../../components/GridFood";
import Footer from "../../../components/Footer";

const HomeGrid: React.FC = () => {
  const user: UserDelivery = useSelector(
    (state: ApplicationState) => state.userDelivery.userDelivery
  );

  // States
  const [isLogged, setIsLogged] = useState(false);
  const [filter, setFilter] = useState("");
  const [foods, setFoods] = useState<Array<any>>([]);
  const [page, setPage] = useState(1);

  // Atualiza o estado de autenticação na mudança de usuário
  useEffect(() => {
    const response = isAuthenticatedDelivery();
    setIsLogged(response);
  }, [user]);

  //console.log(foods);

  return (
    <>
      <NavBarFood foods={foods} setFilter={setFilter} />
      {!isLogged && <Background />}
      <GridFood filter={filter} setPage={setPage} setFoods={setFoods} />
      <Footer />
    </>
  );
};

export default HomeGrid;
