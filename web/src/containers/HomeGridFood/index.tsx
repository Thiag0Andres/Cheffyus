import React, { useEffect, useState } from "react";

// Redux e Auth
import { useSelector, RootStateOrAny } from "react-redux";
import { isAuthenticated } from "../../services/auth";

// Types
import { User } from "../../store/ducks/user/types";

// Components
import NavBarFood from "../../components/NavBarFood";
import Background from "../../components/BackgroundFood";
import GridFood from "../../components/GridFood";

const HomeGridFood: React.FC = () => {
  const user: User = useSelector((state: RootStateOrAny) => state.user.user);

  // States
  const [isLogged, setIsLogged] = useState(false);

  // Atualiza o estado de autenticação na mudança de usuário
  useEffect(() => {
    const response = isAuthenticated();
    setIsLogged(response);
  }, [user]);

  return (
    <>
      <NavBarFood />
      {!isLogged && <Background />}
      <GridFood />
    </>
  );
};

export default HomeGridFood;
