import React, { createContext, useContext, useReducer } from 'react'
import reducer from './../reducer/auth_fn'
import jwtDecode from 'jwt-decode'
const AuthContext = createContext()

const initialState = {
  user: null,
}
if (localStorage.getItem('jwtToken')) {
  const decodedToken = jwtDecode(localStorage.getItem('jwtToken'))
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken')
  } else {
    initialState.user = decodedToken
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const login = (userData) => {
    localStorage.setItem('jwtToken', userData.token)
    dispatch({ type: 'LOGIN', payload: userData })
  }
  const logOut = () => {
    localStorage.removeItem('jwtToken')
    dispatch({ type: 'LOGOUT' })
  }
  return (
    <AuthContext.Provider value={{ user: state.user, login, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}
export const useGlobalContext = () => {
  return useContext(AuthContext)
}
