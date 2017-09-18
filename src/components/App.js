import React, { Component } from 'react';
import LoginPage from "./LoginPage";
import SuccessLoginPage from "./SuccessLoginPage";
import {Route, Redirect} from "react-router-dom";
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="container">
        <Route exact path="/" render={() => (
          !isLoggedIn() ? (
            <LoginPage />
          ) : (
            <SuccessLoginPage />
          )
        )}/>
        <Route path="/login" component={LoginPage} />
        <Route path="/success" render={() => (
          !isLoggedIn() ? (
            <Redirect to="/login"/>
          ) : (
            <SuccessLoginPage />
          )
        )}/>
      </div>
    );
  }
}

export function isLoggedIn(store) {
  var sessionStorage = window.sessionStorage;
  return typeof sessionStorage.deviceIdentityToken !== "undefined" && typeof sessionStorage.authenticatedMessage !== "undefined";
}

export default App;
