import React, { useState, useContext } from "react";
import api from "../api";
import { useHistory } from "react-router-dom";

const AuthenticationContext = React.createContext();

export function useAuthentication() {
  return useContext(AuthenticationContext);
}

export function AuthenticationProvider({ children }) {
  const [user, setUser] = useState(null);
  const history = useHistory();

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

  const createUser = async (
    firstName,
    lastName,
    email,
    password,
    confirmPassword
  ) => {
    if (password !== confirmPassword)
      return alert("Passwords do not match. Please confirm.");

    const newUser = { firstName, lastName, email, password, confirmPassword };
    await api
      .createUser(newUser)
      .then(() => {
        setUser(newUser);
        history.push("/");
      })
      .catch((error) => console.log(error));
  };

  user
    ? console.log("user logged in", user._id)
    : console.log("user logged out");

  const value = { user, authenticateUser, logout, createUser };

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
}
