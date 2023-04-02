import { createContext, useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });
  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};
