import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import AdministratorRentKitchenRoute from "../src/routes/AdministratorRentKitchenRoute";
import PrivateRentKitchenRoute from "../src/routes/PrivateRentKitchenRoute";
import PrivateOrderFoodRoute from "../src/routes/PrivateOrderFoodRoute";

//Containers
import HomeScreen from "./containers/HomeScreen";
import About from "./containers/About";
import ContactUs from "./containers/ContactUs";

//Containers Kitchens
import HomeGrid from "./containers/RentKitchens/HomeGrid";
import HomeList from "./containers/RentKitchens/HomeList";
import HomeMap from "./containers/RentKitchens/HomeMap";
import LogInKitchen from "./containers/RentKitchens/LogIn";
import SignUpKitchen from "./containers/RentKitchens/SignUp";
import ConfirmLoginKitchen from "./containers/RentKitchens/ConfirmLogin";
import AddKitchen from "./containers/RentKitchens/AddKitchen";
import Restaurant from "./containers/RentKitchens/Restaurant";
import ProfileChef from "./containers/RentKitchens/ProfileChef";
import ProfileUser from "./containers/RentKitchens/ProfileUser";
import ContactChef from "./containers/RentKitchens/ContactChef";
import RequestKitchen from "./containers/RentKitchens/RequestKitchen";
import Settings from "./containers/RentKitchens/Settings";
import UpdateKitchen from "./containers/RentKitchens/UpdateKitchen";
import UpdateUser from "./containers/RentKitchens/UpdateUser";
import Inbox from "./containers/RentKitchens/Inbox";
import Conversation from "./containers/RentKitchens/Conversation";
import Administrator from "./containers/Administrator";

//Containers Food
import HomeGridFood from "./containers/OrderFood/HomeGrid";
import LogInFood from "./containers/OrderFood/LogIn";
import SignUpFood from "./containers/OrderFood/SignUp";
import Food from "./containers/OrderFood/Food";
import Cart from "./containers/OrderFood/Cart";
import SettingsFood from "./containers/OrderFood/Settings";
import SuccessPayment from "./containers/OrderFood/SuccessPayment";

export default function Routes() {
  return (
    <>
      <Switch>
        {/* Common Pages */}
        <Route exact path="/" component={HomeScreen} />
        <Route path="/about" component={About} />
        <Route path="/contact-us" component={ContactUs} />

        {/* Rent Kitchen Pages */}
        <Route path="/kitchen/grid-kitchens" component={HomeGrid} />
        <Route path="/kitchen/list-kitchens" component={HomeList} />
        <Route path="/kitchen/map-kitchens" component={HomeMap} />
        <Route path="/kitchen/login" component={LogInKitchen} />
        <Route path="/kitchen/signup" component={SignUpKitchen} />
        <Route path="/kitchen/restaurant/:restaurant" component={Restaurant} />
        <Route
          path="/kitchen/profile-chef/:profileChef"
          component={ProfileChef}
        />

        <PrivateRentKitchenRoute
          exact
          path="/kitchen/confirm-login"
          component={ConfirmLoginKitchen}
        />
        <PrivateRentKitchenRoute
          exact
          path="/kitchen/add-kitchen"
          component={AddKitchen}
        />
        <PrivateRentKitchenRoute
          exact
          path="/kitchen/request/:request"
          component={RequestKitchen}
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

        {/* Order Food Pages */}
        <Route path="/food/grid-foods/:gridFoods" component={HomeGridFood} />
        <Route path="/food/login" component={LogInFood} />
        <Route path="/food/signup" component={SignUpFood} />
        <Route path="/food/food/:food" component={Food} />
        <Route path="/food/profile-chef/:profileChef" component={ProfileChef} />

        <PrivateOrderFoodRoute exact path="/food/cart" component={Cart} />
        <PrivateOrderFoodRoute
          exact
          path="/food/settings"
          component={SettingsFood}
        />
        <PrivateOrderFoodRoute
          exact
          path="/success-payment"
          component={SuccessPayment}
        />

        <Redirect from="*" to="/" />
      </Switch>
    </>
  );
}
