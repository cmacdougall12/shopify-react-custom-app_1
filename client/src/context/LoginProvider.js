import React, { useState, useContext } from "react";
import api from "../api";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

const AuthenticationContext = React.createContext();

export function useAuthentication() {
  return useContext(AuthenticationContext);
}

export function AuthenticationProvider({ children }) {
  // const [user, setUser] = useState(null);
  const history = useHistory();
  const [cookies, setCookies] = useCookies(["user"]);

  // const checkExistingSession = async () => {
  //   if (cookies.user) {
  //     await api.getUserById(cookies.user).then((user) => {
  //       setUser(user)
  //     });
  //   }
  // };

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
          if (user.password === password) {
            // setUser(user);
            setCookies("user", user._id, { path: "/" });
            history.push("/");
            return;
          }

          alert("incorrect credentials");
          return;
        }
        console.log("incorrect credentials");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const logout = () => {
    // setUser(null);
    setCookies("user", "");
  };

  const checkIfExistingUser = async (email) => {
    await api.getUsers().then((users) => {
      const userData = users.data.data;
      const user = userData.find((user) => user.email === email);
      if (user) return true;
      return false;
    });
  };

  const createUser = async (
    firstName,
    lastName,
    email,
    password,
    confirmPassword
  ) => {
    if (checkIfExistingUser(email)) {
      return alert("email already exists");
    }
    if (password !== confirmPassword)
      return alert("Passwords do not match. Please confirm.");

    const newUser = { firstName, lastName, email, password, confirmPassword };
    await api
      .createUser(newUser)
      .then(() => {
        authenticateUser(email, password);
      })
      .catch((error) => console.log(error));
  };

  const user = cookies.user

  user
    ? console.log("user logged in", user)
    : console.log("user logged out");

  const value = { user, authenticateUser, logout, createUser};

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
}
