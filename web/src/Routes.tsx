import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import AdministratorRentKitchenRoute from "../src/routes/AdministratorRentKitchenRoute";
import PrivateRentKitchenRoute from "../src/routes/PrivateRentKitchenRoute";

//Containers
import HomeScreen from "./containers/HomeScreen";
import About from "./containers/About";
import ContactUs from "./containers/ContactUs";

//Containers Kitchens
import HomeGrid from "./containers/HomeGrid";
import HomeList from "./containers/HomeList";
import HomeMap from "./containers/HomeMap";
import LogIn from "./containers/LogIn";
import ConfirmLogin from "./containers/ConfirmLogin";
import SignUp from "./containers/SignUp";
import AddKitchen from "./containers/AddKitchen";
import Restaurant from "./containers/Restaurant";
import ProfileChef from "./containers/ProfileChef";
import ProfileUser from "./containers/ProfileUser";
import ContactChef from "./containers/ContactChef";
import Request from "./containers/Request";
import Settings from "./containers/Settings";
import UpdateKitchen from "./containers/UpdateKitchen";
import UpdateUser from "./containers/UpdateUser";
import Inbox from "./containers/Inbox";
import Conversation from "./containers/Conversation";
import Administrator from "./containers/Administrator";

//Containers Food
import HomeGridFood from "./containers/HomeGrid copy";

export default function Routes() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={HomeScreen} />
        <Route path="/about" component={About} />
        <Route path="/contact-us" component={ContactUs} />

        <Route path="/kitchen/grid-kitchens" component={HomeGrid} />
        <Route path="/kitchen/list-kitchens" component={HomeList} />
        <Route path="/kitchen/map-kitchens" component={HomeMap} />
        <Route path="/kitchen/login" component={LogIn} />
        <Route path="/kitchen/signup" component={SignUp} />
        <Route path="/kitchen/restaurant/:restaurant" component={Restaurant} />
        <Route
          path="/kitchen/profile-chef/:profileChef"
          component={ProfileChef}
        />

        <PrivateRentKitchenRoute
          exact
          path="/kitchen/confirm-login"
          component={ConfirmLogin}
        />
        <PrivateRentKitchenRoute
          exact
          path="/kitchen/add-kitchen"
          component={AddKitchen}
        />
        <PrivateRentKitchenRoute
          exact
          path="/kitchen/request/:request"
          component={Request}
        />
        <PrivateRentKitchenRoute
          exact
          path="/kitchen/contact-chef/:contactChef"
          component={ContactChef}
        />
        <PrivateRentKitchenRoute
          exact
          path="/kitchen/profile-user/:profileUser"
          component={ProfileUser}
        />
        <PrivateRentKitchenRoute
          exact
          path="/kitchen/settings"
          component={Settings}
        />

        <PrivateRentKitchenRoute
          exact
          path="/kitchen/update-kitchen/:updateKitchen"
          component={UpdateKitchen}
        />
        <PrivateRentKitchenRoute
          exact
          path="/kitchen/update-user/:updateUser"
          component={UpdateUser}
        />
        <PrivateRentKitchenRoute
          exact
          path="/kitchen/inbox"
          component={Inbox}
        />
        <PrivateRentKitchenRoute
          exact
          path="/kitchen/conversation/:conversation"
          component={Conversation}
        />
        <AdministratorRentKitchenRoute
          exact
          path="/kitchen/administrator"
          component={Administrator}
        />

        <Route path="/food/grid-foods" component={HomeGridFood} />

        <Redirect from="*" to="/" />
      </Switch>
    </>
  );
}
