import {
  // Basketsadd,
  // BasketsUpdate,
  Home,
  // Partners,
  Menu,
  // Apps,
  // BackendError,
  // Lockscreen,
  // NotFound,
  PasswordReset,
  Signin
  // Signup
} from "./pages";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import AppProvider from "./components/AppProvider/AppProvider";
import Dashboard from "./containers/Dashboard";
import React from "react";
import registerServiceWorker from "./registerServiceWorker";
import { render } from "react-dom";
import { Calendar } from "react-big-calendar";
import Users from "./pages/Users/Users";
// import Usersadd from "./pages/Users/Usersadd";
// import UsersUpdate from "./pages/Users/UsersUpdate";
// import Baskets from "./pages/Baskets/Baskets";
import Menuadd from "./pages/Menu/Menuadd";
import MenuUpdate from "./pages/Menu/MenuUpdate";
import MenuCSV from "./pages/Menu/MenuCSV";
import Partners from "./pages/partners/Partners";

import PartnersUpdate from "./pages/partners/PartnersUpdate";
import Partnersadd from "./pages/partners/Partnersadd";
import Offres from "./pages/Offres/Offres";
import OffresUpdate from "./pages/Offres/OffresUpdate";
import Offresadd from "./pages/Offres/Offresadd";
import OffresCSV from "./pages/Offres/OffresCSV";
import TestCSV from "./pages/testCSV/TestCSV";
import TestValide from "./pages/TestValide/TestValide";
import PartnersCSV from'./pages/partners/PartnersCSV';
import Deals from"./pages/Deals/Deals";
import DealsCSV from"./pages/Deals/DealsCSV";
import Controle from "./Controle";

render(
  <AppProvider>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Controle/>
    </BrowserRouter>
  </AppProvider>,
  document.getElementById("root")
);

registerServiceWorker();
