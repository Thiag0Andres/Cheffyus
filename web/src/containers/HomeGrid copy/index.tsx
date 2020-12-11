import React, { useEffect, useState } from "react";

// Redux e Auth
import { useSelector, RootStateOrAny } from "react-redux";
import { isAuthenticated } from "../../services/auth";

// Types
import { User } from "../../store/ducks/user/types";

// Components
import NavBar from "../../components/NavBar";
import Background from "../../components/Background";
import GridFood from "../../components/Grid copy";

const HomeGrid: React.FC = () => {
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
      <NavBar />
      {!isLogged && <Background />}
      <GridFood />
    </>
  );
};

export default HomeGrid;
