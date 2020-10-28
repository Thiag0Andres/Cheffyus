import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import Routes from "../../routes/__Routes";

import "../../common.scss";

const App = () => (
  <BrowserRouter>
    <div className="App">
      <Switch>
        <Routes />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
