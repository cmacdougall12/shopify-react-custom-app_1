import React from "react";
import ShopProvider from "../context/ShopContext";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "./NavBar";
import { ConversationsProvider } from "../context/ConversationsProvider";
import Login from "../pages/Login";
import Register from "../pages/Register";

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
