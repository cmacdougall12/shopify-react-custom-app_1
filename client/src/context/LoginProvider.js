import React, { useState, useContext } from "react";
import api from "../api";

const AuthenticationContext = React.createContext();

export function useAuthentication() {
  return useContext(AuthenticationContext);
}

export function AuthenticationProvider({ children }) {
  const [authentication, setAuthenication] = useState(false);

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
            ? setAuthenication(true)
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
    setAuthenication(false);
  };

  console.log("authentication state changed", authentication);

  const value = { authentication, authenticateUser, logout };
  
  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
}
