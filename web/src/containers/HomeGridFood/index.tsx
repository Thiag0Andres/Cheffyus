import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Redux e Auth
import { useSelector, RootStateOrAny } from "react-redux";
import { isAuthenticated } from "../../services/auth";

// Types
import { User } from "../../store/ducks/user/types";

// Components
import NavBarFood from "../../components/NavBarFood";
import Background from "../../components/BackgroundFood";
import GridFood from "../../components/GridFood";
import Footer from "../../components/Footer";

const HomeGridFood: React.FC = () => {
  const user: User = useSelector((state: RootStateOrAny) => state.user.user);

  // States
  const [isLogged, setIsLogged] = useState(false);
  const [filter, setFilter] = useState([]);
  const [page, setPage] = useState(1);

  // Atualiza o estado de autenticação na mudança de usuário
  useEffect(() => {
    const response = isAuthenticated();
    setIsLogged(response);
  }, [user]);

  return (
    <>
      <NavBarFood setFilter={setFilter} />
      {!isLogged && <Background />}
      <GridFood filter={filter} setPage={setPage} />
      <Footer />
    </>
  );
};

export default HomeGridFood;
