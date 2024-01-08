import React, { useReducer, createContext } from 'react';
import * as jwtDecode from 'jwt-decode';

const initialState = {
  admin: null,
};

if (localStorage.getItem('jwtToken')) {
  const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));

  if (decodedToken.exp * 1000 < Date.now()) {
    // Token has expired, remove it
    localStorage.removeItem('jwtToken');
  } else {
    // Token is still valid, set the user in the initial state
    initialState.admin = decodedToken;
  }
}

const AuthContext = createContext({
  admin: null,
  loginAdmin: (userData) => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        admin: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        admin: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function loginAdmin(userData) {
    localStorage.setItem('jwtToken', userData.token);
    dispatch({
      type: 'LOGIN',
      payload: userData,
    });
  }

  function logout() {
    localStorage.removeItem('jwtToken');
    dispatch({ type: 'LOGOUT' });
  }

  return (
    <AuthContext.Provider value={{ admin: state.admin, loginAdmin, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
