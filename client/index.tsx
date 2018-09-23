import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { injectGlobal } from "emotion";

import { configureStore, history } from "./store";

import { Routes } from "./router";
const store = configureStore({});

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>,
  window.document.getElementById("root")
);

injectGlobal`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    font-size: 18px;
  }

  #root {
    height: 100%;
  }

  .deck {
    height: 100%;
    font-size: 1.5rem;
  }
`;
