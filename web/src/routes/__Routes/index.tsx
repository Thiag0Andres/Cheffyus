import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

//Containers
import HomeGrid from "../../containers/HomeGrid";
import HomeList from "../../containers/HomeList";
import HomeMap from "../../containers/HomeMap";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={HomeGrid} />
      <Route exact path="/List" component={HomeList} />
      <Route exact path="/Map" component={HomeMap} />
      <Redirect from="*" to="/" />
    </Switch>
  );
}
