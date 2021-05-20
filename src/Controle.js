import React, { useEffect } from "react";
import { AuthContext } from './context';
import Users from "./pages/Users/Users";
// import Usersadd from "./pages/Users/Usersadd";
// import UsersUpdate from "./pages/Users/UsersUpdate";
// import Baskets from "./pages/Baskets/Baskets";
import Menuadd from "./pages/Menu/Menuadd";
import MenuUpdate from "./pages/Menu/MenuUpdate";
import MenuCSV from "./pages/Menu/MenuCSV";
import OffresCSV from "./pages/Offres/OffresCSV";
import Partners from "./pages/partners/Partners";
import PartnersUpdate from "./pages/partners/PartnersUpdate";
import Partnersadd from "./pages/partners/Partnersadd";
import Offres from "./pages/Offres/Offres";
import TestValide from "./pages/TestValide/TestValide";
import TestCSV from "./pages/testCSV/TestCSV";
import PartnersCSV from'./pages/partners/PartnersCSV';
import OffresUpdate from "./pages/Offres/OffresUpdate";
import Offresadd from "./pages/Offres/Offresadd";
import DealsCSV from"./pages/Deals/DealsCSV";
import Deals from"./pages/Deals/Deals";
import {
    Home,
    Menu,
    PasswordReset,
    Signin
  } from "./pages";
  import { BrowserRouter, Route, Switch } from "react-router-dom";
  
  import Dashboard from "./containers/Dashboard";

const Controle = () => {

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async (foundUser) => {
      const userToken = foundUser.userToken;
      const userName = foundUser.username;
      try {
        await localStorage.setItem('userToken', userToken);
        await localStorage.setItem('username', userName);
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGIN', id: userName, token: userToken });
    },
    signOut: async () => {
      try {
        await localStorage.removeItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
  
  }), []);

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await localStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 500);
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
        {loginState.userToken !== null?
          <Switch >
          <Route path="/" component={Dashboard} />
          <Route exact path="/Home" component={Home} />
          <Route exact path="/Users" component={Users} />
          <Route exact path="/Partners" component={Partners} />
          <Route exact path="/PartnersUpdate" component={PartnersUpdate} />
          <Route exact path="/Partnersadd" component={Partnersadd} />
          <Route exact path="/Deals" component={Deals} />
          <Route exact path="/DealsCSV" component={DealsCSV} />
          <Route exact path="/Menu" component={Menu} />
          <Route exact path="/TestCSV" component={TestCSV} />
          <Route exact path="/TestValide" component={TestValide} />
          <Route exact path="/PartnersCSV" component={PartnersCSV} />
          <Route exact path="/Menuadd" component={Menuadd} />
          <Route exact path="/MenuUpdate" component={MenuUpdate} />
          <Route exact path="/MenuCSV" component={MenuCSV} />
          <Route exact path="/Offres" component={Offres} />
          <Route exact path="/Offresadd" component={Offresadd} />
          <Route exact path="/OffresUpdate" component={OffresUpdate} />
          <Route exact path="/OffresCSV" component={OffresCSV} />
          {/* <Route path="/" component={Dashboard} /> */}
        </Switch>
        :
          <Route path="/" component={Signin} />
        }
    </AuthContext.Provider >
  );

}

export default Controle;
