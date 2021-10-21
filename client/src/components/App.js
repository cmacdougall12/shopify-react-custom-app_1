import React from "react";
import ShopProvider from "../context/ShopContext";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SocketProvider } from "../context/SocketProvider";

import NavBar from "./NavBar";
import { ConversationsProvider } from "../context/ConversationsProvider";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { AuthenticationProvider } from "../context/LoginProvider";

function App() {
  return (
    <Router>
      <AuthenticationProvider>
        <SocketProvider>
          <ShopProvider>
            <ConversationsProvider>
              <NavBar />
              <Switch>
                <Route path="/product/:id">
                  <ProductPage />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/register">
                  <Register />
                </Route>
                <Route path="/">
                  <HomePage />
                </Route>
              </Switch>
            </ConversationsProvider>
          </ShopProvider>
        </SocketProvider>
      </AuthenticationProvider>
    </Router>
  );
}

export default App;
