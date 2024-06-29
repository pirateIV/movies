import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import router from "@routes/routes.jsx";
import store from "api/store";

import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import "./i18n";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <I18nextProvider i18n={i18n} />
      </RouterProvider>
    </Provider>
  </React.StrictMode>,
);
