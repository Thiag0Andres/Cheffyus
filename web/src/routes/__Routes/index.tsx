import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

//Containers
import HomeGrid from "../../containers/HomeGrid";
import HomeList from "../../containers/HomeList";
import HomeMap from "../../containers/HomeMap";
import About from "../../containers/About";
import ContactUs from "../../containers/ContactUs";
import LogIn from "../../containers/LogIn";
import SignUp from "../../containers/SignUp";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={HomeGrid} />
      <Route path="/list" component={HomeList} />
      <Route path="/map" component={HomeMap} />
      <Route path="/about" component={About} />
      <Route path="/contact-us" component={ContactUs} />
      <Route path="/login" component={LogIn} />
      <Route path="/signup" component={SignUp} />
      <Redirect from="*" to="/" />
    </Switch>
  );
}
