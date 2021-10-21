import React, { useState, useContext } from "react";
import api from "../api";

const AuthenticationContext = React.createContext();

export function useAuthentication() {
  return useContext(AuthenticationContext);
}

export function AuthenticationProvider({ children }) {
  const [user, setUser] = useState(null);

  const authenticateUser = async (email, password) => {
    console.log(
      `Does user email ${email} match the user password, ${password}`
    );

    await api
      .getUsers()
      .then((users) => {
        const userData = users.data.data;
        const user = userData.find((user) => user.email === email);
        if (user) {
          user.password === password
            ? setUser(user)
            : alert("incorrect credentials");
          return;
        }
        console.log("incorrect credentials");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const logout = () => {
    setUser(null);
  };

  user
    ? console.log("user logged in", user._id)
    : console.log("user logged out");

  const value = { user, authenticateUser, logout };

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
}
