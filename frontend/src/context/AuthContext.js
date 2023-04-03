import { createContext, useContext, useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN":
      return { user: payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  console.log(`Auth Context State: ${state}`);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuthContext = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw Error("AuthContext: Used out of context");
  }

  return ctx;
};
