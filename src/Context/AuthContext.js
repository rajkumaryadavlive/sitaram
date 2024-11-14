import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios'; // Import Axios
import { initialState, authReducer, actionTypes } from '../Reducers/authReducer';
import { post } from '../Helpers/Axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => { 
  const [state, dispatch] = useReducer(authReducer, initialState);
 
  const login = async (credentials) => {
    dispatch({ type: actionTypes.LOGIN_REQUEST });
    try {
      // Call your API for login using Axios
      const response = await post('/api/signin', credentials, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.status === 200) {
        dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: response.data });
       // window.location.href="/dashboard";
      } else {
        dispatch({ type: actionTypes.LOGIN_FAILURE, payload: response.data.error });
      }
    } catch (error) {
      dispatch({ type: actionTypes.LOGIN_FAILURE, payload: error.response?.data?.error || error.message });
    }
  };

  const register = async (userData) => {
    dispatch({ type: actionTypes.REGISTER_REQUEST });
    try { 
      // Call your API for registration using Axios
      const response = await post('/api/signup', userData, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.status === 200) {
        dispatch({ type: actionTypes.REGISTER_SUCCESS, payload: response.data });
      } else {
        dispatch({ type: actionTypes.REGISTER_FAILURE, payload: response.data.error });
      }
    } catch (error) {
      dispatch({ type: actionTypes.REGISTER_FAILURE, payload: error.response?.data?.error || error.message });
    }
  };

  const logout = () => {
    dispatch({ type: actionTypes.LOGOUT });
    // Handle additional logout logic if needed
  };

  return (
    <AuthContext.Provider value={{ state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
