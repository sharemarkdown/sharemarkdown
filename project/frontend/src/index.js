/*eslint-disable */
/* global window */
import React from "react";
import ReactDOM from 'react-dom'
import { Provider } from "react-redux";
import { store_ } from "./js/store/index";
import { ConnectedRouter } from 'react-router-redux';
// import Routes from "./router/urls";
// import Header from "./Header";
import App from "./components/App";
import { PersistGate } from 'redux-persist/integration/react'



const {store, persistor, history} = store_;

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("app")
);


/*eslint-enable */

