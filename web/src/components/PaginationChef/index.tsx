import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import ChefList from "./ChefList";
import api from "../../services/api";
import PopularPlates from "../PopulerPlates";

import "./styles.scss";

interface Props {
  locationUser: any;
}

const PaginationChef: React.FC<Props> = ({ locationUser }) => {
  const [recommended, setRecommendedChefs] = useState<Array<any>>([]);
  const [mustTryChefs, setMusTryChefs] = useState<Array<any>>([]);

  useEffect(() => {
    // FIXME: This is not the way to achieve side effects in component.
    // Create action creator and move this code into it.
    const url = `https://mycheffy.herokuapp.com/user/mustTryAndRecommendedChefs/?location_lat=${
      locationUser[0]
    }&location_lon=${locationUser[1]}&radius=${100}`;

    api
      .get(url)
      .then((response) => {
        const data = response.data.data;
        //console.log(response.data);
        setRecommendedChefs(data["recommendedChefs"]);
        setMusTryChefs(data["mustTryChefs"]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container>
      <ChefList chefs={recommended} title={"Recommended Chefs"} />
      {/* <PopularPlates></PopularPlates> */}
      <ChefList chefs={mustTryChefs} title={"Chef you Muts Try"} />
    </Container>
  );
};

export default PaginationChef;
