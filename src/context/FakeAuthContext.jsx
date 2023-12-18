import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

const reducer = function (state, action) {
  switch (action.type) {
    case "logIn":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "logOut":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      throw new Error("UnKnown Action!");
  }
};

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthProvider = function ({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const logIn = function (email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "logIn", payload: FAKE_USER });
  };

  const logOut = function () {
    dispatch({ type: "logOut" });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = function () {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside the AuthProvider");
  return context;
};

export { AuthProvider, useAuth };
