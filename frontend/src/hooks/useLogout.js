import React from "react";
import { UseAuthContext } from "../context/AuthContext";

export const useLogout = () => {
  const { dispatch } = UseAuthContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");

    console.log("i ran");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
