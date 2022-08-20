import React, { useReducer, createContext } from "react";

const initialState = {
  user: null,
  userMsg: null,
};

const Context = createContext({
  user: null,
  userMsg: null,
  login: (email, password) => {},
  logout: () => {},
});

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    case "SET_USER_MSG":
      return {
        ...state,
        userMsg: action.payload,
      };
    default:
      return state;
  }
}

function Provider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function login(userData) {
    localStorage.setItem("user", userData);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  }

  function logout() {
    localStorage.removeItem("user");
    dispatch({
      type: "LOGOUT",
    });
  }

  function setUserMsg(msg = null) {
    dispatch({
      type: "SET_USER_MSG",
      payload: msg,
    });

    setTimeout(() => {
      dispatch({
        type: "SET_USER_MSG",
        payload: null,
      });
    }, 3000);
  }

  return (
    <Context.Provider
      value={{
        user: state.user,
        userMsg: state.userMsg,
        login,
        logout,
        setUserMsg,
      }}
      {...props}
    />
  );
}

export { Context, Provider };
