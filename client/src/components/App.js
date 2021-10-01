import React from "react";
import ShopProvider from "../context/ShopContext";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "./NavBar";

function App() {
  return (
    <Router>
      <ShopProvider>
        <NavBar />
        <Switch>
          <Route path="/product/:id">
            <ProductPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </ShopProvider>
    </Router>
  );
}

export default App;
