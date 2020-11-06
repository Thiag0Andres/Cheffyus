import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

//Containers
import HomeGrid from "../../containers/HomeGrid";
import HomeList from "../../containers/HomeList";
import HomeMap from "../../containers/HomeMap";
import About from "../../containers/About";
import ContactUs from "../../containers/ContactUs";
import LogIn from "../../containers/LogIn";
import ConfirmLogin from "../../containers/ConfirmLogin";
import SignUp from "../../containers/SignUp";
import AddKitchen from "../../containers/AddKitchen";
import Restaurant from "../../containers/Restaurant";
import ProfileChef from "../../containers/ProfileChef";
import ProfileUser from "../../containers/ProfileUser";
import ContactChef from "../../containers/ContactChef";
import Request from "../../containers/Request";
import Settings from "../../containers/Settings";
import Inbox from "../../containers/Inbox";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={HomeGrid} />
      <Route path="/list" component={HomeList} />
      <Route path="/map" component={HomeMap} />
      <Route path="/about" component={About} />
      <Route path="/contact-us" component={ContactUs} />
      <Route path="/contact-chef/:contactChef" component={ContactChef} />
      <Route path="/login" component={LogIn} />
      <Route path="/confirm-login" component={ConfirmLogin} />
      <Route path="/signup" component={SignUp} />
      <Route path="/add-kitchen" component={AddKitchen} />
      <Route path="/restaurant/:restaurant" component={Restaurant} />
      <Route path="/profile-chef/:profileChef" component={ProfileChef} />
      <Route path="/profile-user/:profileUser" component={ProfileUser} />
      <Route path="/request/:request" component={Request} />
      <Route path="/settings" component={Settings} />
      <Route path="/inbox" component={Inbox} />
      <Redirect from="*" to="/" />
    </Switch>
  );
}
