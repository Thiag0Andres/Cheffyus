import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./containers/App";

import { SnackbarProvider } from "notistack";

import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider maxSnack={2}>
      <App />
    </SnackbarProvider>
  </Provider>,
  document.getElementById("root")
);
