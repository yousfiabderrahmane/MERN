import { useState } from "react";
import { UseAuthContext } from "../context/AuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { dispatch } = UseAuthContext();

  const signup = async (email, password, name) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/user/signup", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.msg);
      console.log(`I AM : ${json.msg}`);
    } else {
      //save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      //update auth context
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
