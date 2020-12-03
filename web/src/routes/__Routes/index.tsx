import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import AdministratorRoute from "../_AdministratorRoute";
import PrivateRoute from "../_PrivateRoute";

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
import Conversation from "../../containers/Conversation";
import Administrator from "../../containers/Administrator";

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
      <Route path="/restaurant/:restaurant" component={Restaurant} />
      <Route path="/profile-chef/:profileChef" component={ProfileChef} />
      <Route path="/profile-user/:profileUser" component={ProfileUser} />

      <PrivateRoute exact path="/confirm-login" component={ConfirmLogin} />
      <PrivateRoute exact path="/add-kitchen" component={AddKitchen} />
      <PrivateRoute exact path="/request/:request" component={Request} />
      <PrivateRoute
        exact
        path="/contact-chef/:contactChef"
        component={ContactChef}
      />
      <PrivateRoute exact path="/settings" component={Settings} />
      <PrivateRoute exact path="/inbox" component={Inbox} />
      <PrivateRoute
        exact
        path="/conversation/:conversation"
        component={Conversation}
      />

      <AdministratorRoute
        exact
        path="/administrator"
        component={Administrator}
      />

      <Redirect from="*" to="/" />
    </Switch>
  );
}
